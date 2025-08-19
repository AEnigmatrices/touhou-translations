# Touhou Translations

This is a personal archive and viewer for English translations of Touhou Project fan comics and illustrations. The site is built with [React](https://react.dev/) and [Vite](https://vitejs.dev/), using TypeScript, and is deployed as a static site on [GitHub Pages](https://pages.github.com/).

## Purpose

This project hosts manually translated Touhou fan art and comics, preserving attribution to the original creators wherever possible. It serves as a centralized viewer for fans interested in translated content.

## Tech Stack

The project leverages the following technologies and tools:

-   **Vite** – Fast frontend build tool and development server.
-   **React 19** – Component-based UI framework with TypeScript support.
-   **Vike** – SSR/SSG framework for React, used here primarily for building a static site.
-   **MUI (Material UI)** – React component library for UI elements.
-   **React Router DOM v7** – For client-side routing.
-   **gh-pages** – To automate deployment to GitHub Pages.
-   **GitHub Actions** – For continuous integration and deployment workflow.
-   **TypeScript** – For type-safe JavaScript development.
-   **ESLint** – For code linting.

## Repository Structure

*(Based on standard Vite + Vike structure and the provided config)*

-   `public/` – Static assets.
-   `src/` – Main application source code:
    -   `pages/` – Vike pages.
    -   `components/`, `layouts/`, `types/`, `utils/` – Application logic and components.
    -   `renderer/` – Vike renderer logic.
-   `data/` – JSON data files for translation content.
-   `scripts/` – Custom scripts (e.g., `copyIndexTo404.ts`, `moveDist.ts`).
-   `plugins/` – Custom Vite plugins (e.g., `pwaPlugin.ts`, `postDataPlugin.ts`, `generateSitemapPlugin.ts`).
-   `dist/` – Output directory for the built static site.
-   `vite.config.ts` – Vite configuration with base path set for GitHub Pages.
-   `.github/workflows/` – GitHub Actions workflows.

## Development

To run the project locally:

```
npm install
npm run dev
```

This starts the Vite development server (based on the `base` config), enabling hot module replacement for efficient development.

## Deployment

Deployment to GitHub Pages is automated via GitHub Actions and the `gh-pages` package. Key points:

-   The site is hosted at: `https://aenigmatrices.github.io/touhou-translations/`
-   The `base` option in `vite.config.ts` (`/touhou-translations/`) is set accordingly for correct asset path resolution on GitHub Pages.
-   The GitHub Actions workflow (`.github/workflows/...`) triggers on pushes to the `main` branch.
-   The workflow performs the following steps:
    1.  Checks out the repository.
    2.  Sets up Node.js.
    3.  Installs dependencies (`npm ci`).
    4.  Builds the project (`npm run build`).
    5.  Runs custom post-build scripts (`copyIndexTo404.ts`, `moveDist.ts`).
    6.  Deploys the `dist` directory to the `gh-pages` branch using `peaceiris/actions-gh-pages`.
-   You can also deploy manually with:

```
npm run deploy
```

*(This script runs `npm run build` followed by `gh-pages` CLI to deploy the `dist` directory.)*

## Usage

Once deployed, users can browse and read translated Touhou fan comics and illustrations organized via the React frontend. Content is dynamically loaded from the JSON files in the data directory.

## License and Attribution

This project's software and website code are licensed under the MIT License © AEnigmatrices.

The Touhou fan comics, illustrations, and translated content hosted here are non-commercial fan works and remain the intellectual property of their original creators.

Third-party assets are used under the following terms:

-   Non-commercial use only; redistribution and commercial use are prohibited.
-   Touhou character portraits are by [**dairi**](https://www.pixiv.net/en/users/4920496) ([**haruka**](https://www.nicovideo.jp/user/3494232)), used accordingly to the specified permissions.
-   The project complies with the [**Touhou Project fan work guidelines**](https://touhou-project.news/guidelines_en/).

If you are an artist and wish to have your work removed or credited differently, please open an issue or contact me.

© AEnigmatrices, 2025