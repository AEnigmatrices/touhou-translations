# Touhou Translations

Touhou Translations is a personal archive and viewer for English-translated Touhou Project fan comics and illustrations. It is built with Astro and TypeScript, then deployed as a static site to GitHub Pages.

## Purpose

The project collects manually translated Touhou fan art and comics while preserving attribution to the original creators wherever possible. It is intended as a centralized, non-commercial viewer for translated fan works.

## Tech Stack

- **Astro** - File-based routing, components, and static generation with no client framework runtime.
- **Vite** - Astro's development server and the local authoring API integration.
- **TypeScript** - Static checking for route modules, build tooling, and plugin code.
- **PNPM** - Package management.
- **Service worker** - Generated app-shell and runtime caching with a hand-authored web app manifest.
- **GitHub Pages** - Static hosting through GitHub Actions.

## Repository Structure

- `src/pages/` - Astro pages, dynamic post routes, the 404 page, and static JSON endpoints.
- `src/layouts/` - The shared Astro document and site shell.
- `src/components/` - Server-rendered Astro UI components.
- `src/scripts/` - Small browser-side TypeScript controllers for interactive controls.
- `src/dev/` - The development-only archive authoring page.
- `src/lib/server/` - Framework-neutral post data assembly used during static generation.
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
pnpm run validate:data
pnpm run test
pnpm run build
pnpm run generate:data:responsive-images
pnpm exec playwright install chromium
pnpm run test:e2e
pnpm run clean
```

`validate:data` checks the JSON archive for duplicate IDs, missing references, missing portrait files, and malformed URLs. `test` runs data validation, Astro/TypeScript checks, and unit tests. `build` resolves original image dimensions, generates the site, and verifies every static post artifact without depending on Reddit's API. The optional `generate:data:responsive-images` command also attempts to discover Reddit-hosted responsive image variants; the site falls back to the original image URLs when Reddit does not expose them. `test:e2e` checks the production site in Chromium, including prerendered post metadata and offline caching. `clean` removes generated data, Astro caches, and build output.

## Content Data

Posts, artists, and characters are stored as JSON under `data/`. The application imports this data at build time, derives artist and character counts, and prerenders the index, gallery, artist, character, and individual post pages.

Each `/posts/[id]` URL is emitted by Astro's `getStaticPaths()` as a real static page with its content and social metadata in the initial HTML. Post details are assembled by build-only code, and the random-post control fetches the shared ID index only when it is used. A post-build service-worker generator precaches the application shell and shared build assets, then caches successful post visits at runtime instead of downloading the entire archive during installation.

The `/admin` route is a local development helper for adding posts and artists through Vite middleware. A local Astro integration injects this route only for `astro dev`, so neither the route nor its client code is included in the production artifact.

## Deployment

The site is deployed to:

```txt
https://aenigmatrices.github.io/touhou-translations/
```

The production build uses the `/touhou-translations/` base path configured in `astro.config.ts`. The GitHub Actions workflow installs dependencies with PNPM, runs the production build, and uploads the generated `build` directory as a GitHub Pages artifact.

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
