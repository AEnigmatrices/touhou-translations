const REDDIT_BASE_URL = "https://www.reddit.com";

export const fetchRedditImageData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    const postData = data[0]?.data?.children[0]?.data;

    if (!postData) throw new Error("Invalid post data");

    const imageUrl = postData.url?.match(/\.(jpg|jpeg|png|gif)$/i)
        ? postData.url
        : null;
    if (!imageUrl) throw new Error("No direct image URL found");

    return {
        title: postData.title || null,
        permalink: postData.permalink
            ? `${REDDIT_BASE_URL}${postData.permalink}`
            : null,
        imageUrl,
    };
};
