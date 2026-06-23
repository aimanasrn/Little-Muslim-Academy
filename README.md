# Little Muslim Learning Adventure

## Workspace Commands

- `npm install`
- `npm run dev:web`
- `npm run dev:api`
- `npm run test:api`
- `npm run db:seed --workspace @little-muslim/api`

## Bootstrap Verification

Before the workspace manifests were added, running `npm install` at the repository root failed with `ENOENT` because `package.json` did not exist yet.
Before Task 2 landed, running `npm run test:api -- --runInBand` failed because `@little-muslim/shared` did not yet expose resolvable source exports for the API test import.
