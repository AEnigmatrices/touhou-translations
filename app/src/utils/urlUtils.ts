export const replaceXWithNitter = (originalUrl: string) => {
    try {
        const url = new URL(originalUrl);
        return url.hostname === 'x.com' ? (url.hostname = 'nitter.net', url.toString()) : null;
    } catch {
        return null;
    }
};