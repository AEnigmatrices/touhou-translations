const REDDIT_BASE_URL = "https://www.reddit.com";
const REDDIT_MEDIA_URL = "https://i.redd.it";

const isDirectImageUrl = (url: string): boolean => {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
};

const getGalleryImages = (
    galleryData: any,
    mediaMetadata: any
): string[] | null => {
    if (!galleryData || !mediaMetadata) return null;

    return galleryData.items
        .map((item: any) => {
            const media = mediaMetadata[item.media_id];
            if (!media) return null;

            let ext = "jpg";
            if (media.m === "image/png") ext = "png";
            else if (media.m === "image/gif") ext = "gif";
            else if (media.m === "image/jpeg") ext = "jpg";

            return `${REDDIT_MEDIA_URL}/${item.media_id}.${ext}`;
        })
        .filter(Boolean);
};

export const fetchRedditImageData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();
    const postData = data[0]?.data?.children[0]?.data;
    if (!postData) throw new Error("Invalid post data");

    const directImageUrl = isDirectImageUrl(postData.url) ? postData.url : null;
    const galleryImages = getGalleryImages(
        postData.gallery_data,
        postData.media_metadata
    );

    return {
        title: postData.title || null,
        permalink: postData.permalink
            ? `${REDDIT_BASE_URL}${postData.permalink}`
            : null,
        imageUrl: directImageUrl,
        galleryImages,
    };
};
