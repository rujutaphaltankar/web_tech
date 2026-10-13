# Assignment 09: Next.js Blog Rendering Strategies

A simple Next.js App Router blog demonstrating:
- SSG for the blog post list
- ISR for individual blog posts (60-second revalidation)
- SSR for the user dashboard
- React Server Components for server-side data fetching
- Manual TTFB measurement using Chrome DevTools

## Requirements
- Node.js 20 or newer recommended
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Routes

- `/` — home page
- `/posts` — statically generated post list
- `/posts/1` — ISR individual post
- `/dashboard` — dynamically rendered dashboard

## Production testing and TTFB

```bash
npm run build
npm run start
```

In Chrome, open DevTools > Network, reload each route, select the main document request, and inspect the Timing tab. Record the "Waiting for server response" duration as an approximation of TTFB. Repeat measurements and compare averages.

| Route | Strategy | Average TTFB |
|---|---|---|
| `/posts` | SSG | Fill in measured result |
| `/posts/1` | ISR | Fill in measured result |
| `/dashboard` | SSR + RSC | Fill in measured result |

TTFB varies with the environment, network, and cache state; do not assume a result before measuring.

## Notes
The sample data is held in `lib/data.js`, so ISR revalidation will not visibly change the content unless the data source changes. The dashboard uses demonstration user data and is not an authentication system.
