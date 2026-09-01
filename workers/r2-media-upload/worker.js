// R2 upload endpoint for Decap CMS's custom media library (see
// public/admin/media-library.js). Images picked in the admin panel are
// uploaded here and never committed to git.
//
// Auth model: the browser never holds a static secret (a static secret
// baked into public JS isn't actually secret — anyone can view-source it).
// Instead, this Worker trusts the same GitHub access token Decap already
// obtained via OAuth login (decap-cms stores it in localStorage under
// "decap-cms-user"; media-library.js reads it and sends it as
// `Authorization: token <token>`, exactly like Decap's own git operations
// do). We verify that token against the GitHub API and require the user to
// have write access to GITHUB_REPO before accepting an upload.
//
// Bindings (wrangler.toml):
//   IMG_BUCKET       R2 bucket binding for the bucket serving img.sonbarsa.com
// Vars:
//   GITHUB_REPO       "owner/repo", e.g. "geekynitish/sonbarsa-digital-growth-1"
//   ALLOWED_ORIGINS   comma-separated list of allowed browser origins
//   PUBLIC_IMG_HOST   e.g. "https://img.sonbarsa.com"
//   UPLOAD_PREFIX     key prefix for CMS uploads, e.g. "blog"

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

function corsHeaders(origin, env) {
  const allowed = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  const allowOrigin = allowed.includes(origin) ? origin : allowed[0] || "";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    Vary: "Origin",
  };
}

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

async function verifyGitHubAccess(token, repo) {
  const userRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": "sonbarsa-decap-media-upload",
      Accept: "application/vnd.github+json",
    },
  });
  if (!userRes.ok) return { ok: false, status: 401, message: "Invalid GitHub token" };
  const user = await userRes.json();

  const permRes = await fetch(
    `https://api.github.com/repos/${repo}/collaborators/${user.login}/permission`,
    {
      headers: {
        Authorization: `token ${token}`,
        "User-Agent": "sonbarsa-decap-media-upload",
        Accept: "application/vnd.github+json",
      },
    }
  );
  if (!permRes.ok) return { ok: false, status: 403, message: "Could not verify repo access" };
  const perm = await permRes.json();
  const allowed = perm.permission === "admin" || perm.permission === "write" || perm.permission === "maintain";
  if (!allowed) return { ok: false, status: 403, message: "User lacks write access to repo" };

  return { ok: true, login: user.login };
}

function sanitizeFileName(name) {
  const lastDot = name.lastIndexOf(".");
  const ext = lastDot >= 0 ? name.slice(lastDot).toLowerCase().replace(/[^a-z0-9.]/g, "") : "";
  const base = (lastDot >= 0 ? name.slice(0, lastDot) : name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return `${base || "image"}${ext}`;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const headers = corsHeaders(origin, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/upload") {
      return json({ error: "Not found" }, 404, headers);
    }

    const auth = request.headers.get("Authorization") || "";
    const token = auth.replace(/^token\s+/i, "").trim();
    if (!token) {
      return json({ error: "Missing Authorization header" }, 401, headers);
    }

    const access = await verifyGitHubAccess(token, env.GITHUB_REPO);
    if (!access.ok) {
      return json({ error: access.message }, access.status, headers);
    }

    let form;
    try {
      form = await request.formData();
    } catch {
      return json({ error: "Expected multipart/form-data" }, 400, headers);
    }

    const file = form.get("file");
    if (!(file instanceof File)) {
      return json({ error: "Missing file field" }, 400, headers);
    }
    if (!file.type || !file.type.startsWith("image/")) {
      return json({ error: "Only image uploads are allowed" }, 400, headers);
    }
    if (file.size > MAX_FILE_BYTES) {
      return json({ error: "File exceeds 10MB limit" }, 400, headers);
    }

    const prefix = (env.UPLOAD_PREFIX || "blog").replace(/^\/+|\/+$/g, "");
    const fileName = sanitizeFileName(file.name || "image");
    const key = `${prefix}/${Date.now()}-${fileName}`;

    await env.IMG_BUCKET.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type },
    });

    const publicHost = (env.PUBLIC_IMG_HOST || "https://img.sonbarsa.com").replace(/\/+$/, "");
    return json({ url: `${publicHost}/${key}` }, 200, headers);
  },
};
