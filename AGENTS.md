# fevunge.github.io — agent guide

Static personal GitHub Pages site. No build step, no framework, no package manager, no tests.

## Quick facts

- **Lang**: Portuguese (`lang="pt"`) in most pages.
- **CSS**: 2 files at `assets/css/` — `main.css`, `hover.css`.
- **No Jekyll** despite leftover Jekyll entries in `.gitignore` (historical).
- **Prettier** configured via `.prettierrc` (`trailingComma: "es5"`, `printWidth: 150`, `@shopify/prettier-plugin-liquid` — no liquid files present). Run `npx prettier --write .` if formatting.
- **Design colors** in README.md: dark theme (`#131020` bg, `#f3bce6` primary text, `#c29df1` secondary). `#24273a` used for surface/cards.
- **No CI/CD config** — deploys via GitHub Pages from the `main` branch.
- **Only JS file**: `js/search-index.js` — client-side filter on `#search-index` input.
- **Pages**: `index.html` (home), `blog/*.html` (4 posts), `page/bh.html`.
- **Commit style**: conventional commits (`feat:`, `fix:`, `refactor:`, `docs:`, `style:`).
- `.git-blame-ignore-revs` — 2 formatting-only commits to skip with `git blame`.
