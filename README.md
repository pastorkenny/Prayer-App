# Prayer App — Deploy in ~15 min

Two files do everything: `index.html` (the app) and `api/notion.js` (keeps your token safe).

## Steps

1. **Get your Notion token**
   - https://www.notion.so/my-integrations → New integration → Internal.
   - Enable Read / Insert / Update content. Copy the secret.

2. **Share both databases with it** (once each)
   - Open each database → ••• → Connections → Add connections → your integration.
   - Prayer Requests + Daily Reflections.

3. **Deploy to Vercel**
   - Put this folder in a GitHub repo (or run `vercel` from the folder).
   - Vercel auto-detects it. No build step needed.

4. **Add the token**
   - Vercel → Project → Settings → Environment Variables → add `NOTION_TOKEN` = your secret → redeploy.

5. **Open the URL** → add to iPhone home screen (Safari → Share → Add to Home Screen).

## If it says "Not connected yet"
- Token not set, or databases not shared with the integration, or wrong data source IDs.
- The two IDs are already filled into `index.html` (top of the script) — leave them as-is unless you rebuild the databases.

## Notes
- Token lives only in `api/notion.js` on the server. Never in the browser.
- Marking answered stamps the date from the app, so the Notion automation is optional (keep it as a backstop for edits made inside Notion).
- API version pinned to `2026-03-11`.

Sources: Notion Docs — Authentication (https://developers.notion.com/reference/authentication), Authorization/sharing (https://developers.notion.com/docs/authorization), Data sources (https://developers.notion.com/docs/upgrade-faqs-2025-09-03).
