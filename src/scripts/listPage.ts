import type { Artist, Character, SortOrder } from '../types/data';
import { assetPath, pagePathWithQuery } from '../utils/paths';

type ListItem = Artist | Character;
type ListMode = 'character' | 'artist';

type NavigatorWithConnection = Navigator & {
    connection?: {
        saveData?: boolean;
    };
};

const shouldAvoidSpeculativeFetch = (): boolean =>
    Boolean((navigator as NavigatorWithConnection).connection?.saveData);

const scheduleIdleTask = (task: () => void): void => {
    const schedule = (): void => {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(task, { timeout: 2_000 });
            return;
        }
        setTimeout(task, 1_000);
    };

    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
};

const initializeListPage = (): void => {
    const root = document.querySelector<HTMLElement>('[data-list-page]');
    if (!root) return;

    const mode = root.dataset.mode as ListMode;
    const searchInput = root.querySelector<HTMLInputElement>('[data-list-search]');
    const grid = root.querySelector<HTMLUListElement>('[data-list-grid]');
    const sortButton = root.querySelector<HTMLButtonElement>('[data-list-sort]');
    const selectModeButton = root.querySelector<HTMLButtonElement>('[data-select-mode]');
    const viewSelectedLink = root.querySelector<HTMLAnchorElement>('[data-view-selected]');
    const loadMoreButton = root.querySelector<HTMLButtonElement>('[data-load-more]');
    const portraitImagesTemplate = root.querySelector<HTMLTemplateElement>('[data-portrait-images]');
    const pageSize = Number(root.dataset.pageSize) || 24;
    const portraitImages = new Map<string, HTMLImageElement>();

    for (const image of portraitImagesTemplate?.content.querySelectorAll<HTMLImageElement>('[data-portrait-key]') ?? []) {
        const key = image.dataset.portraitKey;
        if (key) portraitImages.set(key, image);
    }

    let itemsRequest: Promise<ListItem[]> | undefined;
    let searchValue = '';
    let isSelectMode = false;
    let selectedItems: string[] = [];
    let sortOrder: SortOrder = mode === 'artist' ? 'desc' : 'none';
    let visibleCount = pageSize;

    const loadItems = (): Promise<ListItem[]> => {
        itemsRequest ??= fetch(assetPath(`runtime-data/${mode === 'artist' ? 'artists' : 'characters'}.json`))
            .then(async response => {
                if (!response.ok) throw new Error(`List data request failed with ${response.status}.`);
                const value: unknown = await response.json();
                if (!Array.isArray(value)) throw new TypeError('List data response was invalid.');
                return value as ListItem[];
            })
            .catch(error => {
                itemsRequest = undefined;
                throw error;
            });
        return itemsRequest;
    };

    const compareItems = (left: ListItem, right: ListItem): number => {
        if (sortOrder === 'none') return mode === 'artist' ? left.id.localeCompare(right.id) : 0;
        const primaryDifference = sortOrder === 'asc'
            ? left.artworkCount - right.artworkCount
            : right.artworkCount - left.artworkCount;
        if (primaryDifference !== 0) return primaryDifference;

        const leftSecondary = mode === 'character' ? (left as Character).artistCount : (left as Artist).characterCount;
        const rightSecondary = mode === 'character' ? (right as Character).artistCount : (right as Artist).characterCount;
        return sortOrder === 'asc' ? leftSecondary - rightSecondary : rightSecondary - leftSecondary;
    };

    const selectedGalleryUrl = (id: string): string => {
        const key = mode === 'character' ? 'characters' : 'artist';
        const value = mode === 'character' ? selectedItems.join(',') || id : id;
        return pagePathWithQuery('gallery', `${key}=${encodeURIComponent(value)}`);
    };

    const makeText = (className: string, value: string): HTMLParagraphElement => {
        const paragraph = document.createElement('p');
        paragraph.className = className;
        paragraph.textContent = value;
        return paragraph;
    };

    const renderItem = (item: ListItem): HTMLLIElement => {
        const selected = selectedItems.includes(item.id);
        const portraitImage = portraitImages.get(item.portrait);
        if (!portraitImage) throw new Error(`Optimized portrait template is missing for ${item.portrait}.`);

        const listItem = document.createElement('li');
        listItem.className = `profile-item large${selected ? ' selected' : ''}`;
        listItem.dataset.itemId = item.id;
        listItem.setAttribute('aria-label', `Profile: ${item.name}`);

        const box = isSelectMode ? document.createElement('button') : document.createElement('a');
        box.className = 'box';
        if (box instanceof HTMLButtonElement) {
            box.type = 'button';
            box.setAttribute('aria-pressed', String(selected));
            box.addEventListener('click', () => {
                selectedItems = selected ? selectedItems.filter(id => id !== item.id) : [...selectedItems, item.id];
                void renderLoadedItems();
            });
        } else {
            box.href = selectedGalleryUrl(item.id);
        }

        const content = document.createElement('div');
        content.className = 'content large-content';
        const imageFrame = document.createElement('div');
        imageFrame.className = 'image-frame large-image';
        const image = portraitImage.cloneNode(true) as HTMLImageElement;
        image.removeAttribute('data-portrait-key');
        image.alt = item.name;
        imageFrame.append(image);

        const text = document.createElement('div');
        text.className = 'text large-text';
        if (isSelectMode) {
            const checkboxRow = document.createElement('span');
            checkboxRow.className = 'checkbox-row';
            const checkbox = document.createElement('span');
            checkbox.className = 'checkbox-mark';
            checkbox.setAttribute('aria-hidden', 'true');
            checkbox.textContent = selected ? '✓' : '';
            checkboxRow.append(checkbox);
            text.append(checkboxRow);
        }
        text.append(makeText('name large-name', item.name));
        text.append(makeText('desc', `${item.artworkCount} artwork${item.artworkCount === 1 ? '' : 's'}`));
        const secondaryCount = mode === 'character' ? (item as Character).artistCount : (item as Artist).characterCount;
        const secondaryLabel = mode === 'character' ? 'artist' : 'character';
        text.append(makeText('desc', `${secondaryCount} ${secondaryLabel}${secondaryCount === 1 ? '' : 's'}`));

        content.append(imageFrame, text);
        box.append(content);
        listItem.append(box);
        return listItem;
    };

    const render = (items: ListItem[]): void => {
        if (!grid || !sortButton || !loadMoreButton) return;
        const query = searchValue.toLocaleLowerCase();
        const searchedItems = query
            ? items.filter(item => [item.id, item.name].some(value => value.toLocaleLowerCase().includes(query)))
            : items;
        const sortedItems = [...searchedItems].sort(compareItems);
        grid.replaceChildren(...sortedItems.slice(0, visibleCount).map(renderItem));

        sortButton.textContent = sortOrder === 'none' ? 'Sort' : sortOrder === 'desc' ? 'Count ↓' : 'Count ↑';
        sortButton.setAttribute('aria-pressed', String(sortOrder !== 'none'));
        loadMoreButton.hidden = visibleCount >= sortedItems.length;

        if (selectModeButton) {
            selectModeButton.classList.toggle('active', isSelectMode);
            selectModeButton.setAttribute('aria-pressed', String(isSelectMode));
            selectModeButton.textContent = isSelectMode ? `${selectedItems.length || 'Multi'} Selected` : 'Multi-Select OFF';
        }
        if (viewSelectedLink) {
            viewSelectedLink.hidden = !isSelectMode || selectedItems.length === 0;
            viewSelectedLink.href = pagePathWithQuery('gallery', `characters=${encodeURIComponent(selectedItems.join(','))}`);
        }
    };

    const reportLoadError = (error: unknown): void => console.error('Unable to load list data.', error);
    const renderLoadedItems = async (): Promise<void> => render(await loadItems());

    searchInput?.addEventListener('input', () => {
        searchValue = searchInput.value;
        visibleCount = pageSize;
        void renderLoadedItems().catch(reportLoadError);
    });
    sortButton?.addEventListener('click', () => {
        sortOrder = sortOrder === 'none' ? 'desc' : sortOrder === 'desc' ? 'asc' : 'none';
        visibleCount = pageSize;
        void renderLoadedItems().catch(reportLoadError);
    });
    selectModeButton?.addEventListener('click', () => {
        isSelectMode = !isSelectMode;
        void renderLoadedItems().catch(reportLoadError);
    });
    loadMoreButton?.addEventListener('click', () => {
        visibleCount += pageSize;
        void renderLoadedItems().catch(reportLoadError);
    });

    if (!shouldAvoidSpeculativeFetch()) {
        scheduleIdleTask(() => {
            void fetch(assetPath('runtime-data/gallery-posts.json')).catch(() => undefined);
        });
    }
};

initializeListPage();
