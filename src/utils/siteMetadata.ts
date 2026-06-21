export const SITE_NAME = 'Touhou Translations';
export const SITE_URL = 'https://aenigmatrices.github.io/touhou-translations/';
export const DEFAULT_DESCRIPTION = 'An archive of fan-translated Touhou Project comics and illustrations.';

export const absoluteSiteUrl = (pathname = ''): string => {
    const relativePath = pathname.replace(/^\/+|\/+$/g, '');
    if (!relativePath) return SITE_URL;

    const suffix = /\.[a-z0-9]+$/i.test(relativePath) ? '' : '/';
    return `${SITE_URL}${relativePath}${suffix}`;
};
