const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...CORS_HEADERS,
    },
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function handleContactPost(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ success: false, error: "Invalid JSON in request body" }, 400);
  }

  const { name, email, phone, company, service, message } = body || {};

  // Validation
  if (!name || typeof name !== "string" || !name.trim()) {
    return jsonResponse({ success: false, error: "Name is required" }, 400);
  }

  const trimmedEmail = (email && typeof email === "string" ? email.trim() : "");
  if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return jsonResponse({ success: false, error: "A valid email address is required" }, 400);
  }

  if (!message || typeof message !== "string" || !message.trim()) {
    return jsonResponse({ success: false, error: "Message is required" }, 400);
  }

  const cleanName = name.trim();
  const cleanPhone = phone && typeof phone === "string" ? phone.trim() : null;
  const cleanCompany = company && typeof company === "string" ? company.trim() : null;
  const cleanService = service && typeof service === "string" ? service.trim() : null;
  const cleanMessage = message.trim();

  // Save to Cloudflare D1 if available
  if (env.DB) {
    try {
      await env.DB.prepare(
        `INSERT INTO contacts (name, email, phone, company, service, message, created_at)
         VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`
      )
        .bind(cleanName, trimmedEmail, cleanPhone, cleanCompany, cleanService, cleanMessage)
        .run();
    } catch (dbErr) {
      console.error("D1 database insertion error:", dbErr);
      return jsonResponse(
        { success: false, error: "Failed to record inquiry in database. Please contact us directly." },
        500
      );
    }
  } else {
    console.warn("D1 database binding 'DB' not configured. Lead captured in log only:", {
      name: cleanName,
      email: trimmedEmail,
      service: cleanService,
    });
  }

  return jsonResponse({
    success: true,
    message: "Thank you for reaching out. We will get back to you within 24 hours.",
  });
}

async function handleContactGet(request, env) {
  if (!env.DB) {
    return jsonResponse({
      success: true,
      count: 0,
      data: [],
      note: "D1 database binding 'DB' is not configured in this environment.",
    });
  }

  try {
    const { results } = await env.DB.prepare(
      `SELECT id, name, email, phone, company, service, message, created_at
       FROM contacts
       ORDER BY created_at DESC
       LIMIT 100`
    ).all();

    return jsonResponse({
      success: true,
      count: results ? results.length : 0,
      data: results || [],
    });
  } catch (err) {
    console.error("D1 query error:", err);
    return jsonResponse({ success: false, error: "Failed to fetch contact inquiries" }, 500);
  }
}

async function handleLeadsDashboard(request, env) {
  let leads = [];
  if (env.DB) {
    try {
      const { results } = await env.DB.prepare(
        `SELECT id, name, email, phone, company, service, message, created_at
         FROM contacts
         ORDER BY created_at DESC
         LIMIT 200`
      ).all();
      leads = results || [];
    } catch (e) {
      console.error("Leads query error:", e);
    }
  }

  const rowsHtml = leads.length === 0
    ? `<tr><td colspan="7" class="empty">No inquiries received yet.</td></tr>`
    : leads
        .map(
          (lead) => `
      <tr>
        <td><strong>${escapeHtml(lead.name)}</strong></td>
        <td><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td>
        <td>${escapeHtml(lead.phone || "—")}</td>
        <td>${escapeHtml(lead.company || "—")}</td>
        <td><span class="badge">${escapeHtml(lead.service || "General")}</span></td>
        <td class="msg-cell" title="${escapeHtml(lead.message)}">${escapeHtml(lead.message)}</td>
        <td class="date-cell">${escapeHtml(lead.created_at || "—")}</td>
      </tr>`
        )
        .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="robots" content="noindex, nofollow"/>
  <title>SonBarsa Leads Dashboard</title>
  <style>
    :root {
      --bg: #090d16;
      --card: #111726;
      --border: #1e293b;
      --text: #f8fafc;
      --muted: #94a3b8;
      --primary: #3b82f6;
      --primary-hover: #2563eb;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      padding: 24px;
      line-height: 1.5;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 12px;
    }
    h1 { font-size: 24px; font-weight: 700; }
    .header-links a {
      color: var(--primary);
      text-decoration: none;
      font-size: 14px;
      margin-left: 16px;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .stat-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px 20px;
    }
    .stat-title { font-size: 13px; color: var(--muted); text-transform: uppercase; }
    .stat-value { font-size: 28px; font-weight: 700; margin-top: 4px; color: var(--text); }
    .table-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 14px;
    }
    th, td {
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
    }
    th {
      background: rgba(255,255,255,0.02);
      color: var(--muted);
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
    }
    tr:hover td { background: rgba(255,255,255,0.02); }
    a { color: var(--primary); text-decoration: none; }
    a:hover { text-decoration: underline; }
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      background: rgba(59, 130, 246, 0.15);
      color: #60a5fa;
      font-size: 12px;
    }
    .msg-cell {
      max-width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .date-cell { color: var(--muted); font-size: 12px; white-space: nowrap; }
    .empty { text-align: center; color: var(--muted); padding: 40px 16px; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div>
        <h1>SonBarsa Leads Dashboard</h1>
        <p style="color: var(--muted); font-size: 14px; margin-top: 4px;">Direct inquiries captured via Cloudflare D1</p>
      </div>
      <div class="header-links">
        <a href="/admin">Decap CMS</a>
        <a href="/" target="_blank">View Site ↗</a>
      </div>
    </header>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-title">Total Inquiries</div>
        <div class="stat-value">${leads.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">Latest Submission</div>
        <div class="stat-value" style="font-size: 16px; font-weight: 500; margin-top: 10px;">
          ${leads[0] ? escapeHtml(leads[0].created_at) : "None yet"}
        </div>
      </div>
    </div>

    <div class="table-card">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Service</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Canonical www -> apex redirect
    const host = request.headers.get("host") || "";
    if (host === "www.sonbarsa.com") {
      url.hostname = "sonbarsa.com";
      return Response.redirect(url.toString(), 301);
    }

    // Contact API routes (Cloudflare Worker + D1)
    if (url.pathname === "/api/contact") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS_HEADERS });
      }
      if (request.method === "POST") {
        return handleContactPost(request, env);
      }
      if (request.method === "GET") {
        return handleContactGet(request, env);
      }
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    // Leads Dashboard (Cloudflare D1 viewer)
    if (url.pathname === "/admin/leads") {
      return handleLeadsDashboard(request, env);
    }

    // Default: Serve Astro static assets with maximum Cloudflare Edge + Browser caching
    const response = await env.ASSETS.fetch(request);

    // If upstream response already contains explicit cache headers, return directly
    const existingCacheControl = response.headers.get("Cache-Control");
    if (existingCacheControl && !existingCacheControl.includes("max-age=0")) {
      return response;
    }

    const newHeaders = new Headers(response.headers);
    const path = url.pathname;

    if (
      path.startsWith("/_astro/") ||
      path.startsWith("/img/") ||
      path.endsWith(".png") ||
      path.endsWith(".jpg") ||
      path.endsWith(".jpeg") ||
      path.endsWith(".svg") ||
      path.endsWith(".webp") ||
      path.endsWith(".ico") ||
      path.endsWith(".woff2") ||
      path.endsWith(".webmanifest")
    ) {
      // Static assets: 1 Year (31,536,000s) Browser & Edge Cache
      newHeaders.set("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
    } else {
      // HTML pages: 24 Hours Browser Cache, 30 Days Cloudflare Edge Cache
      newHeaders.set("Cache-Control", "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=604800");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
