# Workspace

## Overview

PropFirmMarket — India's #1 prop firm comparison platform. Part of the PFM Ecosystem (Market, Championship, Terminal).

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + wouter (client-side routing)
- **AI**: Replit OpenAI Integration (gpt-5-mini via streaming)
- **Cron**: node-cron (daily blog at 06:00 IST)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Artifacts

- **propfirmmarket** (`/`) — Main React + Vite frontend, serves at port 20503
- **api-server** (`/api`) — Express API server, serves at port 8080

## Routing

- Frontend at `/`, API server at `/api` (both routed by Replit proxy)
- Vite dev server proxies `/api` → `localhost:8080`
- Frontend uses wouter for client-side routing (`/blog`, `/blog/:slug`)

## Security

- **Helmet**: Security headers on all API responses
- **CORS**: Restricted to propfirmmarket.in, replit.dev/app domains, and dev mode
- **Rate limiting**: Global 200 req/15min; blog generation 5 req/hour
- **Admin auth**: `/api/blog/generate`, `/api/deals/update`, `/api/deals/admin` require `x-admin-key` header matching `ADMIN_API_KEY` env var
- **XSS**: Blog HTML sanitized via DOMPurify before rendering
- **SQL injection**: All queries via Drizzle ORM (parameterized)
- **Auth**: Client-side mock auth (localStorage) — not production-grade; consider Clerk/Supabase for real auth

## Blog System (AI SEO)

- **API routes**: `POST /api/blog/generate` (admin+rate-limited), `GET /api/blogs`, `GET /api/blog/:slug`, `GET /api/blog-keywords`
- **AI**: `artifacts/api-server/src/lib/ai.ts` — gpt-5-mini streaming, 20 SEO keywords, slugify, category/tag extraction
- **Cron**: `artifacts/api-server/src/lib/cron.ts` — daily auto-generation at 06:00 IST (uses admin key)
- **DB schema**: `lib/db/src/schema/blogs.ts` — blogs table with title, slug, keyword, content, views, etc.
- **Frontend**: `src/pages/BlogListPage.tsx`, `src/pages/BlogPostPage.tsx` — full blog UI with share buttons, CTA, DOMPurify

## Key Frontend Features

- EcosystemBar (sticky top, Market/Championship/Terminal switcher)
- AI assistant (Priya), smart firm finder, voice-ready
- Scam detector, pass probability calculator, live payout tracker
- Verified reviews, firm comparison, awards section
- Community, loyalty program, economic calendar, Prop Firm TV
- Blacklisted firms section
- Conversion funnel popups (welcome, profit, loss, exit intent)
- 50% affiliate commission tracking
- 33 real firm logos in `/public/logos/`

## CSS Variables

- `--bg:#050a0e`, `--g1:#00e87b`, `--gold:#fbbf24`, `--purple:#8b5cf6`, `--cyan:#00d4ff`

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
