# MAD AI Frontend (Vercel)
One static file (`index.html`) plus `vercel.json`. No build step, no storage, no database. Every account, chat, task and payment lives in the Render backend (MongoDB Atlas).

## Deploy
1. Put these files at the root of a GitHub repo (separate from the backend). In Vercel: Add New > Project > import it. Framework preset: **Other**. Leave build settings empty.
2. In `vercel.json`, replace `YOUR-SERVICE.onrender.com` with your Render service host. Commit.
3. In **Render > Environment** set:
   - `FRONTEND_URL` = your Vercel URL (e.g. `https://madai.vercel.app` or your custom domain), no trailing slash
   - `COOKIE_SAMESITE` = `lax`
   - `TRUST_PROXY_HOPS` = `2`
   Redeploy the backend.
4. In Stripe, set the webhook to the Render URL (`https://YOUR-SERVICE.onrender.com/api/billing/webhook`), not Vercel.

## How it talks to the backend
The browser only ever calls `/api/...` on your Vercel domain. Vercel forwards those to Render, so the login cookie is first-party and no CORS setup is needed.
Pages: home, pricing (personal, business, Mad Packs), sign up, log in, forgot/reset password, email verification, dashboard (chat, tasks, projects, team, billing).
Email links open `/verify-email?token=` and `/reset-password?token=`, and Stripe returns to `/dashboard`. All are handled.

## Check it works (in order)
1. Open `/api/health` on your Vercel domain. You should see `{"status":"online"...}`. If not, the rewrite URL in `vercel.json` is wrong.
2. Sign up, then refresh the page. You should stay logged in.
3. Send a chat message. If you get "AI service temporarily unavailable", check `OPENAI_API_KEY` and `OPENAI_MODEL` on Render.
4. Use Stripe **test mode** first for a plan and a Mad Pack.

## Known limits
- Very long AI builds go through Vercel's proxy. If a build times out there, point the frontend at a custom API domain (`api.yourdomain.com` on Render) and tell me; it's a small change.
- The Render free plan sleeps when idle, so the first request after a break is slow.
