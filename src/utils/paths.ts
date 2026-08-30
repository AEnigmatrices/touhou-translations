const normalizedBase = (): string => {
    const base = import.meta.env.BASE_URL || '/';
    return `/${base.replace(/^\/+|\/+$/g, '')}${base === '/' ? '' : '/'}`;
};

export const BASE_PATH = normalizedBase();

export const assetPath = (pathname: string): string => (
    `${BASE_PATH}${pathname.replace(/^\/+/, '')}`
);

export const pagePath = (pathname = ''): string => {
    const relativePath = pathname.replace(/^\/+|\/+$/g, '');
    return relativePath ? `${BASE_PATH}${relativePath}/` : BASE_PATH;
};

export const pagePathWithQuery = (pathname: string, query: string): string => (
    `${pagePath(pathname)}${query.startsWith('?') ? query : `?${query}`}`
);
