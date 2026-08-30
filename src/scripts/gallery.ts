import galleryPostsData from '../../generated/gallery-posts.json';
import type { GalleryPost, SortOrder } from '../types/data';
import { pagePath } from '../utils/paths';
import { responsiveSrcset } from '../utils/responsiveImage';

type JumpItem = 'ellipsis-start' | 'ellipsis-end';
type PaginationItem = number | JumpItem;

const root = document.querySelector<HTMLElement>('[data-gallery-page]');

if (root) {
    const posts = galleryPostsData as GalleryPost[];
    const postsPerPage = 12;
    const grid = root.querySelector<HTMLElement>('[data-gallery-grid]');
    const postCount = root.querySelector<HTMLElement>('[data-post-count]');
    const galleryOnlyButton = root.querySelector<HTMLButtonElement>('[data-gallery-only]');
    const dateSortButton = root.querySelector<HTMLButtonElement>('[data-date-sort]');
    const pagination = root.querySelector<HTMLElement>('[data-pagination]');
    const search = new URLSearchParams(window.location.search);

    let currentPage = 1;
    let dateSort: SortOrder = 'desc';
    let galleryOnly = false;
    let characterQueries = (search.get('characters') || '').split(',').map(value => value.trim()).filter(Boolean);
    let artistQueries = (search.get('artist') || search.get('artists') || '').split(',').map(value => value.trim()).filter(Boolean);
    let mode: 'and' | 'or' = search.get('mode') === 'or' ? 'or' : 'and';
    let openJump: JumpItem | null = null;
    let jumpPage = '';

    const getPaginationItems = (page: number, pageCount: number): PaginationItem[] => {
        if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
        const pages = new Set([1, pageCount, page - 1, page, page + 1]);
        const validPages = [...pages]
            .filter(pageNumber => pageNumber >= 1 && pageNumber <= pageCount)
            .sort((left, right) => left - right);
        const items: PaginationItem[] = [];
        validPages.forEach((pageNumber, index) => {
            const previous = validPages[index - 1];
            if (previous && pageNumber - previous > 1) {
                items.push(previous === 1 ? 'ellipsis-start' : 'ellipsis-end');
            }
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

    const renderPagination = (totalPages: number): void => {
        if (!pagination) return;
        pagination.hidden = totalPages <= 1;
        if (totalPages <= 1) return;

        const children: HTMLElement[] = [];
        const previous = createButton('Previous', () => {
            currentPage -= 1;
            render();
        });
        previous.disabled = currentPage === 1;
        children.push(previous);

        for (const item of getPaginationItems(currentPage, totalPages)) {
            if (typeof item === 'number') {
                const button = createButton(String(item), () => {
                    currentPage = item;
                    openJump = null;
                    render();
                });
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
                input.addEventListener('blur', () => {
                    jumpPage = String(clampPage(jumpPage, totalPages));
                    input.value = jumpPage;
                });
                input.addEventListener('keydown', event => {
                    if (event.key === 'Escape') {
                        openJump = null;
                        render();
                    }
                });
                const submit = document.createElement('button');
                submit.type = 'submit';
                submit.textContent = 'Go';
                form.addEventListener('submit', event => {
                    event.preventDefault();
                    currentPage = clampPage(jumpPage, totalPages);
                    jumpPage = String(currentPage);
                    openJump = null;
                    render();
                });
                form.append(input, submit);
                children.push(form);
            } else {
                const ellipsis = createButton('...', () => {
                    openJump = item;
                    jumpPage = String(currentPage);
                    render();
                    pagination.querySelector<HTMLInputElement>('.jump-form input')?.focus();
                });
                ellipsis.className = 'ellipsis';
                ellipsis.setAttribute('aria-label', `Jump to page between 1 and ${totalPages}`);
                children.push(ellipsis);
            }
        }

        const next = createButton('Next', () => {
            currentPage += 1;
            render();
        });
        next.disabled = currentPage === totalPages;
        children.push(next);
        pagination.replaceChildren(...children);
    };

    const clampPage = (value: string, totalPages: number): number => {
        const page = Number(value);
        if (!Number.isInteger(page)) return currentPage;
        return Math.min(totalPages, Math.max(1, page));
    };

    const render = (): void => {
        const filteredPosts = posts.filter(post => {
            if (galleryOnly && post.nsfw) return false;
            const characterMatch = characterQueries.length === 0
                || (mode === 'and'
                    ? characterQueries.every(id => post.characterIds.includes(id))
                    : characterQueries.some(id => post.characterIds.includes(id)));
            const artistMatch = artistQueries.length === 0 || artistQueries.includes(post.artistId);
            return characterMatch && artistMatch;
        });
        const sortedPosts = [...filteredPosts].sort((left, right) => (
            dateSort === 'asc' ? left.date - right.date : right.date - left.date
        ));
        const totalPages = Math.max(1, Math.ceil(sortedPosts.length / postsPerPage));
        if (currentPage > totalPages) currentPage = totalPages;
        const visiblePosts = sortedPosts.slice(
            (currentPage - 1) * postsPerPage,
            currentPage * postsPerPage
        );

        grid?.replaceChildren(...visiblePosts.map(makeTile));
        if (postCount) postCount.textContent = `${filteredPosts.length} post${filteredPosts.length === 1 ? '' : 's'}`;
        if (galleryOnlyButton) {
            galleryOnlyButton.textContent = galleryOnly ? 'SFW Only' : 'All Posts';
            galleryOnlyButton.setAttribute('aria-pressed', String(galleryOnly));
        }
        if (dateSortButton) dateSortButton.textContent = dateSort === 'desc' ? 'Newest First' : 'Oldest First';
        renderPagination(totalPages);
    };

    galleryOnlyButton?.addEventListener('click', () => {
        galleryOnly = !galleryOnly;
        render();
    });
    dateSortButton?.addEventListener('click', () => {
        dateSort = dateSort === 'desc' ? 'asc' : 'desc';
        render();
    });

    render();
}
