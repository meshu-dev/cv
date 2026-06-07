A digital version of my CV.

## Requirements

- Node.js 20.9+
- [Portfolio Admin](https://github.com/meshu-dev/portfolio-admin) API running locally or in production

## Setup

Create the `.env` file by copying `.env.example` and filling in the values:

```bash
cp .env.example .env
```

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

The app is available at [http://localhost:3000](http://localhost:3000).

## Build (static export)

This project uses Next.js static export (`output: 'export'`). CV data is fetched at **build time** via `getStaticProps`.

```bash
npm run build
```

Static files are output to `out/`.

## Deploy to Vercel

Configure the project as a static site:

- **Build command:** `npm run build`
- **Output directory:** `out`
- **Environment variables (build time):** `PORTFOLIO_API_EMAIL`, `PORTFOLIO_API_PASSWORD`, `NEXT_PUBLIC_PORTFOLIO_API_URL`, `NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY`

CV content updates when you trigger a new deploy.

## Stack

- Next.js 16
- React 19
- TypeScript
- Chakra UI
