const REDDIT_BASE_URL = "https://www.reddit.com";

export const fetchRedditImageData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    const postData = data[0]?.data?.children[0]?.data;

    if (!postData) throw new Error("Invalid post data");

    const directImageUrl = postData.url?.match(/\.(jpg|jpeg|png|gif)$/i)
        ? postData.url
        : null;

    let galleryImages = null;
    if (postData.gallery_data && postData.media_metadata) {
        galleryImages = postData.gallery_data.items
            .map((item: any) => {
                const media = postData.media_metadata[item.media_id];
                if (!media) return null;

                let ext = "jpg";
                if (media.m === "image/png") ext = "png";
                else if (media.m === "image/gif") ext = "gif";
                else if (media.m === "image/jpeg") ext = "jpg";

                return `https://i.redd.it/${item.media_id}.${ext}`;
            })
            .filter(Boolean);
    }

    return {
        title: postData.title || null,
        permalink: postData.permalink
            ? `${REDDIT_BASE_URL}${postData.permalink}`
            : null,
        imageUrl: directImageUrl,
        galleryImages,
    };
};
