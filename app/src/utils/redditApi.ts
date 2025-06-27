const REDDIT_BASE_URL = import.meta.env.VITE_REDDIT_BASE_URL;
const REDDIT_MEDIA_URL = import.meta.env.VITE_REDDIT_MEDIA_URL;

const isDirectImageUrl = (url: string): boolean => /\.(jpg|jpeg|png|gif)$/i.test(url);

const getGalleryImages = (galleryData: any, mediaMetadata: any): string[] | null => {
    if (!galleryData || !mediaMetadata) return null;
    return galleryData.items
        .map((item: any) => {
            const media = mediaMetadata[item.media_id];
            if (!media) return null;
            const type = media.m.split("/")[1];
            const ext = type === "jpeg" ? "jpg" : type;
            return `${REDDIT_MEDIA_URL}/${item.media_id}.${ext}`;
        })
        .filter(Boolean);
};

export const fetchRedditImageData = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");

    const post = (await res.json())[0]?.data?.children[0]?.data;
    if (!post) throw new Error("Invalid post data");

    return {
        permalink: post.permalink ? `${REDDIT_BASE_URL}${post.permalink}` : null,
        imageUrl: isDirectImageUrl(post.url) ? post.url : null,
        galleryImages: getGalleryImages(post.gallery_data, post.media_metadata)
    };
};
