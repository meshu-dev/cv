# CV — Agent Guide

## Commands

```bash
npm install          # uses legacy-peer-deps=true (via .npmrc)
npm run dev          # next dev
npm run build        # next build (static export to out/)
npm run lint         # eslint . (flat config)
npm run format       # prettier --write .
npm run format:check # prettier --check .
npm run test         # vitest run
npm run test:watch   # vitest
npm run test:coverage # vitest run --coverage
```

## Architecture

- **Pages Router** (`pages/`) — `index.tsx` uses `getStaticProps` to fetch CV data at build time.
- **Components** live under `app/components/` (not `components/`). Path alias `@/*` → `./app/*`.
- **Static export** — `next.config.js` has `output: 'export'`. No API routes, no server at runtime.
- **Styling** — Chakra UI (`@chakra-ui/react`) + `app/globals.css`.

## Build-time API

`PORTFOLIO_API_EMAIL` and `PORTFOLIO_API_PASSWORD` are required at build time to fetch CV data. Copy `.env.example` → `.env` and fill in.

## Conventions

- **Vitest** + React Testing Library; config in `vitest.config.ts`, setup in `vitest.setup.ts`.
- **Prettier** config in `.prettierrc.json`; run `npm run format` to apply.
- **ESLint** uses `eslint-config-next/core-web-vitals` (flat config in `eslint.config.mjs`). Ignores `.next/`, `out/`, `node_modules/`.
- **`next-env.d.ts`** is auto-generated — do not edit manually.
