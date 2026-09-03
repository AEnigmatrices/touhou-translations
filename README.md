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
- `src/lib/content/` - Zod schemas, collection loading, integrity checks, and browser projections.
- `src/lib/server/` - Post-page data assembly used during static generation.
- `src/data/` - Astro content collections with one JSON record per file.
- `src/assets/` - Source-controlled portraits optimized by Astro at build time.
- `src/styles/` - Global CSS and design tokens.
- `src/utils/` - Shared data-loading, filtering, and URL helpers.
- `src/types/` - Shared TypeScript data models.
- `public/` - Static assets such as icons and the web app manifest.
- `scripts/` - Content validation, media metadata, build verification, and maintenance tooling.
- `.github/workflows/` - GitHub Pages deployment workflow.

## Development

Node.js 24 and PNPM 11 are the supported development runtime and package manager versions.

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

`validate:data` runs Astro's collection sync and checks exact IDs, references, UTC post folders, portrait files, and sort-order integrity. `test` runs content validation, Astro/TypeScript checks, and unit tests. `build` resolves original image dimensions, generates the site, and verifies every static post artifact without depending on Reddit's API. The optional `generate:data:responsive-images` command also attempts to discover Reddit-hosted responsive image variants; the site falls back to the original image URLs when Reddit does not expose them. `test:e2e` checks the production site in Chromium, including prerendered post metadata and offline caching. `clean` removes generated media metadata, Astro caches, and build output.

## Content Data

Posts, artists, and characters are Astro content collections under `src/data/`. Every artist, character, and post is its own JSON file; the filename is the stable record ID. Post files are grouped as `posts/YYYY/MM/<reddit-id>.json`. Shared strict Zod schemas live in `src/lib/content/schemas.ts`, while archive-wide checks enforce references and filesystem invariants that a single-record schema cannot express.

Astro loads and validates the records at build time. A central archive module derives counts, adjacency, related posts, and the small browser-facing JSON projections used by the gallery and daily-post controls. Those projections and the sitemaps are prerendered Astro endpoints, so source content is never copied into `public/` or maintained as a second generated data model.

Each `/posts/[id]` URL is emitted by Astro's `getStaticPaths()` as a real static page with its content and social metadata in the initial HTML. Post details are assembled by build-only code, and the random-post control fetches the shared ID index only when it is used. A post-build service-worker generator precaches the application shell and shared build assets, then caches successful post visits at runtime instead of downloading the entire archive during installation.

The `/admin` route is a local development helper for adding posts and artists through Vite middleware. It validates submissions with the same schemas and creates one new JSON file per record. A local Astro integration injects this route only for `astro dev`, so neither the route nor its client code is included in the production artifact.

## Deployment

The site is deployed to:

```txt
https://aenigmatrices.github.io/touhou-translations/
```

The production build uses the `/touhou-translations/` base path configured in `astro.config.ts`. The GitHub Actions workflow installs dependencies with PNPM, runs the production build, and uploads the generated `build` directory as a GitHub Pages artifact.

## License and Attribution

The website code is licensed under the MIT License.

The hosted Touhou fan comics, illustrations, and translated content are non-commercial fan works and remain the intellectual property of their original creators.

Third-party assets are used under their respective permissions:

- Touhou character portraits are by [dairi](https://www.pixiv.net/en/users/4920496) / [haruka](https://www.nicovideo.jp/user/3494232).
- The project aims to follow the [Touhou Project fan work guidelines](https://touhou-project.news/guidelines_en/).

If you are an artist and want work removed or credited differently, please open an issue or contact the maintainer.
