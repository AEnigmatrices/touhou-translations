import { u as usePageContext, f as fetchPosts, g as fetchArtists, h as fetchCharacters, j as getArtistArtworkCounts, k as getCharacterArtworkCounts } from "./chunk-DrVr2UpR.js";
import { useState, useEffect } from "react";
/*! src/renderer/useAppData.ts [vike:pluginModuleBanner] */
const useAppData = () => {
  const pageContext = usePageContext();
  const [data, setData] = useState({
    posts: pageContext.appData?.posts || [],
    artists: pageContext.appData?.artists || [],
    characters: pageContext.appData?.characters || [],
    loading: !pageContext.appData,
    error: null
  });
  useEffect(() => {
    if (pageContext.appData) return;
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, loading: true, error: null }));
        const [posts, artists, characters] = await Promise.all([
          fetchPosts(),
          fetchArtists(),
          fetchCharacters()
        ]);
        const artistArtworkCounts = getArtistArtworkCounts(posts);
        const characterArtworkCounts = getCharacterArtworkCounts(posts);
        const artistsWithCount = artists.map((artist) => ({ ...artist, artworkCount: artistArtworkCounts[artist.id] ?? 0 }));
        const charactersWithCount = characters.map((character) => ({ ...character, artworkCount: characterArtworkCounts[character.id] ?? 0 }));
        setData({
          posts,
          artists: artistsWithCount,
          characters: charactersWithCount,
          loading: false,
          error: null
        });
      } catch (error) {
        setData((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error : new Error("Failed to fetch data")
        }));
      }
    };
    fetchData();
  }, [pageContext.appData]);
  return data;
};
export {
  useAppData as u
};
