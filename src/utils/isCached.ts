export const isCached = (url: string) => {
    if (typeof window === 'undefined') return false;
    const img = new Image();
    img.src = url;
    return img.complete && img.naturalWidth > 0;
};