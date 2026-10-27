import { pagePath } from './paths';

export const CATALOG_PAGE_SIZES = {
    gallery: 12,
    artists: 24,
    characters: 24
} as const;

export type CatalogRoute = keyof typeof CATALOG_PAGE_SIZES;
export type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end';

export const catalogPageCount = (itemCount: number, pageSize: number): number =>
    Math.max(1, Math.ceil(itemCount / pageSize));

export const catalogPagePath = (route: CatalogRoute, page: number): string =>
    pagePath(page === 1 ? route : `${route}/page/${page}`);

export const paginationItems = (page: number, pageCount: number): PaginationItem[] => {
    if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
    const pages = new Set([1, pageCount, page - 1, page, page + 1]);
    const validPages = [...pages]
        .filter(value => value >= 1 && value <= pageCount)
        .sort((a, b) => a - b);
    const items: PaginationItem[] = [];
    validPages.forEach((value, index) => {
        const previous = validPages[index - 1];
        if (previous && value - previous > 1) {
            items.push(previous === 1 ? 'ellipsis-start' : 'ellipsis-end');
        }
        items.push(value);
    });
    return items;
};
