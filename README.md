# Bastich Books

Bastich Books is a full-stack premium ebook storefront and admin platform for the fictional author persona Dom Bastich. It is built with Next.js 15 App Router, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js v5, Stripe, Vercel Blob, Zod, and React Hook Form.

## What Is Included
- Public literary storefront with database-driven homepage, books listing, and book detail pages
- Admin dashboard for creating categories, saving drafts, and publishing books without code changes
- Auth.js credentials-based sign-in with seeded admin and reader accounts
- Stripe Checkout session creation, webhook handling, and order persistence
- Account area for orders, downloads, and wishlist management
- Vercel Blob upload architecture for covers and private ebook files
- SEO metadata, `robots.txt`, `sitemap.xml`, loading, error, and empty states

## Stack
- Next.js 15 App Router
- TypeScript
- Tailwind CSS v4
- Prisma 7 with PostgreSQL and `@prisma/adapter-pg`
- Auth.js / NextAuth v5 beta
- Stripe
- Vercel Blob
- Zod
- React Hook Form

## Local Setup
1. Install dependencies:

```bash
pnpm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Ensure PostgreSQL is available at the `DATABASE_URL` in `.env`.

4. Generate Prisma Client and run the initial migration:

```bash
pnpm prisma generate
pnpm prisma migrate dev
```

5. Seed the database:

```bash
pnpm db:seed
```

6. Start the development server:

```bash
pnpm dev
```

## Seed Accounts
- Admin: `admin@bastichbooks.com` / `dombastich`
- Reader: `reader@bastichbooks.com` / `dombastich`

## Environment Variables
Required for local development:

```bash
DATABASE_URL="postgresql://postgres@127.0.0.1:5433/bastichbooks?schema=public"
AUTH_SECRET="replace-with-a-long-random-string"
AUTH_URL="http://localhost:3000"
```

Optional but required for complete production feature activation:

```bash
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
BLOB_READ_WRITE_TOKEN=""
```

## Validation Commands
Run the full local validation sequence:

```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate dev
pnpm db:seed
pnpm lint
pnpm typecheck
pnpm build
```

## Important Notes
- Stripe checkout and webhook persistence are fully wired, but real payment confirmation requires real Stripe test credentials and a webhook endpoint.
- Blob upload fields are live in the admin UI, but actual file upload requires a valid `BLOB_READ_WRITE_TOKEN`.
- Ebook download authorization is implemented through `/api/downloads/[bookId]`. For production, keep ebook blobs private.
- Published books appear automatically on `/` and `/books` as soon as their status is switched to `PUBLISHED` in the admin UI.

## Deployment Notes
- Target platform is Vercel.
- Set the same environment variables in the Vercel project.
- Point `AUTH_URL` to the deployed domain.
- Configure the Stripe webhook endpoint to `https://your-domain.com/api/stripe/webhook`.
- Configure Vercel Blob in the same project and supply `BLOB_READ_WRITE_TOKEN`.
- Ensure the production PostgreSQL database is reachable from Vercel.
