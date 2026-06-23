# Little Muslim Learning Adventure

## Workspace Commands

- `npm install`
- `npm run dev:web`
- `npm run dev:api`
- `npm run test:api`
- `npm run db:seed --workspace @little-muslim/api`

## Environment Notes

- Web app API base URL: `NEXT_PUBLIC_API_BASE_URL` (defaults to `http://localhost:4000`)
- API server port: `PORT` (defaults to `4000`)
- Prisma database connection: `DATABASE_URL`
- Local XAMPP default: `mysql://root:@localhost:3306/little_muslim_academy`
- Copy `.env.example` to `.env` for local setup

## Demo Accounts

- Parent: `parent@example.com` / `password123`
- Admin: `admin@example.com` / `password123`
- Guest users can preview the public marketing pages plus preview worlds only

## Bootstrap Verification

Before the workspace manifests were added, running `npm install` at the repository root failed with `ENOENT` because `package.json` did not exist yet.
Before Task 2 landed, running `npm run test:api -- --runInBand` failed because `@little-muslim/shared` did not yet expose a resolvable package entry for the API test import.
Before Task 3 was implemented, the targeted health test failed because `createApp` and the `/health` route wiring were missing from `apps/api`.
Task 3 acceptance is currently verified by both `npm.cmd run test --workspace @little-muslim/api -- src/__tests__/health.test.ts` passing and `npm.cmd run build:api` passing after the API TypeScript config and dependency version follow-up fixes.
Task 4 verification note: the targeted auth test initially failed with a `404` because `POST /auth/signin` did not exist yet.
Task 4 verification note: the targeted auth test passed after the auth route and service wiring landed.
Task 5 verification note: the seed coverage test initially failed because `apps/api/prisma/seed.ts` did not exist yet.
Task 5 verification note: `npm.cmd run test --workspace @little-muslim/api -- src/__tests__/game-worlds.test.ts`, the existing API tests, and `npm.cmd run build:api` all pass after the Prisma 7 schema/config/client wiring landed.
Task 6 verification note: the `GET /game-worlds` and `POST /payments/checkout` tests initially failed with `404` because those routes did not exist yet.
Task 6 verification note: the new world and payment tests, the existing API tests, and `npm.cmd run build:api` all pass after the route wiring landed.
Task 7 verification note: the first `npm.cmd run build:web` attempt failed before the App Router pages and Tailwind setup were fully in place.
Task 7 verification note: `npm.cmd run build:web` now passes after the public, parent, and game-shell frontend pages were added.
Task 8 verification note: the frontend JWT session flow now validates against `GET /auth/me`, protects parent/admin/premium routes, and still leaves preview worlds visible to guests.
Task 9 verification note: parent overview pages now read live local MySQL data, and Huruf Island plus Writing Garden save child stars, coins, and world unlock progress through `POST /parent/progress`.
