FLEMINGO IT DAILY REPORT - MINI APP FRONTEND

This is the starter Telegram Mini App interface. It is a frontend shell only; buttons currently show connection notices. It does NOT yet read/write Supabase or authenticate roles. Do not expose SUPABASE service-role keys in browser code.

Deploy this folder to any HTTPS static host (GitHub Pages, Cloudflare Pages, Netlify, etc.). Then set WEBAPP_URL in your bot hosting environment to the exact HTTPS URL.

Use bot_miniapp.py in place of bot.py after reviewing it. It adds an Open IT Service Desk Telegram Web App keyboard button and reads WEBAPP_URL. Existing bot workflows remain.

For production, add a backend API that validates Telegram WebApp initData and checks employee/admin roles from Supabase before exposing reports, profile data, or admin operations.
