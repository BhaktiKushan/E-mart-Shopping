# E-mart Shopping (React + MongoDB)

E-mart now includes a MongoDB-backed backend for authentication and cart persistence.

## 1) Install

```bash
npm install
```

## 2) Environment

Copy `.env.example` to `.env` and set values as needed.

```bash
cp .env.example .env
```

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
- Deploy frontend to Vercel/Netlify and backend separately (e.g., Render/Railway) with `MONGODB_URI` configured.
