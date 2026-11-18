# AGENTS.md

## Lessons

Add a row to `src/content/site.ts` and register the component in `src/App.tsx`. Routes, the sidebar, the home menu, and previous/next links all come from that list.

## Layout

- Below 768px, use the top bar and the slide-in drawer (`drawer-open` / `drawer-closed`).
- From 768px up, lessons use the sticky sidebar. The home page uses the centered pill nav.
- The page is centered (`max-w-7xl`). Put sidebar controls in the content column. A `fixed` offset from the viewport misses once the page is centered.

## UI

- Write complete Tailwind class strings. The ocean scale is defined in `src/index.css`.
- Render the next state directly. Do not hide content in an entrance animation (`opacity: 0`, off-screen translate). `AnimatePresence` exit animations were leaving the previous panel on screen.

## Forms and hosting

- Newsletter and feedback post only when `VITE_NEWSLETTER_FORM_ID` and `VITE_FORMSPREE_ID` are set. The Deploy workflow injects the repository secrets at build time. Do not publish with `npm run deploy`; that build would replace the GitHub one.
- GitHub Pages serves the `gh-pages` branch. The app uses `HashRouter` and `base: "/ML-overview/"`.

## Simulation

Keep `src/pages/levels/inference/simulation.ts` pure. Playback state lives in `useSimulation`.
