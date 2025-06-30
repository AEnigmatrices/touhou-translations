export const replaceXWithNitter = (originalUrl: string) => {
    try {
        const url = new URL(originalUrl);
        if (url.hostname === 'x.com' || url.hostname.endsWith('.x.com')) {
            url.hostname = url.hostname.replace(/x\.com$/i, 'nitter.net');
            return url.toString();
        }
        return null;
    } catch (e) {
        return null;
    }
}