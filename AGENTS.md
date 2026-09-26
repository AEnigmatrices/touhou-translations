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
4. Identify artists **before creating new records**. Search all existing files
   under `src/data/artists/` for matching verified X/Twitter and Pixiv
   account URLs, including a person's primary and secondary accounts.
   Reuse their existing artist ID even if their current display name, the
   source post's credit, or the social handle differs. Distinct people with
   identical names must remain separate records; do not merge on name alone.
   For example, `@campagne_9` is already `kanpa` and `@tktgm0703`
   already has the `kakunohito` record. Do not create parallel IDs for
   accounts already present in the archive.
5. For the artist record's **`name`**, prefer the artist's self-chosen name
   on their X/Twitter and/or Pixiv profile, **not the spelling supplied in
   a Reddit submission's illustrator credit or a romanization invented from
   the artist ID**. Compare available profiles and choose the short,
   distinctive preferred name, preserving its native writing system;
   omit temporary event notices, emoji, follower counts, and descriptive
   suffixes. If a profile provides both a native name and a reading (for
   example, X `民（tami)` and Pixiv `民`), use `民`. If profiles conflict,
   an alias/secondary-account relationship is unclear, or the preferred
   name is otherwise ambiguous, ask the owner to decide before changing
   or adding the artist. Never invent an identity or account.
6. Only when an artist is truly new, add
   `src/data/artists/<stable-artist-id>.json`, with their verified
   name, X/Twitter and/or Pixiv profile links, and a valid portrait or
   an existing placeholder. One verified social account is sufficient;
   Pixiv is optional and must never be invented. Assign `sortOrder`
   as **the current maximum artist sort order + 1**, allocating
   consecutive ascending numbers when adding several artists together;
   avoid reusing gaps. Keep existing IDs and sort orders stable when
   correcting display names or consolidating accidental duplicates.
   If a canonical existing artist name is uncertain, retain it provisionally
   and ask the owner before renaming it.
7. Check `src/data/characters/` for exact character IDs; examine all
   supplied images, including background appearances, when assigning tags.
   Honor every explicit addition or removal requested by the owner. Create
   a character record only when needed, with valid work code, portrait and
   unique sort order. Never duplicate IDs in `characterIds`.
8. Respect one-off editorial instructions over third-party metadata.
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
