import type { GalleryPost, SortOrder } from '../types/data';
import { assetPath, pagePath } from '../utils/paths';
import { responsiveSrcset } from '../utils/responsiveImage';

type JumpItem = 'ellipsis-start' | 'ellipsis-end';
type PaginationItem = number | JumpItem;
type NavigatorWithConnection = Navigator & {
    connection?: {
        saveData?: boolean;
    };
};

const GALLERY_POSTS_PER_PAGE = 12;
let postsRequest: Promise<GalleryPost[]> | undefined;
const warmedPostUrls = new Set<string>();

const shouldAvoidSpeculativeFetch = (): boolean =>
    Boolean((navigator as NavigatorWithConnection).connection?.saveData);

const scheduleIdleTask = (task: () => void): void => {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(task, { timeout: 2_000 });
        return;
    }
    setTimeout(task, 500);
};

const warmVisiblePostDocuments = (grid: HTMLElement | null): void => {
    if (!grid || shouldAvoidSpeculativeFetch()) return;

    scheduleIdleTask(() => {
        const urls = [...grid.querySelectorAll<HTMLAnchorElement>('a.tile')]
            .slice(0, GALLERY_POSTS_PER_PAGE)
            .map(link => link.href)
            .filter(url => !warmedPostUrls.has(url));

        for (const url of urls) {
            warmedPostUrls.add(url);
            void fetch(url).catch(() => warmedPostUrls.delete(url));
        }
    });
};

const warmInitialPostDocuments = (grid: HTMLElement | null): void => {
    const firstImage = grid?.querySelector<HTMLImageElement>('a.tile img');
    if (!firstImage) {
        warmVisiblePostDocuments(grid);
        return;
    }

    const scheduleWarm = (): void => warmVisiblePostDocuments(grid);
    if (firstImage.complete) scheduleWarm();
    else firstImage.addEventListener('load', scheduleWarm, { once: true });
};

const loadPosts = (): Promise<GalleryPost[]> => {
    postsRequest ??= fetch(assetPath('runtime-data/gallery-posts.json'))
        .then(async response => {
            if (!response.ok) throw new Error(`Gallery data request failed with ${response.status}.`);
            const value: unknown = await response.json();
            if (!Array.isArray(value)) throw new TypeError('Gallery data response was invalid.');
            return value as GalleryPost[];
        })
        .catch(error => {
            postsRequest = undefined;
            throw error;
        });
    return postsRequest;
};

const initializeGallery = (): void => {
    const root = document.querySelector<HTMLElement>('[data-gallery-page]');
    if (!root) return;

    const postsPerPage = GALLERY_POSTS_PER_PAGE;
    const grid = root.querySelector<HTMLElement>('[data-gallery-grid]');
    const postCount = root.querySelector<HTMLElement>('[data-post-count]');
    const galleryOnlyButton = root.querySelector<HTMLButtonElement>('[data-gallery-only]');
    const dateSortButton = root.querySelector<HTMLButtonElement>('[data-date-sort]');
    const pagination = root.querySelector<HTMLElement>('[data-pagination]');
    const search = new URLSearchParams(window.location.search);

    let currentPage = 1;
    let dateSort: SortOrder = 'desc';
    let galleryOnly = false;
    const characterQueries = (search.get('characters') || '').split(',').map(value => value.trim()).filter(Boolean);
    const artistQueries = (search.get('artist') || search.get('artists') || '').split(',').map(value => value.trim()).filter(Boolean);
    const mode: 'and' | 'or' = search.get('mode') === 'or' ? 'or' : 'and';
    let openJump: JumpItem | null = null;
    let jumpPage = '';

    const getPaginationItems = (page: number, pageCount: number): PaginationItem[] => {
        if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
        const pages = new Set([1, pageCount, page - 1, page, page + 1]);
        const validPages = [...pages].filter(pageNumber => pageNumber >= 1 && pageNumber <= pageCount).sort((a, b) => a - b);
        const items: PaginationItem[] = [];
        validPages.forEach((pageNumber, index) => {
            const previous = validPages[index - 1];
            if (previous && pageNumber - previous > 1) items.push(previous === 1 ? 'ellipsis-start' : 'ellipsis-end');
            items.push(pageNumber);
        });
        return items;
    };

    const createButton = (label: string, onClick: () => void): HTMLButtonElement => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.addEventListener('click', onClick);
        return button;
    };

    const makeTile = (post: GalleryPost): HTMLAnchorElement => {
        const link = document.createElement('a');
        link.className = 'tile';
        link.href = pagePath(`posts/${post.id}`);
        link.setAttribute('aria-label', `View post ${post.id}`);
        const image = document.createElement('img');
        image.classList.toggle('nsfw', post.nsfw);
        image.src = post.img;
        const srcset = responsiveSrcset(post.imgSources, post.img);
        if (srcset) image.srcset = srcset;
        image.sizes = '(max-width: 700px) 50vw, (max-width: 1180px) 25vw, 17vw';
        image.alt = '';
        image.loading = 'lazy';
        image.decoding = 'async';
        link.append(image);
        if (post.nsfw) {
            const badge = document.createElement('span');
            badge.textContent = 'NSFW';
            link.append(badge);
        }
        return link;
    };

    const clampPage = (value: string, totalPages: number): number => {
        const page = Number(value);
        if (!Number.isInteger(page)) return currentPage;
        return Math.min(totalPages, Math.max(1, page));
    };

    const renderPagination = (totalPages: number): void => {
        if (!pagination) return;
        pagination.hidden = totalPages <= 1;
        if (totalPages <= 1) return;

        const children: HTMLElement[] = [];
        const previous = createButton('Previous', () => { currentPage -= 1; void render(); });
        previous.disabled = currentPage === 1;
        children.push(previous);

        for (const item of getPaginationItems(currentPage, totalPages)) {
            if (typeof item === 'number') {
                const button = createButton(String(item), () => { currentPage = item; openJump = null; void render(); });
                button.classList.toggle('active', item === currentPage);
                if (item === currentPage) button.setAttribute('aria-current', 'page');
                children.push(button);
                continue;
            }
            if (openJump === item) {
                const form = document.createElement('form');
                form.className = 'jump-form';
                const input = document.createElement('input');
                input.type = 'number';
                input.min = '1';
                input.max = String(totalPages);
                input.value = jumpPage;
                input.setAttribute('aria-label', `Jump to page between 1 and ${totalPages}`);
                input.addEventListener('input', () => jumpPage = input.value);
                input.addEventListener('blur', () => { jumpPage = String(clampPage(jumpPage, totalPages)); input.value = jumpPage; });
                input.addEventListener('keydown', event => { if (event.key === 'Escape') { openJump = null; void render(); } });
                const submit = document.createElement('button');
                submit.type = 'submit';
                submit.textContent = 'Go';
                form.addEventListener('submit', event => {
                    event.preventDefault();
                    currentPage = clampPage(jumpPage, totalPages);
                    jumpPage = String(currentPage);
                    openJump = null;
                    void render();
                });
                form.append(input, submit);
                children.push(form);
            } else {
                const ellipsis = createButton('...', () => {
                    openJump = item;
                    jumpPage = String(currentPage);
                    void render().then(() => pagination.querySelector<HTMLInputElement>('.jump-form input')?.focus());
                });
                ellipsis.className = 'ellipsis';
                ellipsis.setAttribute('aria-label', `Jump to page between 1 and ${totalPages}`);
                children.push(ellipsis);
            }
        }

        const next = createButton('Next', () => { currentPage += 1; void render(); });
        next.disabled = currentPage === totalPages;
        children.push(next);
        pagination.replaceChildren(...children);
    };

    const render = async (): Promise<void> => {
        const posts = await loadPosts();
        const filteredPosts = posts.filter(post => {
            if (galleryOnly && post.nsfw) return false;
            const characterMatch = characterQueries.length === 0 || (mode === 'and'
                ? characterQueries.every(id => post.characterIds.includes(id))
                : characterQueries.some(id => post.characterIds.includes(id)));
            const artistMatch = artistQueries.length === 0 || artistQueries.includes(post.artistId);
            return characterMatch && artistMatch;
        });
        const sortedPosts = [...filteredPosts].sort((left, right) => dateSort === 'asc' ? left.date - right.date : right.date - left.date);
        const totalPages = Math.max(1, Math.ceil(sortedPosts.length / postsPerPage));
        if (currentPage > totalPages) currentPage = totalPages;
        const visiblePosts = sortedPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

        grid?.replaceChildren(...visiblePosts.map(makeTile));
        if (postCount) postCount.textContent = `${filteredPosts.length} post${filteredPosts.length === 1 ? '' : 's'}`;
        if (galleryOnlyButton) {
            galleryOnlyButton.textContent = galleryOnly ? 'SFW Only' : 'All Posts';
            galleryOnlyButton.setAttribute('aria-pressed', String(galleryOnly));
        }
        if (dateSortButton) dateSortButton.textContent = dateSort === 'desc' ? 'Newest First' : 'Oldest First';
        renderPagination(totalPages);
        warmInitialPostDocuments(grid);
    };

    const reportLoadError = (error: unknown): void => console.error('Unable to load gallery data.', error);

    galleryOnlyButton?.addEventListener('click', () => { galleryOnly = !galleryOnly; currentPage = 1; void render().catch(reportLoadError); });
    dateSortButton?.addEventListener('click', () => { dateSort = dateSort === 'desc' ? 'asc' : 'desc'; currentPage = 1; void render().catch(reportLoadError); });

    pagination?.addEventListener('click', event => {
        const button = (event.target as Element | null)?.closest<HTMLButtonElement>('button');
        if (!button || button.disabled || postsRequest) return;

        const label = button.textContent?.trim() ?? '';
        void loadPosts().then(() => {
            if (label === 'Next') currentPage += 1;
            else if (label === 'Previous') currentPage = Math.max(1, currentPage - 1);
            else if (/^\d+$/.test(label)) currentPage = Number(label);
            else if (label === '...') {
                openJump = 'ellipsis-start';
                jumpPage = String(currentPage);
            }
            return render();
        }).then(() => {
            if (label === '...') pagination.querySelector<HTMLInputElement>('.jump-form input')?.focus();
        }).catch(reportLoadError);
    });

    if (characterQueries.length > 0 || artistQueries.length > 0 || search.has('mode')) {
        void render().catch(reportLoadError);
    } else {
        warmInitialPostDocuments(grid);
    }
};

initializeGallery();
