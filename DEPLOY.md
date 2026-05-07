# 🚀 FitPal — Deploy to Vercel in 10 Minutes

No coding experience needed. Follow these steps exactly.

---

## STEP 1 — Get your free accounts (5 mins)

You need two free accounts if you don't have them already:

1. **GitHub** → https://github.com (free)
   - This is where your code lives

2. **Vercel** → https://vercel.com (free)
   - This is what makes it live on the internet
   - Sign up using your GitHub account (easier)

---

## STEP 2 — Put your code on GitHub (3 mins)

1. Go to https://github.com and log in
2. Click the **"+"** button (top right) → **"New repository"**
3. Name it: `fitpal`
4. Make sure it's set to **Public**
5. Click **"Create repository"**
6. On the next page, click **"uploading an existing file"**
7. Drag and drop the entire **fitpal** folder contents into the upload area
8. Click **"Commit changes"**

---

## STEP 3 — Deploy on Vercel (2 mins)

1. Go to https://vercel.com and log in
2. Click **"Add New Project"**
3. You'll see your GitHub repos — click **"Import"** next to `fitpal`
4. Vercel will auto-detect it's a Vite/React app ✅
5. **Don't click Deploy yet** — you need to add your API key first (Step 4)

---

## STEP 4 — Add your API keys (3 mins)

This is the most important step — keys stay secret and secure on the server.

### Anthropic (Claude) — for workout plan generation
1. Get your key from: https://console.anthropic.com
   - Sign up → **"API Keys"** → **"Create Key"**
   - Copy the key (starts with `sk-ant-...`)
2. In Vercel → **"Environment Variables"** → Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your `sk-ant-...` key

### DeepSeek — for daily chat (95% cheaper!)
1. Get your key from: https://platform.deepseek.com
   - Sign up (free) → **"API Keys"** → **"Create Key"**
   - Copy the key (starts with `sk-...`)
   - Top up with just $5 — lasts a very long time
2. In Vercel → **"Environment Variables"** → Add:
   - **Name:** `DEEPSEEK_API_KEY`
   - **Value:** your DeepSeek key

3. Now click **"Deploy"** 🚀

### How the hybrid works:
- 🧠 **Workout plan generation** → Claude (runs once, high quality)
- 💬 **Daily chat** → DeepSeek by default (95% cheaper)
- Users can switch to Claude chat in the app via the toggle in the chat header

---

## STEP 5 — You're live! 🎉

Vercel will give you a URL like:
`https://fitpal-yourname.vercel.app`

That's your live app! Share it anywhere.

---

## STEP 6 — Add a custom domain (optional, ~£12/year)

1. Buy a domain at https://namecheap.com or https://domains.google
   - Suggested: `getfitpal.com` or `fitpal.app`
2. In Vercel → your project → **"Domains"** → **"Add"**
3. Follow Vercel's instructions to connect it (usually 5 mins)

---

## 💡 Tips

- **Every time you update the app**, just upload the new files to GitHub and Vercel auto-redeploys in ~30 seconds
- **To see usage/costs**, check https://console.anthropic.com
- **If something breaks**, check Vercel → your project → **"Deployments"** → click the latest one → **"Functions"** for error logs

---

## 📱 Making it feel like a real phone app

Once live, users can "install" it on their phone:

**iPhone:** Open in Safari → Share button → "Add to Home Screen"
**Android:** Open in Chrome → menu → "Add to Home Screen"

It'll appear as a proper app icon on their phone with no browser bar!

---

## 🆘 Need help?

If you get stuck on any step, just come back to Claude and paste the error message — we'll fix it together.
