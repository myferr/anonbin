<h1 align="center">anonbin</h1>

<p align="center">A simple, anonymous pastebin with no accounts, no guarantees.</p>

<p align="center">
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/deployed%20on-vercel-black?style=for-the-badge&logo=vercel" alt="Deployed on Vercel" /></a>
  <a href="https://github.com/myferr/anonbin/blob/main/LICENSE"><img src="https://img.shields.io/github/license/myferr/anonbin?style=for-the-badge" alt="License" /></a>
  <a href="https://github.com/myferr/anonbin"><img src="https://img.shields.io/github/stars/myferr/anonbin?style=for-the-badge" alt="GitHub Stars" /></a>
</p>

---

## 📋 What is this?

**anonbin** is a no-signup, minimal pastebin. Paste your text, get a link. That's it.

- ✅ No login required
- 🌐 Public or unlisted pastes
- ⚡️ Fast and anonymous
- 🚫 No database

## 🧰 Stack

- **Frontend**: Next.js 15 , Tailwind CSS, `shadcn/ui`, TypeScript
- **Backend**: Lua with LuaSocket (no framework, no DB)
- **Infra**: Cloudflare Tunnel + Vercel

## 🔧 Running Locally

### Lua API

```bash
lua api.lua
```

* Serves on `localhost:1141`
* Stores pastes as flat files in `data/content/`
* Routes:

  * `GET /public`
  * `POST /submit`
  * `GET /view/:id`

### Tunnel (Cloudflare)

```bash
cloudflared tunnel --url http://localhost:1141
```

Then in your `.env` file:

```env
CF_TUNNEL_URL=https://your-tunnel.trycloudflare.com
```

---

## 💻 Frontend Dev

```bash
cd frontend
npm install
npm dev
```

* Proxies backend via `/api/*`
* All requests go through your Cloudflare tunnel (`CF_TUNNEL_URL` value in .env)


<p align="center">
  Just a pastebin. Nothing more.
</p>
