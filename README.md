# My Portfolio

Personal portfolio — MERN stack, dark editorial design. Web + Android developer.

## Quick start

```bash
npm install
cp server/.env.example server/.env   # edit MONGODB_URI if needed
npm run seed
npm run dev
```

- **Site:** http://localhost:5173
- **API:** http://localhost:5000

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite frontend + Express API (watch mode) |
| `npm run build` | Typecheck + production frontend build |
| `npm start` | Serve API + built frontend (production) |
| `npm run seed` | Reset & seed projects + experience in MongoDB |

## Content

- **Static copy** (name, bio, links): `src/content.ts`
- **Projects & experience**: `server/seed.js` → run `npm run seed`

## Environment

See `server/.env.example`. Required: `MONGODB_URI`. Optional SMTP vars enable contact-form email notifications.

## Deploy (Render)

1. Push to GitHub and connect the repo on [Render](https://render.com).
2. Use the included `render.yaml` or set build `npm install && npm run build`, start `npm start`.
3. Add `MONGODB_URI` (MongoDB Atlas) and `CLIENT_ORIGIN` (your public URL).
