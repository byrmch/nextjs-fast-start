<div align="center">

# nextjs-fast-start

**Lightweight Next.js 16 starter — auth, database, AI, shadcn/ui, zero config**

<p>
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js 16">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma" alt="Prisma 7">
  <img src="https://img.shields.io/badge/SQLite-003B57?logo=sqlite" alt="SQLite">
  <img src="https://img.shields.io/badge/AI_SDK-7-000?logo=vercel" alt="AI SDK v7">
  <img src="https://img.shields.io/badge/shadcn/ui-2d3748?logo=shadcnui" alt="shadcn/ui">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
</p>

[中文文档](README_CN.md)

</div>

## Quick Start

1. **Create project from template**
   ```bash
   pnpm create next-app@latest my-project --example https://github.com/byrmch/nextjs-fast-start
   cd my-project
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   node -e "const{randomBytes}=require('crypto'),{readFileSync,writeFileSync}=require('fs'),e=readFileSync('.env','utf8');writeFileSync('.env',e.replace('your-secret-at-least-32-chars',randomBytes(32).toString('base64')))"
   ```
   Copies `.env.example` → `.env`, then auto-generates a secure `BETTER_AUTH_SECRET` and writes it in.

3. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```
   Generates the typed database client from `prisma/schema.prisma`.

4. **Initialize database**
   ```bash
   npx prisma db push
   ```
   Pushes the Prisma schema to SQLite — creates all tables.

5. **Seed test user**
   ```bash
   npx prisma db seed
   ```
   Creates a test account: `test@example.com` / `12345678`.

6. **Start dev server**
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) — the homepage runs a self-check for all modules.

## Features

| | |
|---|---|
| **Auth** | Better Auth v1.6, email/password sign-up & sign-in |
| **Database** | Prisma v7 + SQLite, zero config |
| **AI** | Vercel AI SDK v7 + DeepSeek |
| **UI** | Tailwind CSS v4 + shadcn/ui, dark mode follows system |
| **Unified Response** | `{ code, data, msg }` + `success()` / `fail()` |
| **Error Handling** | `AppError` + `withErrorHandler`, zero try/catch |
| **Proxy** | Auth guard + request logging + response time header |
| **Env Validation** | Zod schema, validated at startup |
| **Security Headers** | CSP / X-Frame-Options / Referrer-Policy |

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui |
| ORM | Prisma 7 + SQLite |
| Auth | Better Auth 1.6 |
| AI | Vercel AI SDK 7 + DeepSeek |

## Environment Variables

```bash
cp .env.example .env
```

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | SQLite file path | `file:./dev.db` |
| `BETTER_AUTH_SECRET` | Auth secret (≥32 chars) | - |
| `BETTER_AUTH_URL` | App URL | `http://localhost:3000` |
| `AI_MODEL` | AI model name | `deepseek-v4-flash` |
| `DEEPSEEK_API_KEY` | DeepSeek API key | - |

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint check |
| `npx prisma db push` | Database initialization |
| `npx prisma db seed` | Seed test user |

## Project Structure

```
src/
├── core/               # Pluggable feature modules
│   ├── ai/             #   AI API wrapper
│   ├── auth/           #   Better Auth config
│   ├── db/             #   Prisma client
│   └── response/       #   Unified response + error codes
├── config/env.ts       # Env validation
├── proxy.ts            # Auth guard + request logging
├── lib/utils.ts        # cn() utility
├── components/
│   ├── ui/             # shadcn/ui components
│   └── layout/         # Navbar
├── app/
│   ├── page.tsx        # Self-check homepage
│   ├── layout.tsx      # Root layout
│   ├── error.tsx       # Error boundary
│   └── api/            # API routes
prisma/
├── schema.prisma       # Data models
├── migrations/
└── seed.ts
```

## License

MIT © [byrmch](https://github.com/byrmch)
