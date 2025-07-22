# Touhou Translations

This is a personal archive and viewer for English translations of Touhou Project fan comics and illustrations. The site is built with [React](https://react.dev/) and [Vite](https://vitejs.dev/), using TypeScript, and is deployed as a static site on [GitHub Pages](https://pages.github.com/).

## Purpose

This project hosts manually translated Touhou fan art and comics, preserving attribution to the original creators wherever possible. It serves as a centralized viewer for fans interested in translated content.

## Tech Stack

The project leverages the following technologies and tools:

-   **Vite** – fast frontend build tool and development server
-   **React** – component-based UI framework with TypeScript support
-   **React Query** – for data fetching and state management
-   **React Router DOM** – for client-side routing
-   **gh-pages** – to automate deployment to GitHub Pages
-   **GitHub Actions** – for continuous integration and deployment workflow

## Repository Structure

-   `app/` – contains the React application source and build output

-   `data/` – JSON data files with translation content (kept separate from app for deployment reasons)

-   `public/` – static assets, including favicons

-   `src/` – React source code organized into:

    -   `components/`, `context/`, `icons/`, `pages/`, `types/`, `utils/`

    -   Key files: `App.tsx`, `main.tsx`, `Routes.tsx`, `index.css`

-   `vite.config.ts` – Vite configuration with base path set for GitHub Pages

## Development

To run the project locally:

```
npm install
npm run dev
```

This starts the Vite development server, enabling hot module replacement for efficient development.

## Deployment

Deployment to GitHub Pages is automated via GitHub Actions and the `gh-pages` package. Key points:

-   The site is hosted at: `https://aenigmatrices.github.io/touhou-translations/`

-   The `homepage` field in `package.json` is set accordingly for correct asset path resolution.

-   GitHub Actions workflow triggers on pushes to `main` branch, but only when files in `app/**` or `.github/workflows/**` change.

-   The workflow builds the app and deploys the `app/dist` folder to the `gh-pages` branch using the `peaceiris/actions-gh-pages` action.

-   You can also deploy manually with:

```
npm run deploy
```

This runs the build and pushes the `dist` directory via `gh-pages` CLI.

## Usage

Once deployed, users can browse and read translated Touhou fan comics and illustrations organized via the React frontend. Content is dynamically loaded from the JSON files in the data directory.

## License and Attribution

This project's software and website code are licensed under the MIT License © AEnigmatrices, 2025.

The Touhou fan comics, illustrations, and translated content hosted here are non-commercial fan works and remain the intellectual property of their original creators.

Third-party assets are used under the following terms:
- Non-commercial use only; redistribution and commercial use are prohibited.
- Touhou character portraits are by [**dairi**](https://www.pixiv.net/en/users/4920496) ([**haruka**](https://www.nicovideo.jp/user/3494232)), used accordingly to the specified permissions.
- The project complies with the [**Touhou Project fan work guidelines**](https://touhou-project.news/guidelines_en/).

If you are an artist and wish to have your work removed or credited differently, please open an issue or contact me.

© AEnigmatrices, 2025
