<script lang="ts">
    import artistsData from '../../../data/artists.json';
    import charactersData from '../../../data/characters.json';
    import postIndex from '../../../generated/post-index.json';
    import { SvelteSet } from 'svelte/reactivity';
    import type { ArtistRaw, CharacterRaw, PostEntryForm } from '../../types/data';
    import {
        buildPostEntry,
        extractBaseRedditUrl,
        splitClean,
        validateRedditUrl,
        type RedditFormData
    } from './postForm';
    import {
        buildArtistEntry,
        filterArtistOptions,
        validateArtistForm,
        type ArtistEntryForm
    } from './artistForm';

    let artists = $state<ArtistRaw[]>([...(artistsData as ArtistRaw[])]);
    const characterOptions = charactersData as CharacterRaw[];
    const artistIds = new SvelteSet((artistsData as ArtistRaw[]).map(artist => artist.id));
    const existingPostIds = new SvelteSet(Object.keys(postIndex));

    const emptyForm = (): PostEntryForm => ({
        date: Date.now(),
        reddit: '',
        urls: '',
        src: '',
        desc: '',
        artistId: '',
        characterIds: []
    });

    let form = $state<PostEntryForm>(emptyForm());
    let nsfw = $state(false);
    let status = $state('');
    let error = $state('');
    let isSubmitting = $state(false);
    let isFetchingReddit = $state(false);
    let artistQuery = $state('');
    let artistSearchError = $state('');
    let isArtistMenuOpen = $state(false);
    let highlightedArtistIndex = $state(0);
    let characterQuery = $state('');
    let characterError = $state('');
    let isCharacterMenuOpen = $state(false);
    let highlightedCharacterIndex = $state(0);
    let artistForm = $state<ArtistEntryForm>({
        id: '',
        name: '',
        linkTwitter: '',
        linkPixiv: ''
    });
    let artistStatus = $state('');
    let artistError = $state('');
    let isSubmittingArtist = $state(false);

    const imageUrls = $derived(splitClean(form.urls));
    const selectedCharacters = $derived(
        form.characterIds
            .map(id => characterOptions.find(character => character.id === id))
            .filter((character): character is CharacterRaw => Boolean(character))
    );
    const selectedArtist = $derived(
        artists.find(artist => artist.id === form.artistId)
    );
    const filteredArtists = $derived(filterArtistOptions(artists, artistQuery));
    const filteredCharacters = $derived.by(() => {
        const query = characterQuery.trim().toLocaleLowerCase();
        return characterOptions
            .filter(character => !form.characterIds.includes(character.id))
            .filter(character => (
                !query ||
                character.id.toLocaleLowerCase().includes(query) ||
                character.name.toLocaleLowerCase().includes(query) ||
                character.short_name.toLocaleLowerCase().includes(query)
            ))
            .slice(0, 12);
    });

    function validationError(): string {
        const redditValidation = validateRedditUrl(form.reddit, existingPostIds);
        if (redditValidation !== true) return redditValidation;
        if (!Number.isFinite(form.date) || form.date <= 0) return 'Enter a valid UNIX timestamp.';
        if (imageUrls.length === 0) return 'Add at least one image URL.';
        if (!form.src.trim()) return 'Source URL is required.';
        if (!form.desc.trim()) return 'Description is required.';
        if (!artistIds.has(form.artistId.trim())) return 'Choose an existing artist ID.';
        if (form.characterIds.length === 0) return 'Add at least one character tag.';
        return '';
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function selectArtistForPost(artist: ArtistRaw) {
        form.artistId = artist.id;
        artistQuery = artist.id;
        artistSearchError = '';
        isArtistMenuOpen = false;
        highlightedArtistIndex = 0;
    }

    function clearArtistForPost() {
        form.artistId = '';
        artistQuery = '';
        artistSearchError = '';
        isArtistMenuOpen = false;
        highlightedArtistIndex = 0;
    }

    function handleArtistKeydown(event: KeyboardEvent) {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            isArtistMenuOpen = true;
            highlightedArtistIndex = Math.min(
                highlightedArtistIndex + 1,
                Math.max(filteredArtists.length - 1, 0)
            );
            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            highlightedArtistIndex = Math.max(highlightedArtistIndex - 1, 0);
            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            const artist = filteredArtists[highlightedArtistIndex];
            if (artist) selectArtistForPost(artist);
            else if (artistQuery.trim()) artistSearchError = 'No matching artist found.';
            return;
        }

        if (event.key === 'Escape') {
            isArtistMenuOpen = false;
        }
    }

    function addCharacter(character: CharacterRaw) {
        if (form.characterIds.includes(character.id)) return;
        form.characterIds = [...form.characterIds, character.id];
        characterQuery = '';
        characterError = '';
        isCharacterMenuOpen = false;
        highlightedCharacterIndex = 0;
    }

    function removeCharacter(id: string) {
        form.characterIds = form.characterIds.filter(characterId => characterId !== id);
        characterError = '';
    }

    function handleCharacterKeydown(event: KeyboardEvent) {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            isCharacterMenuOpen = true;
            highlightedCharacterIndex = Math.min(
                highlightedCharacterIndex + 1,
                Math.max(filteredCharacters.length - 1, 0)
            );
            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            highlightedCharacterIndex = Math.max(highlightedCharacterIndex - 1, 0);
            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            const character = filteredCharacters[highlightedCharacterIndex];
            if (character) addCharacter(character);
            else if (characterQuery.trim()) characterError = 'No matching character found.';
            return;
        }

        if (event.key === 'Escape') {
            isCharacterMenuOpen = false;
            return;
        }

        if (event.key === 'Backspace' && !characterQuery && form.characterIds.length > 0) {
            removeCharacter(form.characterIds.at(-1) ?? '');
        }
    }

    function applyRedditData(data: RedditFormData) {
        form.reddit = extractBaseRedditUrl(form.reddit);
        if (data.createdDate) form.date = data.createdDate;
        if (data.description) form.desc = data.description;
        if (data.imageUrls.length > 0) form.urls = data.imageUrls.join(', ');
    }

    async function fetchRedditMetadata() {
        if (isFetchingReddit) return;
        error = '';
        status = '';
        const redditUrl = extractBaseRedditUrl(form.reddit);
        if (!redditUrl) {
            error = 'Enter a valid Reddit post URL.';
            return;
        }

        isFetchingReddit = true;
        status = 'Loading Reddit data…';
        try {
            const response = await fetch(`/api/reddit-data?url=${encodeURIComponent(redditUrl)}`);
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Failed to load Reddit data.');

            applyRedditData(result.data);
            status = 'Reddit data imported.';
        } catch (cause) {
            status = '';
            error = cause instanceof Error ? cause.message : 'Failed to load Reddit data.';
        } finally {
            isFetchingReddit = false;
        }
    }

    async function submitPost() {
        error = validationError();
        if (error) {
            status = '';
            return;
        }

        isSubmitting = true;
        status = 'Saving...';
        try {
            const entry = buildPostEntry(form, nsfw);
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entry)
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Failed to add post.');

            const id = entry.reddit.split('/').at(-1);
            if (id) existingPostIds.add(id);
            form = emptyForm();
            nsfw = false;
            artistQuery = '';
            artistSearchError = '';
            characterQuery = '';
            characterError = '';
            status = `Saved to ${result.file ?? 'the post data file'}.`;
            scrollToTop();
        } catch (cause) {
            status = '';
            error = cause instanceof Error ? cause.message : 'Failed to add post.';
        } finally {
            isSubmitting = false;
        }
    }

    async function submitArtist() {
        artistError = validateArtistForm(artistForm, artistIds);
        artistStatus = '';
        if (artistError) return;

        isSubmittingArtist = true;
        try {
            const entry = buildArtistEntry(artistForm);
            const response = await fetch('/api/artists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entry)
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Failed to add artist.');

            artistIds.add(entry.id);
            artists = [...artists, entry].sort((left, right) => left.id.localeCompare(right.id));
            selectArtistForPost(entry);
            artistForm = { id: '', name: '', linkTwitter: '', linkPixiv: '' };
            artistStatus = `Saved to ${result.file ?? 'data/artists.json'}.`;
            scrollToTop();
        } catch (cause) {
            artistError = cause instanceof Error ? cause.message : 'Failed to add artist.';
        } finally {
            isSubmittingArtist = false;
        }
    }
</script>

<svelte:head>
    <title>Admin | Touhou Translations</title>
</svelte:head>

<section class="root">
    <form
        novalidate
        onsubmit={event => {
            event.preventDefault();
            void submitPost();
        }}
    >
        <h1>Add Reddit Post</h1>
        <p class="intro">Fetch Reddit metadata, review the entry, then save it to the matching yearly data file.</p>
        <label>
            <span>Reddit URL</span>
            <input
                type="url"
                bind:value={form.reddit}
                placeholder="https://www.reddit.com/r/touhou/comments/..."
                disabled={isFetchingReddit || isSubmitting}
                onchange={() => {
                    void fetchRedditMetadata();
                }}
            />
        </label>
        <div class="reddit-actions">
            <button type="button" onclick={fetchRedditMetadata} disabled={isFetchingReddit || isSubmitting}>
                {isFetchingReddit ? 'Loading…' : 'Fetch Reddit Data'}
            </button>
        </div>
        <label>
            <span>UNIX timestamp (milliseconds)</span>
            <input type="number" bind:value={form.date} />
        </label>
        <label>
            <span>Image URLs (comma separated)</span>
            <textarea bind:value={form.urls}></textarea>
        </label>
        {#if imageUrls.length > 0}
            <div class="previews" aria-label="Image previews">
                {#each imageUrls as url, index (`${url}-${index}`)}
                    <figure>
                        <img src={url} alt={`Preview ${index + 1}`} />
                        <figcaption>Image {index + 1}</figcaption>
                    </figure>
                {/each}
            </div>
        {/if}
        <label>
            <span>Source URL</span>
            <input type="url" bind:value={form.src} />
        </label>
        <label>
            <span>Markdown description</span>
            <textarea bind:value={form.desc}></textarea>
        </label>
        <div class="artist-field">
            <label for="artist-search">Artist</label>
            <div
                class="artist-picker"
                onfocusout={event => {
                    const nextTarget = event.relatedTarget;
                    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
                        isArtistMenuOpen = false;
                    }
                }}
            >
                <input
                    id="artist-search"
                    type="search"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-controls="artist-options"
                    aria-expanded={isArtistMenuOpen}
                    aria-activedescendant={isArtistMenuOpen && filteredArtists.length > 0
                        ? `artist-option-${filteredArtists[highlightedArtistIndex]?.id}`
                        : undefined}
                    autocomplete="off"
                    placeholder="Type an artist name or ID"
                    bind:value={artistQuery}
                    onfocus={() => {
                        isArtistMenuOpen = true;
                    }}
                    oninput={() => {
                        form.artistId = '';
                        highlightedArtistIndex = 0;
                        isArtistMenuOpen = true;
                        artistSearchError = '';
                    }}
                    onkeydown={handleArtistKeydown}
                />
                {#if isArtistMenuOpen}
                    <ul id="artist-options" class="artist-options" role="listbox">
                        {#each filteredArtists as artist, index (artist.id)}
                            <li role="presentation">
                                <button
                                    id={`artist-option-${artist.id}`}
                                    class:highlighted={index === highlightedArtistIndex}
                                    type="button"
                                    role="option"
                                    aria-selected={artist.id === form.artistId}
                                    onclick={() => selectArtistForPost(artist)}
                                    onpointerenter={() => {
                                        highlightedArtistIndex = index;
                                    }}
                                >
                                    <img src={`/${artist.portrait}`} alt="" />
                                    <span>{artist.name}</span>
                                    <small>{artist.id}</small>
                                </button>
                            </li>
                        {:else}
                            <li class="no-options">No matching artists</li>
                        {/each}
                    </ul>
                {/if}
            </div>
            {#if selectedArtist}
                <div class="selected-artist">
                    <img src={`/${selectedArtist.portrait}`} alt="" />
                    <span>
                        {selectedArtist.name}
                        <small>{selectedArtist.id}</small>
                    </span>
                    <button
                        type="button"
                        aria-label={`Clear ${selectedArtist.name}`}
                        onclick={clearArtistForPost}
                    >×</button>
                </div>
            {/if}
            <small>Choose a suggestion or press Enter.</small>
            {#if artistSearchError}<small class="error">{artistSearchError}</small>{/if}
        </div>
        <div class="character-field">
            <label for="character-search">Character tags</label>
            <div
                class="character-picker"
                onfocusout={event => {
                    const nextTarget = event.relatedTarget;
                    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
                        isCharacterMenuOpen = false;
                    }
                }}
            >
                <input
                    id="character-search"
                    type="search"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-controls="character-options"
                    aria-expanded={isCharacterMenuOpen}
                    aria-activedescendant={isCharacterMenuOpen && filteredCharacters.length > 0
                        ? `character-option-${filteredCharacters[highlightedCharacterIndex]?.id}`
                        : undefined}
                    autocomplete="off"
                    placeholder="Type a character name or ID"
                    bind:value={characterQuery}
                    onfocus={() => {
                        isCharacterMenuOpen = true;
                    }}
                    oninput={() => {
                        highlightedCharacterIndex = 0;
                        isCharacterMenuOpen = true;
                        characterError = '';
                    }}
                    onkeydown={handleCharacterKeydown}
                />
                {#if isCharacterMenuOpen}
                    <ul id="character-options" class="character-options" role="listbox">
                        {#each filteredCharacters as character, index (character.id)}
                            <li role="presentation">
                                <button
                                    id={`character-option-${character.id}`}
                                    class:highlighted={index === highlightedCharacterIndex}
                                    type="button"
                                    role="option"
                                    aria-selected={index === highlightedCharacterIndex}
                                    onclick={() => addCharacter(character)}
                                    onpointerenter={() => {
                                        highlightedCharacterIndex = index;
                                    }}
                                >
                                    <img src={`/${character.portrait}`} alt="" />
                                    <span>{character.name}</span>
                                    <small>{character.id}</small>
                                </button>
                            </li>
                        {:else}
                            <li class="no-options">No matching characters</li>
                        {/each}
                    </ul>
                {/if}
            </div>
            <small>Choose a suggestion or press Enter. Backspace removes the last tag.</small>
            {#if characterError}<small class="error">{characterError}</small>{/if}
        </div>
        {#if selectedCharacters.length > 0}
            <div class="chips" aria-label="Selected characters">
                {#each selectedCharacters as character (character.id)}
                    <span class="chip">
                        <img src={`/${character.portrait}`} alt="" />
                        <span>{character.name} ({character.id})</span>
                        <button
                            class="chip-remove"
                            type="button"
                            aria-label={`Remove ${character.name}`}
                            onclick={() => removeCharacter(character.id)}
                        >×</button>
                    </span>
                {/each}
            </div>
        {/if}
        <label class="checkbox">
            <input type="checkbox" bind:checked={nsfw} />
            <span>Mark post as NSFW</span>
        </label>
        <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Add Post'}
        </button>
        {#if status}<p class="status" role="status">{status}</p>{/if}
        {#if error}<p class="error" role="alert">{error}</p>{/if}
    </form>

    <form
        class="artist-form"
        novalidate
        onsubmit={event => {
            event.preventDefault();
            void submitArtist();
        }}
    >
        <h1>Add Artist</h1>
        <p class="intro">
            Add an artist to the shared artist list. A random placeholder portrait will be assigned automatically.
        </p>
        <div class="artist-fields">
            <label>
                <span>Artist ID</span>
                <input
                    bind:value={artistForm.id}
                    autocomplete="off"
                    placeholder="lowercase_id"
                    disabled={isSubmittingArtist}
                />
                <small>Use lowercase letters, numbers, and underscores.</small>
            </label>
            <label>
                <span>Display name</span>
                <input bind:value={artistForm.name} autocomplete="off" disabled={isSubmittingArtist} />
            </label>
            <label>
                <span>X / Twitter URL</span>
                <input
                    type="url"
                    bind:value={artistForm.linkTwitter}
                    placeholder="https://x.com/username"
                    disabled={isSubmittingArtist}
                />
            </label>
            <label>
                <span>Pixiv URL</span>
                <input
                    type="url"
                    bind:value={artistForm.linkPixiv}
                    placeholder="https://www.pixiv.net/en/users/123456"
                    disabled={isSubmittingArtist}
                />
            </label>
        </div>
        <button type="submit" disabled={isSubmittingArtist}>
            {isSubmittingArtist ? 'Saving…' : 'Add Artist'}
        </button>
        {#if artistStatus}<p class="status" role="status">{artistStatus}</p>{/if}
        {#if artistError}<p class="error" role="alert">{artistError}</p>{/if}
    </form>
</section>

<style>
    .root {
        display: grid;
        gap: 1rem;
        width: min(760px, 100%);
        margin: 0 auto;
    }

    form {
        display: grid;
        gap: 0.9rem;
        padding: 1rem;
        text-align: left;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
    }

    h1 {
        margin: 0;
        color: var(--color-ink);
    }

    .intro,
    .status,
    .error {
        margin: 0;
    }

    .intro,
    .status,
    label small,
    .artist-field > small,
    .character-field > small {
        color: var(--color-muted);
    }

    .error {
        color: var(--color-primary);
        font-weight: 700;
    }

    label,
    .artist-field,
    .character-field {
        display: grid;
        gap: 0.35rem;
        color: var(--color-muted);
        font-weight: 700;
    }

    input,
    textarea {
        width: 100%;
        min-height: 42px;
        padding: 0.6rem 0.75rem;
        color: var(--color-ink);
        background: var(--color-surface);
        border: 1px solid var(--color-border-strong);
        border-radius: var(--radius-md);
    }

    textarea {
        min-height: 100px;
        resize: vertical;
    }

    button {
        min-height: 42px;
        padding: 0.6rem 1rem;
        color: var(--color-on-primary);
        font-weight: 800;
        cursor: pointer;
        background: var(--color-primary);
        border: 1px solid var(--color-primary);
        border-radius: var(--radius-md);
    }

    button:disabled {
        cursor: not-allowed;
        opacity: 0.55;
    }

    .reddit-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
    }

    .reddit-actions button {
        flex: 1 1 180px;
    }

    .previews {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 0.75rem;
    }

    figure {
        display: grid;
        gap: 0.35rem;
        margin: 0;
    }

    figure img {
        width: 100%;
        height: 160px;
        object-fit: cover;
        background: var(--color-bg-soft);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
    }

    figcaption {
        color: var(--color-muted);
        font-size: 0.8rem;
        font-weight: 700;
    }

    .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .chip {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.3rem 0.35rem 0.3rem 0.6rem;
        color: var(--color-text);
        font-weight: 700;
        background: var(--color-secondary-soft);
        border-radius: 999px;
    }

    .chips img {
        width: 28px;
        height: 28px;
        object-fit: cover;
        border-radius: var(--radius-sm);
    }

    .chip .chip-remove {
        width: 28px;
        min-height: 28px;
        padding: 0;
        color: var(--color-text);
        font-size: 1.15rem;
        line-height: 1;
        background: transparent;
        border: 0;
        border-radius: 999px;
    }

    .chip .chip-remove:hover {
        background: var(--color-surface);
    }

    .artist-picker,
    .character-picker {
        position: relative;
    }

    .artist-options,
    .character-options {
        position: absolute;
        z-index: 10;
        top: calc(100% + 0.25rem);
        right: 0;
        left: 0;
        max-height: 320px;
        padding: 0.3rem;
        margin: 0;
        overflow-y: auto;
        list-style: none;
        background: var(--color-surface);
        border: 1px solid var(--color-border-strong);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
    }

    .artist-options button,
    .character-options button {
        display: grid;
        grid-template-columns: 36px minmax(0, 1fr) auto;
        align-items: center;
        gap: 0.6rem;
        width: 100%;
        min-height: 44px;
        padding: 0.4rem 0.6rem;
        color: var(--color-text);
        text-align: left;
        background: transparent;
        border: 0;
    }

    .artist-options button:hover,
    .artist-options button.highlighted,
    .character-options button:hover,
    .character-options button.highlighted {
        background: var(--color-secondary-soft);
    }

    .artist-options img,
    .character-options img {
        width: 36px;
        height: 36px;
        object-fit: cover;
        border-radius: var(--radius-sm);
    }

    .artist-options small,
    .character-options small {
        color: var(--color-muted);
    }

    .selected-artist {
        display: grid;
        grid-template-columns: 36px minmax(0, 1fr) 28px;
        align-items: center;
        gap: 0.6rem;
        padding: 0.4rem 0.6rem;
        color: var(--color-text);
        background: var(--color-secondary-soft);
        border-radius: var(--radius-md);
    }

    .selected-artist img {
        width: 36px;
        height: 36px;
        object-fit: cover;
        border-radius: var(--radius-sm);
    }

    .selected-artist span {
        display: grid;
    }

    .selected-artist small {
        color: var(--color-muted);
    }

    .selected-artist button {
        width: 28px;
        min-height: 28px;
        padding: 0;
        color: var(--color-text);
        font-size: 1.15rem;
        line-height: 1;
        background: transparent;
        border: 0;
        border-radius: 999px;
    }

    .selected-artist button:hover {
        background: var(--color-surface);
    }

    .no-options {
        padding: 0.75rem;
        color: var(--color-muted);
        text-align: center;
    }

    .checkbox {
        display: flex;
        align-items: center;
        gap: 0.55rem;
    }

    .checkbox input {
        width: 18px;
        min-height: 18px;
    }

    .artist-fields {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.9rem;
    }

    @media (max-width: 600px) {
        .artist-fields {
            grid-template-columns: 1fr;
        }
    }
</style>
