# Bastich Books Repository Guide

## Repo Conventions
- Use `pnpm` for all package and script management.
- Prefer server components; only mark client boundaries where interaction requires it.
- Keep business logic in `src/lib`, feature queries/actions in `src/features`, and reusable UI in `src/components`.
- Validate external input with Zod before mutating data.
- Keep public storefront routes under `src/app/books` and private/admin surfaces under `src/app/account` and `src/app/admin`.
- Favor composable modules over large route files.

## Folder Structure
- `src/app`: App Router routes, layouts, metadata, route handlers, and server actions
- `src/components`: Design system, shared UI, forms, and feature components
- `src/lib`: Utilities, auth helpers, Prisma client, Stripe, Blob, validation, and data access
- `src/features`: Feature-level modules for books, checkout, account, and admin flows
- `prisma`: Prisma schema, migrations, and seed scripts
- `public`: Static assets

## Commands
- `pnpm install`
- `pnpm prisma generate`
- `pnpm prisma migrate dev`
- `pnpm db:seed`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm dev`

## Coding Standards
- TypeScript strict mode stays on.
- Use semantic HTML and accessible labels, roles, and keyboard behavior.
- Add loading, empty, and error states for user-facing flows.
- Avoid generic dashboard and SaaS aesthetics; keep styling editorial and tactile.
- Treat Stripe and Blob integrations as environment-dependent: wire them fully, but fail gracefully when credentials are absent.
- Keep comments minimal and only where they clarify non-obvious behavior.
- Use `apply_patch` for manual edits.

## Definition Of Done
- Relevant milestone code compiles and integrates with the rest of the app.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` pass for completed milestones when the required local services are available.
- Database flows are migrated and seeded when schema changes are introduced.
- `PLANS.md` reflects milestone status, validation commands, and any remaining blockers.
