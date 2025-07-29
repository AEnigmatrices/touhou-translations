import { f as fetchPosts, e as fetchArtists, g as fetchCharacters, h as getArtistArtworkCounts, j as getCharacterArtworkCounts } from "./chunk-DuogPw2d.js";
/*! src/renderer/+data.ts [vike:pluginModuleBanner] */
const data = async () => {
  const [posts, artists, characters] = await Promise.all([
    fetchPosts(),
    fetchArtists(),
    fetchCharacters()
  ]);
  const artistArtworkCounts = getArtistArtworkCounts(posts);
  const characterArtworkCounts = getCharacterArtworkCounts(posts);
  const artistsWithCount = artists.map((artist) => ({
    ...artist,
    artworkCount: artistArtworkCounts[artist.id] ?? 0
  }));
  const charactersWithCount = characters.map((character) => ({
    ...character,
    artworkCount: characterArtworkCounts[character.id] ?? 0
  }));
  return {
    posts,
    artists: artistsWithCount,
    characters: charactersWithCount
  };
};
const import3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  data
}, Symbol.toStringTag, { value: "Module" }));
export {
  import3 as i
};
