export function normalizeCommas(input: string): string {
    return input
        .split(',')
        .map(value => value.trim())
        .filter(value => value.length > 0)
        .join(', ');
}

export const TWITTER_URL_PATTERN = /^(https?:\/\/)?(www\.)?x\.com\/.+$/i;
export const PIXIV_URL_PATTERN = /^https?:\/\/(www\.)?pixiv\.net\/.+$/i;