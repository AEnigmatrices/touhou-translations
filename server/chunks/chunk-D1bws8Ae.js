/*! src/utils/extractRedditId.ts [vike:pluginModuleBanner] */
const extractRedditId = (url) => {
  const match = url.trim().match(/comments\/([a-zA-Z0-9]+)/);
  return match ? match[1] : "";
};
export {
  extractRedditId as e
};
