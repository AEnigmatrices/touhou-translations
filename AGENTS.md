# Touhou Translations: contributor and assistant instructions

These instructions apply to the whole repository. Follow explicit directions from
the archive owner when adding or correcting content. Do not infer editorial
decisions from Reddit flags or from similar earlier records.

## Adding Reddit translation posts

1. Read `src/lib/content/schemas.ts`, `scripts/validateContentData.ts` and
   representative files in `src/data/`; check whether the Reddit post ID is
   already present. Do not duplicate records.
2. Retrieve and verify the original Reddit post, publication time, caption,
   all artwork images and illustrator/source attribution. Reddit's RSS feed or
   embed page may help if its JSON endpoint is unavailable. If essential
   information is missing, tell the owner rather than filling it in by guess.
3. Add exactly one `src/data/posts/YYYY/MM/<reddit-id>.json` using the
   post's **UTC publication month**, with existing field names and four-space
   JSON indentation:
   - `date`: Unix timestamp in **milliseconds**.
   - `reddit`: original Reddit URL with the same post ID as the filename.
   - `url`: HTTPS artwork URLs, including every gallery image in order.
   - `src`: verified original artwork link or relevant official source.
   - `desc`: the translator's original commentary, retaining relevant
     formatting and links; keep routine illustrator credits in `artistId`.
   - `artistId`, `characterIds`, `nsfw`: use the policies below.
4. Match artists to existing files under `src/data/artists/` by their
   **actual source account**, not their display name alone. For a genuinely
   new artist, add one record with verified social links, a valid portrait or
   existing placeholder, and a unique unused `sortOrder`. Do not invent a
   Pixiv account or artist identity.
5. Check `src/data/characters/` for exact character IDs; examine all
   supplied images, including background appearances, when assigning tags.
   Honor every explicit addition or removal requested by the owner. Create
   a character record only when needed, with valid work code, portrait and
   unique sort order. Never duplicate IDs in `characterIds`.
6. Respect one-off editorial instructions over third-party metadata.
   For example, the Tokyo Tower food/drinks menu post `1wpx0k4` is
   credited to **Ayumi**, not baba, by the owner's explicit instruction.

## NSFW: owner-controlled, explicit opt-in

**Set `"nsfw": false` on every newly added post unless the owner explicitly
instructs you to mark that specific post NSFW on the Astro site.** Only an
explicit, post-specific request authorizes `"nsfw": true`.

Never carry over Reddit's NSFW flag automatically. Do not infer the site's
NSFW classification from an original caption, the artwork, or your judgment.
The Astro archive has its own exceptional NSFW category controlled solely
by the owner. Do not change an existing post's NSFW flag without an explicit
request from the owner.

## Validation, review and delivery

- Check the strict content schemas and verify post-ID/URL equality, UTC
  year/month paths, valid artist and character references, portrait assets,
  unique sort orders, and complete gallery URLs. Preserve unchanged fields
  when the owner requests a narrowly scoped correction.
- Use Node.js 24 and the pnpm version pinned in `package.json`. Run
  `pnpm install --frozen-lockfile`, `pnpm run test`, `pnpm run build`,
  `pnpm exec playwright install chromium`, and `pnpm run test:e2e`.
  GitHub's pull-request workflow runs the same verification.
- Work on a feature branch, open a PR for review, and leave `main`
  unchanged unless the owner asks for a merge. Exclude any temporary
  research files, fetched images, ad-hoc scripts or workflows from the PR.
  Report missing sources or unrun tests instead of claiming success.
