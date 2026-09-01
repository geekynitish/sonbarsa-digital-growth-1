// Self-hosted GitHub OAuth provider for Decap CMS (public/admin).
//
// Implements the popup + postMessage handshake Decap's GitHub backend
// expects (see decap-cms-lib-auth's NetlifyAuthenticator, which the GitHub
// backend reuses regardless of the "Netlify" name): the CMS opens
// `${base_url}/auth`, we redirect to GitHub, GitHub redirects back to
// `${base_url}/callback`, and the callback page posts the access token back
// to the window that opened it.
//
// Required secrets (wrangler secret put ...):
//   GITHUB_OAUTH_CLIENT_ID
//   GITHUB_OAUTH_CLIENT_SECRET
//   OAUTH_STATE_SECRET      any long random string, used to sign the OAuth
//                           "state" param so it can't be forged/replayed
//
// None of these are ever sent to the browser — the client only ever talks
// to this Worker's /auth and /callback endpoints.

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const STATE_TTL_MS = 10 * 60 * 1000;

function bytesToHex(bytes) {
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hmac(payload, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return bytesToHex(sig);
}

async function createState(secret) {
  const payload = btoa(JSON.stringify({ ts: Date.now(), nonce: crypto.randomUUID() }));
  const sig = await hmac(payload, secret);
  return `${payload}.${sig}`;
}

async function verifyState(state, secret) {
  if (!state || !state.includes(".")) return false;
  const [payload, sig] = state.split(".");
  const expected = await hmac(payload, secret);
  if (expected !== sig) return false;
  try {
    const { ts } = JSON.parse(atob(payload));
    return typeof ts === "number" && Date.now() - ts < STATE_TTL_MS;
  } catch {
    return false;
  }
}

function htmlResponse(body) {
  return new Response(body, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

// Renders the popup page that performs Decap's handshake:
//   1. tell the opener we're "authorizing:github"
//   2. wait for the opener to echo that message back
//   3. post the real result (success or error) to the opener
function renderHandshakePage(status, data) {
  const message = `authorization:github:${status}:${JSON.stringify(data)}`;
  return `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8" /><title>Authorizing…</title></head>
  <body>
    <script>
      (function () {
        function receiveMessage() {
          window.opener.postMessage(${JSON.stringify(message)}, "*");
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
    <p>You can close this window.</p>
  </body>
</html>`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      const state = await createState(env.OAUTH_STATE_SECRET);
      const redirectUri = `${url.origin}/callback`;

      const authUrl = new URL(GITHUB_AUTHORIZE_URL);
      authUrl.searchParams.set("client_id", env.GITHUB_OAUTH_CLIENT_ID);
      authUrl.searchParams.set("redirect_uri", redirectUri);
      authUrl.searchParams.set("scope", url.searchParams.get("scope") || "repo");
      authUrl.searchParams.set("state", state);

      return Response.redirect(authUrl.toString(), 302);
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");

      if (!(await verifyState(state, env.OAUTH_STATE_SECRET))) {
        return htmlResponse(
          renderHandshakePage("error", { message: "Invalid or expired OAuth state" })
        );
      }
      if (!code) {
        return htmlResponse(
          renderHandshakePage("error", { message: "GitHub did not return an authorization code" })
        );
      }

      const tokenRes = await fetch(GITHUB_TOKEN_URL, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          client_id: env.GITHUB_OAUTH_CLIENT_ID,
          client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
          code,
          redirect_uri: `${url.origin}/callback`,
        }),
      });

      const tokenData = await tokenRes.json();

      if (!tokenRes.ok || tokenData.error || !tokenData.access_token) {
        return htmlResponse(
          renderHandshakePage("error", {
            message: tokenData.error_description || "GitHub token exchange failed",
          })
        );
      }

      return htmlResponse(
        renderHandshakePage("success", { token: tokenData.access_token, provider: "github" })
      );
    }

    return new Response("Decap CMS OAuth provider — use /auth to start login.", { status: 200 });
  },
};
