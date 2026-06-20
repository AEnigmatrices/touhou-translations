# Touhou Translations

Touhou Translations is a personal archive and viewer for English-translated Touhou Project fan comics and illustrations. It is built with SvelteKit, TypeScript, and Vite, then deployed as a static site for GitHub Pages.

## Purpose

The project collects manually translated Touhou fan art and comics while preserving attribution to the original creators wherever possible. It is intended as a centralized, non-commercial viewer for translated fan works.

## Tech Stack

- **SvelteKit** - File-based routing, static generation, and client-side routes.
- **Vite** - Development server and production build tooling.
- **TypeScript** - Static checking for app, build, and plugin code.
- **PNPM** - Package management.
- **SvelteKit service worker** - Manual app-shell caching and web app manifest.
- **GitHub Pages** - Static hosting through GitHub Actions.

## Repository Structure

- `src/routes/` - SvelteKit routes and route-level styles.
- `src/lib/` - Shared Svelte components.
- `src/styles/` - Global CSS and design tokens.
- `src/utils/` - Shared data-loading, filtering, and URL helpers.
- `src/types/` - Shared TypeScript data models.
- `data/` - JSON source data for posts, artists, and characters.
- `public/` - Static assets such as icons and portraits.
- `scripts/` - Build tooling, data validation, and sitemap generation helpers.
- `.github/workflows/` - GitHub Pages deployment workflow.

## Development

Install dependencies:

```sh
pnpm install
```

Start the local development server:

```sh
pnpm run dev
```

Run verification commands:

```sh
pnpm run typecheck
pnpm run lint
pnpm run validate:data
pnpm run test
pnpm run build
pnpm run clean
```

`validate:data` checks the JSON archive for duplicate IDs, missing references, missing portrait files, and malformed URLs. `test` runs data validation, Svelte/TypeScript checks, linting, and unit tests. `clean` removes generated data, framework caches, and build output.

## Content Data

Posts, artists, and characters are stored as JSON under `data/`. The application imports this data at build time, derives artist and character counts, and prerenders the index, gallery, artist, and character pages.

Individual `/posts/[id]` pages are client-side routes served through the GitHub Pages fallback rather than prerendered one by one. The `/admin` route is a local development helper for adding posts and artists through the Vite dev server middleware. It is not a production dashboard and is excluded from prerendering.

## Deployment

The site is deployed to:

```txt
https://aenigmatrices.github.io/touhou-translations/
```

The production build uses the `/touhou-translations/` base path configured in `svelte.config.js`. The GitHub Actions workflow installs dependencies with PNPM, runs the production build, and uploads the generated `build` directory as a GitHub Pages artifact.

Manual deployment is also available:

```sh
pnpm run deploy
```

## License and Attribution

The website code is licensed under the MIT License.

The hosted Touhou fan comics, illustrations, and translated content are non-commercial fan works and remain the intellectual property of their original creators.

Third-party assets are used under their respective permissions:

- Touhou character portraits are by [dairi](https://www.pixiv.net/en/users/4920496) / [haruka](https://www.nicovideo.jp/user/3494232).
- The project aims to follow the [Touhou Project fan work guidelines](https://touhou-project.news/guidelines_en/).

If you are an artist and want work removed or credited differently, please open an issue or contact the maintainer.
