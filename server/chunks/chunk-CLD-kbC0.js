/*! src/utils/galleryUtils.ts [vike:pluginModuleBanner] */
const getCharacterPortraits = (id) => {
  return `${"/touhou-translations/"}portraits/characters/${id}.webp`;
};
const getArtistPortraits = (id) => {
  return `${"/touhou-translations/"}portraits/artists/${id}.webp`;
};
const placeholderFilenames = [
  "demoman.webp",
  "engineer.webp",
  "heavy.webp",
  "medic.webp",
  "pyro.webp",
  "scout.webp",
  "sniper.webp",
  "soldier.webp",
  "spy.webp"
];
const getRandomPlaceholder = () => {
  const index = Math.floor(Math.random() * placeholderFilenames.length);
  return `${"/touhou-translations/"}portraits/placeholders/${placeholderFilenames[index]}`;
};
export {
  getArtistPortraits as a,
  getRandomPlaceholder as b,
  getCharacterPortraits as g
};
