export const dateFormatOptions: Intl.DateTimeFormatOptions = { timeZone: 'UTC', dateStyle: 'long', timeStyle: 'short' };



export const hashDateToIndex = (dateStr: string, max: number): number => {
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        hash = (hash << 5) - hash + dateStr.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash) % max;
};



export const replaceXWithNitter = (originalUrl: string) => {
    try {
        const url = new URL(originalUrl);
        return url.hostname === 'x.com' ? (url.hostname = 'nitter.net', url.toString()) : null;
    } catch {
        return null;
    }
};