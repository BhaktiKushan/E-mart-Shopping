# E-mart Shopping (React + MongoDB Atlas)

E-mart includes a MongoDB-backed backend for authentication and cart persistence.

## 1) Install

```bash
npm install
```

## 2) Environment

Copy `.env.example` to `.env` and configure MongoDB.

```bash
cp .env.example .env
```

### Atlas setup (your current details)
From your provided Atlas screenshots/details:
- Connection template: `mongodb+srv://Emart123:<db_password>@cluster0.h4xhkeu.mongodb.net/?appName=Cluster0`
- DB username: `Emart123`
- Cluster host: `cluster0.h4xhkeu.mongodb.net`

In `.env`, set:
- `MONGODB_URI=mongodb+srv://Emart123:<your_real_password>@cluster0.h4xhkeu.mongodb.net/?appName=Cluster0`

> Important: keep `<your_real_password>` secret and never commit it to git.

You can also use split vars (`MONGODB_USERNAME`, `MONGODB_PASSWORD`, `MONGODB_CLUSTER`, `MONGODB_DB_NAME`) if preferred.

## 3) Run full app (frontend + backend)

```bash
npm run dev:full
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`

## 4) Frontend only

```bash
npm run dev
```

## 5) Backend only

```bash
npm run server
```

## Build

```bash
npm run build
```

## MongoDB-backed APIs

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/cart/:userId`
- `POST /api/cart/:userId/add`
- `PATCH /api/cart/:userId/quantity`
- `DELETE /api/cart/:userId/item/:key`
- `DELETE /api/cart/:userId/clear`

## Deploy notes

- `vercel.json` and `netlify.toml` are included for SPA routing.
- Deploy frontend to Vercel/Netlify and backend separately (Render/Railway/Fly).
- Set backend environment variables (`MONGODB_URI` or split Mongo vars) and frontend `VITE_API_URL` to your deployed API URL.
