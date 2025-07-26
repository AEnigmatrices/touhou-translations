export const extractRedditId = (url: string): string => {
    const match = url.trim().match(/comments\/([a-zA-Z0-9]+)/);
    return match ? match[1] : '';
};