/*! src/utils/galleryUtils.ts [vike:pluginModuleBanner] */
const getCharacterPortraits = (id) => {
  return `${"/touhou-translations/"}portraits/characters/thumb_80x80/${id}_80x80.webp`;
};
const getArtistPortraits = (id) => {
  return `${"/touhou-translations/"}portraits/artists/thumb_80x80/${id}_80x80.webp`;
};
const placeholderFilenames = [
  "demoman_80x80.webp",
  "engineer_80x80.webp",
  "heavy_80x80.webp",
  "medic_80x80.webp",
  "pyro_80x80.webp",
  "scout_80x80.webp",
  "sniper_80x80.webp",
  "soldier_80x80.webp",
  "spy_80x80.webp"
];
const getRandomPlaceholder = () => {
  const index = Math.floor(Math.random() * placeholderFilenames.length);
  return `${"/touhou-translations/"}portraits/placeholders/thumb_80x80/${placeholderFilenames[index]}`;
};
export {
  getArtistPortraits as a,
  getRandomPlaceholder as b,
  getCharacterPortraits as g
};
