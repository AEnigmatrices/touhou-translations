import artistsData from '../../data/artists.json';
import charactersData from '../../data/characters.json';
import postIndex from '../../generated/post-index.json';
import type { ArtistRaw, CharacterRaw, PostEntryForm } from '../types/data';
import {
    buildArtistEntry,
    filterArtistOptions,
    validateArtistForm,
    type ArtistEntryForm
} from '../utils/admin/artistForm';
import {
    buildPostEntry,
    extractBaseRedditUrl,
    splitClean,
    validateRedditUrl,
    type RedditFormData
} from '../utils/admin/postForm';
import { assetPath } from '../utils/paths';

interface ApiResult {
    data?: RedditFormData;
    error?: string;
    file?: string;
}

const root = document.querySelector<HTMLElement>('.admin-page');

if (root) {
    const required = <T extends Element>(selector: string): T => {
        const element = root.querySelector<T>(selector);
        if (!element) throw new Error(`Admin control is missing: ${selector}`);
        return element;
    };

    const postForm = required<HTMLFormElement>('[data-post-form]');
    const redditInput = required<HTMLInputElement>('[data-post-reddit]');
    const dateInput = required<HTMLInputElement>('[data-post-date]');
    const urlsInput = required<HTMLTextAreaElement>('[data-post-urls]');
    const sourceInput = required<HTMLInputElement>('[data-post-source]');
    const descriptionInput = required<HTMLTextAreaElement>('[data-post-description]');
    const nsfwInput = required<HTMLInputElement>('[data-post-nsfw]');
    const fetchRedditButton = required<HTMLButtonElement>('[data-fetch-reddit]');
    const submitPostButton = required<HTMLButtonElement>('[data-submit-post]');
    const imagePreviews = required<HTMLElement>('[data-image-previews]');
    const postStatus = required<HTMLElement>('[data-post-status]');
    const postError = required<HTMLElement>('[data-post-error]');

    const artistPicker = required<HTMLElement>('[data-artist-picker]');
    const artistSearch = required<HTMLInputElement>('[data-artist-search]');
    const artistOptions = required<HTMLUListElement>('[data-artist-options]');
    const selectedArtistElement = required<HTMLElement>('[data-selected-artist]');
    const artistSearchError = required<HTMLElement>('[data-artist-search-error]');

    const characterPicker = required<HTMLElement>('[data-character-picker]');
    const characterSearch = required<HTMLInputElement>('[data-character-search]');
    const characterOptions = required<HTMLUListElement>('[data-character-options]');
    const characterChips = required<HTMLElement>('[data-character-chips]');
    const characterError = required<HTMLElement>('[data-character-error]');

    const artistForm = required<HTMLFormElement>('[data-artist-form]');
    const newArtistId = required<HTMLInputElement>('[data-new-artist-id]');
    const newArtistName = required<HTMLInputElement>('[data-new-artist-name]');
    const newArtistTwitter = required<HTMLInputElement>('[data-new-artist-twitter]');
    const newArtistPixiv = required<HTMLInputElement>('[data-new-artist-pixiv]');
    const submitArtistButton = required<HTMLButtonElement>('[data-submit-artist]');
    const artistStatus = required<HTMLElement>('[data-artist-status]');
    const artistError = required<HTMLElement>('[data-artist-error]');

    let artists = [...(artistsData as ArtistRaw[])];
    const characters = charactersData as CharacterRaw[];
    const artistIds = new Set(artists.map(artist => artist.id));
    const existingPostIds = new Set(Object.keys(postIndex));
    let selectedArtistId = '';
    let selectedCharacterIds: string[] = [];
    let artistMenuOpen = false;
    let characterMenuOpen = false;
    let highlightedArtistIndex = 0;
    let highlightedCharacterIndex = 0;
    let isFetchingReddit = false;
    let isSubmittingPost = false;

    const setMessage = (element: HTMLElement, value = ''): void => {
        element.textContent = value;
        element.hidden = !value;
    };

    const scrollToTop = (): void => window.scrollTo({ top: 0, behavior: 'smooth' });

    const currentPostForm = (): PostEntryForm => ({
        date: dateInput.valueAsNumber,
        reddit: redditInput.value,
        urls: urlsInput.value,
        src: sourceInput.value,
        desc: descriptionInput.value,
        artistId: selectedArtistId,
        characterIds: [...selectedCharacterIds]
    });

    const renderPreviews = (): void => {
        const urls = splitClean(urlsInput.value);
        imagePreviews.hidden = urls.length === 0;
        imagePreviews.replaceChildren(...urls.map((url, index) => {
            const figure = document.createElement('figure');
            const image = document.createElement('img');
            image.src = url;
            image.alt = `Preview ${index + 1}`;
            const caption = document.createElement('figcaption');
            caption.textContent = `Image ${index + 1}`;
            figure.append(image, caption);
            return figure;
        }));
    };

    const makePickerOption = (
        id: string,
        name: string,
        portrait: string,
        highlighted: boolean,
        selected: boolean,
        onSelect: () => void,
        onHighlight: () => void
    ): HTMLLIElement => {
        const item = document.createElement('li');
        item.setAttribute('role', 'presentation');
        const button = document.createElement('button');
        button.id = id;
        button.type = 'button';
        button.setAttribute('role', 'option');
        button.setAttribute('aria-selected', String(selected));
        button.classList.toggle('highlighted', highlighted);
        button.addEventListener('click', onSelect);
        button.addEventListener('pointerenter', onHighlight);
        const image = document.createElement('img');
        image.src = assetPath(portrait);
        image.alt = '';
        const label = document.createElement('span');
        label.textContent = name;
        const identifier = document.createElement('small');
        identifier.textContent = id.replace(/^(?:artist|character)-option-/, '');
        button.append(image, label, identifier);
        item.append(button);
        return item;
    };

    const filteredArtists = (): ArtistRaw[] => filterArtistOptions(artists, artistSearch.value);

    const renderArtistOptions = (): void => {
        const options = filteredArtists();
        artistOptions.hidden = !artistMenuOpen;
        artistSearch.setAttribute('aria-expanded', String(artistMenuOpen));
        if (!artistMenuOpen) {
            artistSearch.removeAttribute('aria-activedescendant');
            return;
        }

        if (options.length === 0) {
            const empty = document.createElement('li');
            empty.className = 'no-options';
            empty.textContent = 'No matching artists';
            artistOptions.replaceChildren(empty);
            artistSearch.removeAttribute('aria-activedescendant');
            return;
        }

        highlightedArtistIndex = Math.min(highlightedArtistIndex, options.length - 1);
        artistSearch.setAttribute('aria-activedescendant', `artist-option-${options[highlightedArtistIndex].id}`);
        artistOptions.replaceChildren(...options.map((artist, index) => makePickerOption(
            `artist-option-${artist.id}`,
            artist.name,
            artist.portrait,
            index === highlightedArtistIndex,
            artist.id === selectedArtistId,
            () => selectArtist(artist),
            () => {
                highlightedArtistIndex = index;
                renderArtistOptions();
            }
        )));
    };

    const renderSelectedArtist = (): void => {
        const artist = artists.find(candidate => candidate.id === selectedArtistId);
        selectedArtistElement.hidden = !artist;
        if (!artist) {
            selectedArtistElement.replaceChildren();
            return;
        }

        const image = document.createElement('img');
        image.src = assetPath(artist.portrait);
        image.alt = '';
        const label = document.createElement('span');
        label.textContent = artist.name;
        const identifier = document.createElement('small');
        identifier.textContent = artist.id;
        label.append(identifier);
        const clearButton = document.createElement('button');
        clearButton.type = 'button';
        clearButton.setAttribute('aria-label', `Clear ${artist.name}`);
        clearButton.textContent = '×';
        clearButton.addEventListener('click', clearArtist);
        selectedArtistElement.replaceChildren(image, label, clearButton);
    };

    function selectArtist(artist: ArtistRaw): void {
        selectedArtistId = artist.id;
        artistSearch.value = artist.id;
        setMessage(artistSearchError);
        artistMenuOpen = false;
        highlightedArtistIndex = 0;
        renderArtistOptions();
        renderSelectedArtist();
    }

    function clearArtist(): void {
        selectedArtistId = '';
        artistSearch.value = '';
        artistMenuOpen = false;
        highlightedArtistIndex = 0;
        setMessage(artistSearchError);
        renderArtistOptions();
        renderSelectedArtist();
    }

    const filteredCharacters = (): CharacterRaw[] => {
        const query = characterSearch.value.trim().toLocaleLowerCase();
        return characters
            .filter(character => !selectedCharacterIds.includes(character.id))
            .filter(character => (
                !query
                || character.id.toLocaleLowerCase().includes(query)
                || character.name.toLocaleLowerCase().includes(query)
                || character.short_name.toLocaleLowerCase().includes(query)
            ))
            .slice(0, 12);
    };

    const renderCharacterOptions = (): void => {
        const options = filteredCharacters();
        characterOptions.hidden = !characterMenuOpen;
        characterSearch.setAttribute('aria-expanded', String(characterMenuOpen));
        if (!characterMenuOpen) {
            characterSearch.removeAttribute('aria-activedescendant');
            return;
        }

        if (options.length === 0) {
            const empty = document.createElement('li');
            empty.className = 'no-options';
            empty.textContent = 'No matching characters';
            characterOptions.replaceChildren(empty);
            characterSearch.removeAttribute('aria-activedescendant');
            return;
        }

        highlightedCharacterIndex = Math.min(highlightedCharacterIndex, options.length - 1);
        characterSearch.setAttribute('aria-activedescendant', `character-option-${options[highlightedCharacterIndex].id}`);
        characterOptions.replaceChildren(...options.map((character, index) => makePickerOption(
            `character-option-${character.id}`,
            character.name,
            character.portrait,
            index === highlightedCharacterIndex,
            index === highlightedCharacterIndex,
            () => addCharacter(character),
            () => {
                highlightedCharacterIndex = index;
                renderCharacterOptions();
            }
        )));
    };

    const renderCharacterChips = (): void => {
        const selectedCharacters = selectedCharacterIds
            .map(id => characters.find(character => character.id === id))
            .filter((character): character is CharacterRaw => Boolean(character));
        characterChips.hidden = selectedCharacters.length === 0;
        characterChips.replaceChildren(...selectedCharacters.map(character => {
            const chip = document.createElement('span');
            chip.className = 'chip';
            const image = document.createElement('img');
            image.src = assetPath(character.portrait);
            image.alt = '';
            const label = document.createElement('span');
            label.textContent = `${character.name} (${character.id})`;
            const remove = document.createElement('button');
            remove.className = 'chip-remove';
            remove.type = 'button';
            remove.setAttribute('aria-label', `Remove ${character.name}`);
            remove.textContent = '×';
            remove.addEventListener('click', () => removeCharacter(character.id));
            chip.append(image, label, remove);
            return chip;
        }));
    };

    function addCharacter(character: CharacterRaw): void {
        if (selectedCharacterIds.includes(character.id)) return;
        selectedCharacterIds = [...selectedCharacterIds, character.id];
        characterSearch.value = '';
        setMessage(characterError);
        characterMenuOpen = false;
        highlightedCharacterIndex = 0;
        renderCharacterOptions();
        renderCharacterChips();
    }

    function removeCharacter(id: string): void {
        selectedCharacterIds = selectedCharacterIds.filter(characterId => characterId !== id);
        setMessage(characterError);
        renderCharacterOptions();
        renderCharacterChips();
    }

    const validationError = (form: PostEntryForm): string => {
        const redditValidation = validateRedditUrl(form.reddit, existingPostIds);
        if (redditValidation !== true) return redditValidation;
        if (!Number.isFinite(form.date) || form.date <= 0) return 'Enter a valid UNIX timestamp.';
        if (splitClean(form.urls).length === 0) return 'Add at least one image URL.';
        if (!form.src.trim()) return 'Source URL is required.';
        if (!form.desc.trim()) return 'Description is required.';
        if (!artistIds.has(form.artistId.trim())) return 'Choose an existing artist ID.';
        if (form.characterIds.length === 0) return 'Add at least one character tag.';
        return '';
    };

    const setRedditBusy = (busy: boolean): void => {
        isFetchingReddit = busy;
        redditInput.disabled = busy || isSubmittingPost;
        fetchRedditButton.disabled = busy || isSubmittingPost;
        fetchRedditButton.textContent = busy ? 'Loading…' : 'Fetch Reddit Data';
    };

    const applyRedditData = (data: RedditFormData): void => {
        redditInput.value = extractBaseRedditUrl(redditInput.value);
        if (data.createdDate) dateInput.value = String(data.createdDate);
        if (data.description) descriptionInput.value = data.description;
        if (data.imageUrls.length > 0) urlsInput.value = data.imageUrls.join(', ');
        renderPreviews();
    };

    const fetchRedditMetadata = async (): Promise<void> => {
        if (isFetchingReddit) return;
        setMessage(postError);
        setMessage(postStatus);
        const redditUrl = extractBaseRedditUrl(redditInput.value);
        if (!redditUrl) {
            setMessage(postError, 'Enter a valid Reddit post URL.');
            return;
        }

        setRedditBusy(true);
        setMessage(postStatus, 'Loading Reddit data…');
        try {
            const response = await fetch(`/api/reddit-data?url=${encodeURIComponent(redditUrl)}`);
            const result = await response.json() as ApiResult;
            if (!response.ok || !result.data) throw new Error(result.error || 'Failed to load Reddit data.');
            applyRedditData(result.data);
            setMessage(postStatus, 'Reddit data imported.');
        } catch (cause) {
            setMessage(postStatus);
            setMessage(postError, cause instanceof Error ? cause.message : 'Failed to load Reddit data.');
        } finally {
            setRedditBusy(false);
        }
    };

    const resetPostForm = (): void => {
        redditInput.value = '';
        dateInput.value = String(Date.now());
        urlsInput.value = '';
        sourceInput.value = '';
        descriptionInput.value = '';
        nsfwInput.checked = false;
        selectedArtistId = '';
        selectedCharacterIds = [];
        artistSearch.value = '';
        characterSearch.value = '';
        setMessage(artistSearchError);
        setMessage(characterError);
        renderPreviews();
        renderSelectedArtist();
        renderCharacterChips();
    };

    const submitPost = async (): Promise<void> => {
        const form = currentPostForm();
        const error = validationError(form);
        setMessage(postError, error);
        if (error) {
            setMessage(postStatus);
            return;
        }

        isSubmittingPost = true;
        submitPostButton.disabled = true;
        submitPostButton.textContent = 'Saving…';
        setRedditBusy(isFetchingReddit);
        setMessage(postStatus, 'Saving...');
        try {
            const entry = buildPostEntry(form, nsfwInput.checked);
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entry)
            });
            const result = await response.json() as ApiResult;
            if (!response.ok) throw new Error(result.error || 'Failed to add post.');
            const id = entry.reddit.split('/').at(-1);
            if (id) existingPostIds.add(id);
            resetPostForm();
            setMessage(postStatus, `Saved to ${result.file ?? 'the post data file'}.`);
            scrollToTop();
        } catch (cause) {
            setMessage(postStatus);
            setMessage(postError, cause instanceof Error ? cause.message : 'Failed to add post.');
        } finally {
            isSubmittingPost = false;
            submitPostButton.disabled = false;
            submitPostButton.textContent = 'Add Post';
            setRedditBusy(isFetchingReddit);
        }
    };

    const currentArtistForm = (): ArtistEntryForm => ({
        id: newArtistId.value,
        name: newArtistName.value,
        linkTwitter: newArtistTwitter.value,
        linkPixiv: newArtistPixiv.value
    });

    const setArtistFormBusy = (busy: boolean): void => {
        for (const input of [newArtistId, newArtistName, newArtistTwitter, newArtistPixiv]) input.disabled = busy;
        submitArtistButton.disabled = busy;
        submitArtistButton.textContent = busy ? 'Saving…' : 'Add Artist';
    };

    const submitArtist = async (): Promise<void> => {
        const form = currentArtistForm();
        const validation = validateArtistForm(form, artistIds);
        setMessage(artistError, validation);
        setMessage(artistStatus);
        if (validation) return;

        setArtistFormBusy(true);
        try {
            const entry = buildArtistEntry(form);
            const response = await fetch('/api/artists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entry)
            });
            const result = await response.json() as ApiResult;
            if (!response.ok) throw new Error(result.error || 'Failed to add artist.');
            artistIds.add(entry.id);
            artists = [...artists, entry].sort((left, right) => left.id.localeCompare(right.id));
            selectArtist(entry);
            newArtistId.value = '';
            newArtistName.value = '';
            newArtistTwitter.value = '';
            newArtistPixiv.value = '';
            setMessage(artistStatus, `Saved to ${result.file ?? 'data/artists.json'}.`);
            scrollToTop();
        } catch (cause) {
            setMessage(artistError, cause instanceof Error ? cause.message : 'Failed to add artist.');
        } finally {
            setArtistFormBusy(false);
        }
    };

    urlsInput.addEventListener('input', renderPreviews);
    redditInput.addEventListener('change', () => void fetchRedditMetadata());
    fetchRedditButton.addEventListener('click', () => void fetchRedditMetadata());
    postForm.addEventListener('submit', event => {
        event.preventDefault();
        void submitPost();
    });
    artistForm.addEventListener('submit', event => {
        event.preventDefault();
        void submitArtist();
    });

    artistSearch.addEventListener('focus', () => {
        artistMenuOpen = true;
        renderArtistOptions();
    });
    artistSearch.addEventListener('input', () => {
        selectedArtistId = '';
        highlightedArtistIndex = 0;
        artistMenuOpen = true;
        setMessage(artistSearchError);
        renderSelectedArtist();
        renderArtistOptions();
    });
    artistSearch.addEventListener('keydown', event => {
        const options = filteredArtists();
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            artistMenuOpen = true;
            highlightedArtistIndex = Math.min(highlightedArtistIndex + 1, Math.max(options.length - 1, 0));
            renderArtistOptions();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            highlightedArtistIndex = Math.max(highlightedArtistIndex - 1, 0);
            renderArtistOptions();
        } else if (event.key === 'Enter') {
            event.preventDefault();
            const artist = options[highlightedArtistIndex];
            if (artist) selectArtist(artist);
            else if (artistSearch.value.trim()) setMessage(artistSearchError, 'No matching artist found.');
        } else if (event.key === 'Escape') {
            artistMenuOpen = false;
            renderArtistOptions();
        }
    });
    artistPicker.addEventListener('focusout', event => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !artistPicker.contains(nextTarget)) {
            artistMenuOpen = false;
            renderArtistOptions();
        }
    });

    characterSearch.addEventListener('focus', () => {
        characterMenuOpen = true;
        renderCharacterOptions();
    });
    characterSearch.addEventListener('input', () => {
        highlightedCharacterIndex = 0;
        characterMenuOpen = true;
        setMessage(characterError);
        renderCharacterOptions();
    });
    characterSearch.addEventListener('keydown', event => {
        const options = filteredCharacters();
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            characterMenuOpen = true;
            highlightedCharacterIndex = Math.min(highlightedCharacterIndex + 1, Math.max(options.length - 1, 0));
            renderCharacterOptions();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            highlightedCharacterIndex = Math.max(highlightedCharacterIndex - 1, 0);
            renderCharacterOptions();
        } else if (event.key === 'Enter') {
            event.preventDefault();
            const character = options[highlightedCharacterIndex];
            if (character) addCharacter(character);
            else if (characterSearch.value.trim()) setMessage(characterError, 'No matching character found.');
        } else if (event.key === 'Escape') {
            characterMenuOpen = false;
            renderCharacterOptions();
        } else if (event.key === 'Backspace' && !characterSearch.value && selectedCharacterIds.length > 0) {
            removeCharacter(selectedCharacterIds.at(-1) ?? '');
        }
    });
    characterPicker.addEventListener('focusout', event => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !characterPicker.contains(nextTarget)) {
            characterMenuOpen = false;
            renderCharacterOptions();
        }
    });

    renderPreviews();
    renderSelectedArtist();
    renderCharacterChips();
}
