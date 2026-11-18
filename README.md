# ML Overview

An interactive guide to the intersection of neuroscience, statistics, and deep learning. Lessons are a single list in `src/content/site.ts`. That list is the reading order, and it drives the routes, the sidebar, the landing menu, and the previous/next links.

## Add a lesson

1. Add a row to `src/content/site.ts`.
2. Register the page component in the `elements` map in `src/App.tsx`.

A row without a component, or a component for a path that is not in the list, is a type error.

## Develop

```bash
npm install
npm run dev
npm test
npm run lint
```

Copy `.env.example` to `.env` and fill in the Formspree ids if you want newsletter signup and the feedback widget to submit. With the ids blank, those forms stay inert instead of posting to an undefined endpoint.

## Deploy

Push to `main`. The Deploy workflow builds the site with the `VITE_FORMSPREE_ID` and `VITE_NEWSLETTER_FORM_ID` repository secrets and publishes `dist` to the `gh-pages` branch.
