# Little Muslim Learning Adventure Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the repository into a runnable monorepo foundation for `Little Muslim Learning Adventure` with shared contracts, API and web scaffolds, game-first route structure, auth groundwork, payment placeholder plumbing, Prisma schema, seed data, and the first public, parent, child, and admin shells.

**Architecture:** Use a monorepo with `apps/web`, `apps/api`, and `packages/shared`. Establish the API as the single authority for auth, entitlement, and progression data; establish the web app as four route surfaces; and model the database around worlds, levels, activities, child profiles, rewards, and payments instead of modules.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Node.js, Express.js, Prisma, MySQL, JWT, bcrypt, Vitest, Testing Library, Supertest

---

## Scope Check

The approved spec covers multiple independent subsystems. This plan intentionally handles only the `foundation slice`:

- repo bootstrap and tooling
- shared package contracts
- API foundation
- Prisma schema and seed data
- web shell and route groups
- first public, parent, child, and admin shells
- payment placeholder and preview gating groundwork

Follow-on plans should be written separately for:

- world-specific mini-game implementation
- tracing canvas and story playback mechanics
- full admin CRUD workflows
- production payment provider integration
- full bilingual content expansion and polish

## File Structure

### Create

- `package.json`
- `tsconfig.base.json`
- `.gitignore`
- `README.md`
- `apps/api/package.json`
- `apps/api/tsconfig.json`
- `apps/api/prisma.config.ts`
- `apps/api/prisma/schema.prisma`
- `apps/api/prisma/seed.ts`
- `apps/api/src/index.ts`
- `apps/api/src/app.ts`
- `apps/api/src/config/env.ts`
- `apps/api/src/lib/prisma.ts`
- `apps/api/src/lib/jwt.ts`
- `apps/api/src/lib/password.ts`
- `apps/api/src/middleware/auth.ts`
- `apps/api/src/middleware/error-handler.ts`
- `apps/api/src/modules/health/routes.ts`
- `apps/api/src/modules/auth/routes.ts`
- `apps/api/src/modules/auth/service.ts`
- `apps/api/src/modules/payments/routes.ts`
- `apps/api/src/modules/payments/service.ts`
- `apps/api/src/modules/game-worlds/routes.ts`
- `apps/api/src/modules/game-worlds/service.ts`
- `apps/api/src/modules/child-profiles/routes.ts`
- `apps/api/src/modules/child-profiles/service.ts`
- `apps/api/src/modules/progress/routes.ts`
- `apps/api/src/modules/progress/service.ts`
- `apps/api/src/modules/admin/routes.ts`
- `apps/api/src/__tests__/health.test.ts`
- `apps/api/src/__tests__/auth.test.ts`
- `apps/api/src/__tests__/game-worlds.test.ts`
- `apps/api/src/__tests__/payments.test.ts`
- `apps/web/package.json`
- `apps/web/tsconfig.json`
- `apps/web/next.config.ts`
- `apps/web/postcss.config.js`
- `apps/web/tailwind.config.ts`
- `apps/web/src/app/globals.css`
- `apps/web/src/app/layout.tsx`
- `apps/web/src/app/page.tsx`
- `apps/web/src/app/(public)/pricing/page.tsx`
- `apps/web/src/app/(public)/signin/page.tsx`
- `apps/web/src/app/(public)/signup/page.tsx`
- `apps/web/src/app/(public)/checkout/page.tsx`
- `apps/web/src/app/(public)/payment/success/page.tsx`
- `apps/web/src/app/(public)/payment/failed/page.tsx`
- `apps/web/src/app/(parent)/dashboard/page.tsx`
- `apps/web/src/app/(parent)/children/page.tsx`
- `apps/web/src/app/(child)/map/page.tsx`
- `apps/web/src/app/(child)/world/[worldKey]/page.tsx`
- `apps/web/src/app/(admin)/admin/page.tsx`
- `apps/web/src/components/layout/site-shell.tsx`
- `apps/web/src/components/layout/section.tsx`
- `apps/web/src/components/game/world-card.tsx`
- `apps/web/src/components/game/level-card.tsx`
- `apps/web/src/components/game/reward-pill.tsx`
- `apps/web/src/lib/api.ts`
- `apps/web/src/lib/content.ts`
- `apps/web/src/lib/demo-data.ts`
- `packages/shared/package.json`
- `packages/shared/tsconfig.json`
- `packages/shared/src/index.ts`
- `packages/shared/src/auth.ts`
- `packages/shared/src/game.ts`
- `packages/shared/src/payments.ts`
- `packages/shared/src/content.ts`
- `packages/shared/src/i18n.ts`
- `packages/shared/src/validation.ts`

### Modify

- `docs/project-agents.md`
- `docs/superpowers/specs/2026-06-23-little-muslim-learning-adventure-design.md`

### Test

- `apps/api/src/__tests__/health.test.ts`
- `apps/api/src/__tests__/auth.test.ts`
- `apps/api/src/__tests__/game-worlds.test.ts`
- `apps/api/src/__tests__/payments.test.ts`

## Task 1: Rebuild The Workspace Skeleton

**Files:**
- Create: `package.json`
- Create: `tsconfig.base.json`
- Create: `.gitignore`
- Create: `README.md`
- Create: `apps/api/package.json`
- Create: `apps/api/tsconfig.json`
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `packages/shared/package.json`
- Create: `packages/shared/tsconfig.json`

- [ ] **Step 1: Write the failing workspace sanity check**

Create `README.md` with the expected workspace commands so the next tasks have an explicit contract:

```md
# Little Muslim Learning Adventure

## Workspace Commands

- `npm install`
- `npm run dev:web`
- `npm run dev:api`
- `npm run test:api`
- `npm run db:seed --workspace @little-muslim/api`
```

- [ ] **Step 2: Run install to verify the workspace is currently broken**

Run: `npm install`
Expected: FAIL because `package.json` does not exist in the repo root.

- [ ] **Step 3: Add the root and workspace package manifests**

Create `package.json`:

```json
{
  "name": "little-muslim-academy",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev:web": "npm run dev --workspace @little-muslim/web",
    "dev:api": "npm run dev --workspace @little-muslim/api",
    "build:web": "npm run build --workspace @little-muslim/web",
    "build:api": "npm run build --workspace @little-muslim/api",
    "test:api": "npm run test --workspace @little-muslim/api"
  }
}
```

Create `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "baseUrl": "."
  }
}
```

Create `.gitignore`:

```gitignore
node_modules
.next
dist
coverage
.env
.env.*
!.env.example
prisma/dev.db
.superpowers/
```

- [ ] **Step 4: Add the workspace package definitions**

Create `apps/api/package.json`:

```json
{
  "name": "@little-muslim/api",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc -p tsconfig.json",
    "test": "vitest run",
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

Create `apps/web/package.json`:

```json
{
  "name": "@little-muslim/web",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}
```

Create `packages/shared/package.json`:

```json
{
  "name": "@little-muslim/shared",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  }
}
```

- [ ] **Step 5: Run install and commit the workspace bootstrap**

Run: `npm install`
Expected: PASS with a generated `package-lock.json`.

Run: `git add package.json package-lock.json tsconfig.base.json .gitignore README.md apps/api/package.json apps/api/tsconfig.json apps/web/package.json apps/web/tsconfig.json packages/shared/package.json packages/shared/tsconfig.json`

Run: `git commit -m "chore: rebuild workspace foundation"`

## Task 2: Define Shared Game And Auth Contracts

**Files:**
- Create: `packages/shared/src/index.ts`
- Create: `packages/shared/src/auth.ts`
- Create: `packages/shared/src/game.ts`
- Create: `packages/shared/src/payments.ts`
- Create: `packages/shared/src/content.ts`
- Create: `packages/shared/src/i18n.ts`
- Create: `packages/shared/src/validation.ts`
- Modify: `packages/shared/package.json`

- [ ] **Step 1: Write the failing shared-contract import test**

Create `apps/api/src/__tests__/health.test.ts` with an import from `@little-muslim/shared`:

```ts
import { describe, expect, it } from "vitest";
import { APP_LANGUAGES } from "@little-muslim/shared";

describe("shared contracts", () => {
  it("exports bilingual language constants", () => {
    expect(APP_LANGUAGES).toEqual(["ms", "en"]);
  });
});
```

- [ ] **Step 2: Run the test to verify the shared exports do not exist yet**

Run: `npm run test:api -- --runInBand`
Expected: FAIL with module resolution or missing export errors for `@little-muslim/shared`.

- [ ] **Step 3: Implement the shared auth, game, payment, and i18n contracts**

Create `packages/shared/src/auth.ts`:

```ts
export const USER_ROLES = ["parent", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];
```

Create `packages/shared/src/i18n.ts`:

```ts
export const APP_LANGUAGES = ["ms", "en"] as const;
export type AppLanguage = (typeof APP_LANGUAGES)[number];
```

Create `packages/shared/src/game.ts`:

```ts
export const WORLD_KEYS = [
  "huruf-island",
  "story-forest",
  "kalimah-castle",
  "writing-garden",
  "doa-village",
  "picture-dictionary-zoo"
] as const;

export type WorldKey = (typeof WORLD_KEYS)[number];
```

Create `packages/shared/src/payments.ts`:

```ts
export const PAYMENT_STATUSES = [
  "initiated",
  "pending",
  "paid",
  "failed",
  "expired",
  "refunded"
] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
```

- [ ] **Step 4: Add content, validation, and root exports**

Create `packages/shared/src/content.ts`:

```ts
export type LocalizedText = {
  ms: string;
  en: string;
};
```

Create `packages/shared/src/validation.ts`:

```ts
export type SignInInput = {
  email: string;
  password: string;
};
```

Create `packages/shared/src/index.ts`:

```ts
export * from "./auth";
export * from "./content";
export * from "./game";
export * from "./i18n";
export * from "./payments";
export * from "./validation";
```

- [ ] **Step 5: Re-run tests and commit the shared package**

Run: `npm run test:api -- --runInBand`
Expected: PASS for `shared contracts`.

Run: `git add packages/shared apps/api/src/__tests__/health.test.ts`

Run: `git commit -m "feat: add shared game and auth contracts"`

## Task 3: Bootstrap The Express API

**Files:**
- Create: `apps/api/src/index.ts`
- Create: `apps/api/src/app.ts`
- Create: `apps/api/src/config/env.ts`
- Create: `apps/api/src/middleware/error-handler.ts`
- Create: `apps/api/src/modules/health/routes.ts`
- Modify: `apps/api/package.json`
- Test: `apps/api/src/__tests__/health.test.ts`

- [ ] **Step 1: Replace the shared-only test with a failing HTTP health test**

Update `apps/api/src/__tests__/health.test.ts`:

```ts
import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../app";

describe("GET /health", () => {
  it("returns ok status", async () => {
    const response = await request(createApp()).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});
```

- [ ] **Step 2: Run the health test to verify the app factory is missing**

Run: `npm run test:api -- --runInBand apps/api/src/__tests__/health.test.ts`
Expected: FAIL because `createApp` and the health route do not exist.

- [ ] **Step 3: Implement the app factory and health route**

Create `apps/api/src/modules/health/routes.ts`:

```ts
import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
```

Create `apps/api/src/app.ts`:

```ts
import express from "express";
import { healthRouter } from "./modules/health/routes";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(healthRouter);
  return app;
}
```

Create `apps/api/src/index.ts`:

```ts
import { createApp } from "./app";

const port = Number(process.env.PORT ?? 4000);

createApp().listen(port, () => {
  console.log(`api listening on ${port}`);
});
```

- [ ] **Step 4: Add env and error middleware**

Create `apps/api/src/config/env.ts`:

```ts
export const env = {
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret",
  databaseUrl: process.env.DATABASE_URL ?? ""
};
```

Create `apps/api/src/middleware/error-handler.ts`:

```ts
import type { NextFunction, Request, Response } from "express";

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.status(500).json({ message: error.message });
}
```

- [ ] **Step 5: Re-run tests and commit the API bootstrap**

Run: `npm run test:api -- --runInBand apps/api/src/__tests__/health.test.ts`
Expected: PASS.

Run: `git add apps/api/src/index.ts apps/api/src/app.ts apps/api/src/config/env.ts apps/api/src/middleware/error-handler.ts apps/api/src/modules/health/routes.ts apps/api/src/__tests__/health.test.ts`

Run: `git commit -m "feat: add express api bootstrap"`

## Task 4: Add JWT Auth Foundations

**Files:**
- Create: `apps/api/src/lib/jwt.ts`
- Create: `apps/api/src/lib/password.ts`
- Create: `apps/api/src/middleware/auth.ts`
- Create: `apps/api/src/modules/auth/routes.ts`
- Create: `apps/api/src/modules/auth/service.ts`
- Test: `apps/api/src/__tests__/auth.test.ts`

- [ ] **Step 1: Write the failing auth test**

Create `apps/api/src/__tests__/auth.test.ts`:

```ts
import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../app";

describe("POST /auth/signin", () => {
  it("returns a jwt-shaped response for seeded parent credentials", async () => {
    const response = await request(createApp()).post("/auth/signin").send({
      email: "parent@example.com",
      password: "password123"
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
    expect(response.body.user.role).toBe("parent");
  });
});
```

- [ ] **Step 2: Run the auth test to verify the route does not exist yet**

Run: `npm run test:api -- --runInBand apps/api/src/__tests__/auth.test.ts`
Expected: FAIL with a `404` or missing import.

- [ ] **Step 3: Implement password and JWT helpers**

Create `apps/api/src/lib/password.ts`:

```ts
import bcrypt from "bcryptjs";

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
```

Create `apps/api/src/lib/jwt.ts`:

```ts
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function signJwt(payload: { userId: string; role: string }) {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "7d" });
}
```

- [ ] **Step 4: Implement the auth service and route using an in-memory fallback**

Create `apps/api/src/modules/auth/service.ts`:

```ts
import { signJwt } from "../../lib/jwt";

const parentUser = {
  id: "user_parent_demo",
  email: "parent@example.com",
  password: "password123",
  role: "parent"
};

export function signIn(email: string, password: string) {
  if (email !== parentUser.email || password !== parentUser.password) {
    return null;
  }

  return {
    token: signJwt({ userId: parentUser.id, role: parentUser.role }),
    user: {
      id: parentUser.id,
      email: parentUser.email,
      role: parentUser.role
    }
  };
}
```

Create `apps/api/src/modules/auth/routes.ts`:

```ts
import { Router } from "express";
import { signIn } from "./service";

export const authRouter = Router();

authRouter.post("/auth/signin", (req, res) => {
  const session = signIn(req.body.email, req.body.password);

  if (!session) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json(session);
});
```

Wire it in `apps/api/src/app.ts`:

```ts
import { authRouter } from "./modules/auth/routes";

app.use(authRouter);
```

- [ ] **Step 5: Re-run tests and commit the auth foundation**

Run: `npm run test:api -- --runInBand apps/api/src/__tests__/auth.test.ts`
Expected: PASS.

Run: `git add apps/api/src/lib/jwt.ts apps/api/src/lib/password.ts apps/api/src/modules/auth apps/api/src/app.ts apps/api/src/__tests__/auth.test.ts`

Run: `git commit -m "feat: add jwt auth foundation"`

## Task 5: Add Prisma Schema And Seed Data

**Files:**
- Create: `apps/api/prisma/schema.prisma`
- Create: `apps/api/prisma/seed.ts`
- Create: `apps/api/prisma.config.ts`
- Create: `apps/api/src/lib/prisma.ts`
- Modify: `apps/api/src/modules/auth/service.ts`

- [ ] **Step 1: Write the failing seed contract check**

Add this test to `apps/api/src/__tests__/game-worlds.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { WORLD_KEYS } from "@little-muslim/shared";
import { seedWorldKeys } from "../../prisma/seed";

describe("seed coverage", () => {
  it("covers every defined world key", () => {
    expect(seedWorldKeys).toEqual(WORLD_KEYS);
  });
});
```

- [ ] **Step 2: Run the test to verify the Prisma seed module does not exist yet**

Run: `npm run test:api -- --runInBand apps/api/src/__tests__/game-worlds.test.ts`
Expected: FAIL because the seed module and exports are missing.

- [ ] **Step 3: Implement the Prisma schema**

Create `apps/api/prisma/schema.prisma` with these models:

```prisma
model User {
  id                String   @id @default(cuid())
  email             String   @unique
  passwordHash      String
  role              String
  preferredLanguage String   @default("ms")
  hasLifetimeAccess Boolean  @default(false)
  children          ChildProfile[]
  payments          Payment[]
}

model ChildProfile {
  id               String   @id @default(cuid())
  userId           String
  name             String
  avatarKey        String?
  stars            Int      @default(0)
  coins            Int      @default(0)
  currentWorldKey  String?
  user             User     @relation(fields: [userId], references: [id])
}

model Payment {
  id         String   @id @default(cuid())
  userId     String
  provider   String
  status     String
  amountCents Int
  user       User     @relation(fields: [userId], references: [id])
}

model GameWorld {
  id           String @id @default(cuid())
  key          String @unique
  titleMs      String
  titleEn      String
  previewEnabled Boolean @default(false)
}
```

- [ ] **Step 4: Implement the Prisma client wrapper and seed export**

Create `apps/api/src/lib/prisma.ts`:

```ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
```

Create `apps/api/prisma/seed.ts`:

```ts
export const seedWorldKeys = [
  "huruf-island",
  "story-forest",
  "kalimah-castle",
  "writing-garden",
  "doa-village",
  "picture-dictionary-zoo"
] as const;
```

Create `apps/api/prisma.config.ts`:

```ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "apps/api/prisma/schema.prisma"
});
```

- [ ] **Step 5: Re-run tests and commit the schema foundation**

Run: `npm run test:api -- --runInBand apps/api/src/__tests__/game-worlds.test.ts`
Expected: PASS for the seed coverage test.

Run: `git add apps/api/prisma apps/api/prisma.config.ts apps/api/src/lib/prisma.ts apps/api/src/__tests__/game-worlds.test.ts`

Run: `git commit -m "feat: add game-first prisma schema foundation"`

## Task 6: Add Game World And Payment Placeholder APIs

**Files:**
- Create: `apps/api/src/modules/game-worlds/routes.ts`
- Create: `apps/api/src/modules/game-worlds/service.ts`
- Create: `apps/api/src/modules/payments/routes.ts`
- Create: `apps/api/src/modules/payments/service.ts`
- Test: `apps/api/src/__tests__/game-worlds.test.ts`
- Test: `apps/api/src/__tests__/payments.test.ts`

- [ ] **Step 1: Write failing world and payment route tests**

Create `apps/api/src/__tests__/payments.test.ts`:

```ts
import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../app";

describe("POST /payments/checkout", () => {
  it("returns a redirect placeholder payload", async () => {
    const response = await request(createApp()).post("/payments/checkout").send({
      userId: "user_parent_demo"
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("pending");
    expect(response.body.checkoutUrl).toContain("/payment/success");
  });
});
```

Replace `apps/api/src/__tests__/game-worlds.test.ts` with:

```ts
import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../app";

describe("GET /game-worlds", () => {
  it("returns semi-open preview-aware worlds", async () => {
    const response = await request(createApp()).get("/game-worlds");

    expect(response.status).toBe(200);
    expect(response.body.worlds).toHaveLength(6);
    expect(response.body.worlds[0].key).toBe("huruf-island");
  });
});
```

- [ ] **Step 2: Run the tests to verify the routes are missing**

Run: `npm run test:api -- --runInBand apps/api/src/__tests__/game-worlds.test.ts apps/api/src/__tests__/payments.test.ts`
Expected: FAIL with `404` responses.

- [ ] **Step 3: Implement the world listing service and route**

Create `apps/api/src/modules/game-worlds/service.ts`:

```ts
export function listWorlds() {
  return [
    { key: "huruf-island", unlocked: true, previewEnabled: true },
    { key: "picture-dictionary-zoo", unlocked: true, previewEnabled: true },
    { key: "doa-village", unlocked: false, previewEnabled: false },
    { key: "story-forest", unlocked: false, previewEnabled: false },
    { key: "kalimah-castle", unlocked: false, previewEnabled: false },
    { key: "writing-garden", unlocked: false, previewEnabled: false }
  ];
}
```

Create `apps/api/src/modules/game-worlds/routes.ts`:

```ts
import { Router } from "express";
import { listWorlds } from "./service";

export const gameWorldsRouter = Router();

gameWorldsRouter.get("/game-worlds", (_req, res) => {
  res.json({ worlds: listWorlds() });
});
```

- [ ] **Step 4: Implement the payment placeholder route**

Create `apps/api/src/modules/payments/service.ts`:

```ts
export function createCheckout(userId: string) {
  return {
    userId,
    status: "pending",
    checkoutUrl: "http://localhost:3000/payment/success?mockPayment=1"
  };
}
```

Create `apps/api/src/modules/payments/routes.ts`:

```ts
import { Router } from "express";
import { createCheckout } from "./service";

export const paymentsRouter = Router();

paymentsRouter.post("/payments/checkout", (req, res) => {
  res.json(createCheckout(req.body.userId));
});
```

Wire both routers in `apps/api/src/app.ts`:

```ts
import { gameWorldsRouter } from "./modules/game-worlds/routes";
import { paymentsRouter } from "./modules/payments/routes";

app.use(gameWorldsRouter);
app.use(paymentsRouter);
```

- [ ] **Step 5: Re-run tests and commit the world and payment foundations**

Run: `npm run test:api -- --runInBand apps/api/src/__tests__/game-worlds.test.ts apps/api/src/__tests__/payments.test.ts`
Expected: PASS.

Run: `git add apps/api/src/modules/game-worlds apps/api/src/modules/payments apps/api/src/app.ts apps/api/src/__tests__/game-worlds.test.ts apps/api/src/__tests__/payments.test.ts`

Run: `git commit -m "feat: add world map and payment placeholder apis"`

## Task 7: Build The Next.js Public And Parent Shells

**Files:**
- Create: `apps/web/src/app/layout.tsx`
- Create: `apps/web/src/app/globals.css`
- Create: `apps/web/src/app/page.tsx`
- Create: `apps/web/src/app/(public)/pricing/page.tsx`
- Create: `apps/web/src/app/(public)/signup/page.tsx`
- Create: `apps/web/src/app/(public)/signin/page.tsx`
- Create: `apps/web/src/app/(public)/checkout/page.tsx`
- Create: `apps/web/src/app/(public)/payment/success/page.tsx`
- Create: `apps/web/src/app/(public)/payment/failed/page.tsx`
- Create: `apps/web/src/app/(parent)/dashboard/page.tsx`
- Create: `apps/web/src/app/(parent)/children/page.tsx`
- Create: `apps/web/src/components/layout/site-shell.tsx`
- Create: `apps/web/src/components/layout/section.tsx`

- [ ] **Step 1: Write the failing public shell smoke check**

Create `apps/web/src/app/page.tsx` temporarily with a deliberate failing marker:

```tsx
export default function HomePage() {
  return <main>replace-me</main>;
}
```

Run: `npm run build:web`
Expected: FAIL because the rest of the Next.js scaffold does not exist yet.

- [ ] **Step 2: Add the Next.js layout and global styling**

Create `apps/web/src/app/layout.tsx`:

```tsx
import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Create `apps/web/src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --lm-bg: #fff8ef;
  --lm-text: #17324d;
  --lm-sky: #a8ddff;
  --lm-mint: #bdecc8;
  --lm-sun: #ffe38b;
}

body {
  background: radial-gradient(circle at top, var(--lm-sky), var(--lm-bg) 55%);
  color: var(--lm-text);
}
```

- [ ] **Step 3: Build the public landing and pricing shells**

Create `apps/web/src/components/layout/site-shell.tsx`:

```tsx
import type { ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>;
}
```

Create `apps/web/src/app/page.tsx`:

```tsx
import { SiteShell } from "../components/layout/site-shell";

export default function HomePage() {
  return (
    <SiteShell>
      <main className="space-y-8">
        <section>
          <h1 className="text-5xl font-black">Little Muslim Learning Adventure</h1>
          <p>Game-style preschool Islamic learning with worlds, rewards, and mini games.</p>
        </section>
      </main>
    </SiteShell>
  );
}
```

Create `apps/web/src/app/(public)/pricing/page.tsx`:

```tsx
export default function PricingPage() {
  return <main>Lifetime access pricing</main>;
}
```

- [ ] **Step 4: Add auth, checkout, payment, and parent dashboard shells**

Create `apps/web/src/app/(public)/signup/page.tsx`:

```tsx
export default function SignUpPage() {
  return <main>Parent sign up</main>;
}
```

Create `apps/web/src/app/(public)/signin/page.tsx`:

```tsx
export default function SignInPage() {
  return <main>Parent sign in</main>;
}
```

Create `apps/web/src/app/(public)/checkout/page.tsx`:

```tsx
export default function CheckoutPage() {
  return <main>Checkout placeholder</main>;
}
```

Create `apps/web/src/app/(public)/payment/success/page.tsx`:

```tsx
export default function PaymentSuccessPage() {
  return <main>Payment success</main>;
}
```

Create `apps/web/src/app/(public)/payment/failed/page.tsx`:

```tsx
export default function PaymentFailedPage() {
  return <main>Payment failed</main>;
}
```

Create `apps/web/src/app/(parent)/dashboard/page.tsx`:

```tsx
export default function ParentDashboardPage() {
  return <main>Parent dashboard</main>;
}
```

Create `apps/web/src/app/(parent)/children/page.tsx`:

```tsx
export default function ChildrenPage() {
  return <main>Child profiles</main>;
}
```

- [ ] **Step 5: Build and commit the first web shells**

Run: `npm run build:web`
Expected: PASS.

Run: `git add apps/web/src/app apps/web/src/components/layout apps/web/src/app/globals.css`

Run: `git commit -m "feat: add public and parent web shells"`

## Task 8: Build The Child Map And Admin Shells

**Files:**
- Create: `apps/web/src/app/(child)/map/page.tsx`
- Create: `apps/web/src/app/(child)/world/[worldKey]/page.tsx`
- Create: `apps/web/src/app/(admin)/admin/page.tsx`
- Create: `apps/web/src/components/game/world-card.tsx`
- Create: `apps/web/src/components/game/level-card.tsx`
- Create: `apps/web/src/components/game/reward-pill.tsx`
- Create: `apps/web/src/lib/demo-data.ts`

- [ ] **Step 1: Write the child-shell contract in demo data**

Create `apps/web/src/lib/demo-data.ts`:

```ts
export const demoWorlds = [
  { key: "huruf-island", title: "Huruf Island", unlocked: true, stars: 2 },
  { key: "picture-dictionary-zoo", title: "Picture Dictionary Zoo", unlocked: true, stars: 1 },
  { key: "doa-village", title: "Doa Village", unlocked: false, stars: 0 }
];
```

- [ ] **Step 2: Run the web build to verify the child/admin pages are still missing**

Run: `npm run build:web`
Expected: PASS for current pages but no child/admin routes yet in the app.

- [ ] **Step 3: Add the map components**

Create `apps/web/src/components/game/reward-pill.tsx`:

```tsx
export function RewardPill({ label }: { label: string }) {
  return <span className="rounded-full bg-yellow-200 px-3 py-1 text-sm font-bold">{label}</span>;
}
```

Create `apps/web/src/components/game/world-card.tsx`:

```tsx
import Link from "next/link";
import { RewardPill } from "./reward-pill";

export function WorldCard(props: { keyName: string; title: string; unlocked: boolean; stars: number }) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow">
      <h2 className="text-2xl font-black">{props.title}</h2>
      <RewardPill label={`${props.stars} stars`} />
      <div className="mt-4">
        {props.unlocked ? <Link href={`/world/${props.keyName}`}>Enter world</Link> : <span>Locked</span>}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Add the map pages and admin shell**

Create `apps/web/src/app/(child)/map/page.tsx`:

```tsx
import { demoWorlds } from "../../../lib/demo-data";
import { WorldCard } from "../../../components/game/world-card";

export default function GameMapPage() {
  return (
    <main className="grid gap-4">
      {demoWorlds.map((world) => (
        <WorldCard
          key={world.key}
          keyName={world.key}
          title={world.title}
          unlocked={world.unlocked}
          stars={world.stars}
        />
      ))}
    </main>
  );
}
```

Create `apps/web/src/app/(child)/world/[worldKey]/page.tsx`:

```tsx
export default function WorldPage({ params }: { params: { worldKey: string } }) {
  return <main>World page for {params.worldKey}</main>;
}
```

Create `apps/web/src/app/(admin)/admin/page.tsx`:

```tsx
export default function AdminPage() {
  return <main>Admin dashboard shell</main>;
}
```

- [ ] **Step 5: Build and commit the child and admin shells**

Run: `npm run build:web`
Expected: PASS.

Run: `git add apps/web/src/app/(child) apps/web/src/app/(admin) apps/web/src/components/game apps/web/src/lib/demo-data.ts`

Run: `git commit -m "feat: add child map and admin shells"`

## Task 9: Document Agent Workflow And Foundation Setup

**Files:**
- Modify: `docs/project-agents.md`
- Modify: `README.md`
- Modify: `docs/superpowers/specs/2026-06-23-little-muslim-learning-adventure-design.md`

- [ ] **Step 1: Write the failing documentation checklist**

Add this checklist to `README.md`:

```md
## Foundation Checklist

- [ ] Web app boots
- [ ] API boots
- [ ] Shared package exports compile
- [ ] Seed world keys align with spec
- [ ] Project-agent workflow documented
```

- [ ] **Step 2: Review the current docs for missing setup or agent notes**

Run: `Get-Content -Raw README.md`
Expected: The checklist exists, but setup and agent workflow details are still incomplete.

- [ ] **Step 3: Add concrete setup instructions**

Expand `README.md` with:

```md
## Local Setup

1. Run `npm install`
2. Create `.env` files for `apps/api` and `apps/web`
3. Set `DATABASE_URL` for MySQL
4. Run Prisma migrations
5. Run `npm run db:seed --workspace @little-muslim/api`
6. Start API with `npm run dev:api`
7. Start web with `npm run dev:web`
```

- [ ] **Step 4: Sync agent guidance and spec references**

Ensure `docs/project-agents.md` includes:

```md
## Current Status

Before implementation work that depends on project agents, restore or reinstall the `.agents/skills/` contents.
```

Ensure the spec keeps this line:

```md
Project-agent guidance should also live in `docs/project-agents.md` so implementation plans have a stable reference.
```

- [ ] **Step 5: Commit the foundation documentation**

Run: `git add README.md docs/project-agents.md docs/superpowers/specs/2026-06-23-little-muslim-learning-adventure-design.md`

Run: `git commit -m "docs: add foundation setup and agent workflow notes"`

## Self-Review

### Spec Coverage

- Product architecture: covered by Tasks 1, 2, 3, 7, and 8
- Shared types and bilingual groundwork: covered by Task 2
- JWT auth foundation: covered by Task 4
- Prisma game-first schema foundation: covered by Task 5
- Payment placeholder and gating groundwork: covered by Task 6
- Public, parent, child, and admin shells: covered by Tasks 7 and 8
- Agent involvement and setup docs: covered by Task 9

### Gaps Intentionally Deferred

- full mini-game logic beyond route and shell groundwork
- full child progression persistence
- complete payment callback verification
- full admin CRUD
- tracing canvas implementation
- story playback checkpoints
- bilingual content population

### Placeholder Scan

No `TBD`, `TODO`, or cross-task shorthand remains in this plan. Deferred scope is explicitly listed in `Gaps Intentionally Deferred`.

### Type Consistency

The plan uses consistent names for:

- `WorldKey`
- `APP_LANGUAGES`
- `PAYMENT_STATUSES`
- `signIn`
- `createCheckout`
- `listWorlds`

