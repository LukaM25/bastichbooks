# Bastich Books Execution Plan

## Goal
Build a production-ready full-stack ebook storefront and admin platform for Dom Bastich on Next.js 15, with database-driven publishing, payments, uploads, account management, and Vercel deployment readiness.

## Risks
- Stripe checkout and webhook confirmation are wired, but real payment verification still depends on Stripe test credentials and webhook delivery.
- Vercel Blob upload and private ebook delivery are wired, but cannot be exercised without a real `BLOB_READ_WRITE_TOKEN`.
- Auth.js v5 remains beta, so future package bumps should be revalidated against middleware and adapter behavior.

## Assumptions
- `pnpm` is available locally.
- A PostgreSQL database will be provided through `DATABASE_URL`.
- Vercel is the deployment target, so server-side environment variables and Blob storage are acceptable runtime dependencies.
- A single owner/admin manages catalog publishing and fulfillment.

## Missing Setup
- Real Stripe test/live keys and webhook endpoint configuration.
- Vercel Blob store token for upload and private delivery flows.
- Production Postgres connection string for deployment.

## Milestones
| Milestone | Status | Notes |
| --- | --- | --- |
| 1. Project scaffold, configs, theme tokens, layout system | Completed | Next.js 15 app shell, editorial theme tokens, shared layout, loading/error/404 states |
| 2. Prisma schema, migrations, seed data | Completed | PostgreSQL schema, Prisma 7 config, initial migration, seed accounts/books/categories/orders |
| 3. Auth setup and role-based route protection | Completed | Auth.js v5 credentials auth, middleware, seeded admin/reader accounts |
| 4. Public storefront routes and database-driven rendering | Completed | Homepage, catalog, book detail pages powered directly from published database records |
| 5. Admin dashboard and CRUD for books/categories | Completed | Admin overview, category management, draft/publish workflow, create/edit/archive book flows |
| 6. Upload flow with Vercel Blob | Completed | Blob-ready admin upload fields and server-side cover/private ebook upload actions |
| 7. Stripe checkout, webhook, order persistence | Completed | Checkout Session creation, order draft persistence, webhook status updates |
| 8. Account dashboard with downloads, orders, wishlist | Completed | Account overview, order history, library downloads, wishlist management |
| 9. SEO, metadata, 404/loading states, README | Completed | Metadata, robots, sitemap, docs, route fallbacks, repository instructions |

## Validation Log
- `pnpm install`
- `pnpm prisma generate`
- `pnpm prisma migrate dev --name init`
- `pnpm db:seed`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm start --port 3001`
- `curl -I http://127.0.0.1:3001/`
- `curl -I http://127.0.0.1:3001/books`
- `curl -I http://127.0.0.1:3001/sign-in`
