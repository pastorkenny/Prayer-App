// /api/notion.js — Vercel serverless function
// Holds the Notion token server-side. The browser never sees it.
// Set NOTION_TOKEN in Vercel → Project → Settings → Environment Variables.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const TOKEN = process.env.NOTION_TOKEN;
  if (!TOKEN) {
    return res.status(500).json({ error: "NOTION_TOKEN not set on server" });
  }

  try {
    const { path, method = "POST", body } = req.body || {};
    if (!path || !path.startsWith("/")) {
      return res.status(400).json({ error: "Missing or invalid 'path'" });
    }

    const r = await fetch("https://api.notion.com/v1" + path, {
      method,
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Notion-Version": "2026-03-11",
        "Content-Type": "application/json"
      },
      body: body ? JSON.stringify(body) : undefined
    });

    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
