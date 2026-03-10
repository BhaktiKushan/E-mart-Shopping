# E-mart Shopping

A React + Vite shopping UI with category browsing, product detail pages, search, cart, auth, and payment flow.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

---

## Deploy (Vercel)

This repo now includes `vercel.json` with SPA rewrite support so deep links like `/mobiles/1`, `/cart`, `/search`, etc. work in production.

### Steps
1. Push this repo to GitHub.
2. Import the repository in Vercel.
3. Use defaults:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy.

---

## Deploy (Netlify)

This repo now includes `netlify.toml` with SPA redirect support.

### Steps
1. Push this repo to GitHub.
2. Import the repository in Netlify.
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy.

---

## Why rewrite/redirect is required

This is a React Router SPA. On direct refresh of nested routes (for example `/speaker/2`), hosting must return `index.html` so the client router can resolve the route.
