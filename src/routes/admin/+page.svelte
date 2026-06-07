<script lang="ts">
    import artists from '../../../data/artists.json';
    import type { ArtistRaw, PostEntryForm } from '../../types/data';

    let form: PostEntryForm = {
        date: Date.now(),
        reddit: '',
        urls: '',
        src: '',
        desc: '',
        artistId: '',
        characterIds: [],
    };
    let characters = '';
    let status = '';

    function splitClean(input: string) {
        return input.split(',').map(item => item.trim()).filter(Boolean);
    }

    async function submitPost() {
        status = 'Saving...';
        const entry = {
            date: form.date,
            reddit: form.reddit,
            url: splitClean(form.urls),
            src: form.src,
            desc: form.desc,
            artistId: form.artistId,
            characterIds: splitClean(characters),
            nsfw: false,
        };

        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry),
        });

        status = response.ok ? 'Saved.' : 'Save failed.';
    }
</script>

<svelte:head>
    <title>Admin | Touhou Translations</title>
</svelte:head>

<section class="root">
    <form on:submit|preventDefault={submitPost}>
        <h1>Add Post</h1>
        <label>
            <span>Date</span>
            <input type="number" bind:value={form.date} />
        </label>
        <label>
            <span>Reddit URL</span>
            <input bind:value={form.reddit} />
        </label>
        <label>
            <span>Image URLs</span>
            <textarea bind:value={form.urls}></textarea>
        </label>
        <label>
            <span>Source</span>
            <input bind:value={form.src} />
        </label>
        <label>
            <span>Description</span>
            <textarea bind:value={form.desc}></textarea>
        </label>
        <label>
            <span>Artist ID</span>
            <input list="artists" bind:value={form.artistId} />
            <datalist id="artists">
                {#each artists as artist}
                    <option value={(artist as ArtistRaw).id}>{(artist as ArtistRaw).name}</option>
                {/each}
            </datalist>
        </label>
        <label>
            <span>Character IDs</span>
            <input bind:value={characters} />
        </label>
        <button type="submit">Save Post</button>
        {#if status}<p>{status}</p>{/if}
    </form>
</section>

<style>
    .root {
        display: grid;
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

    label {
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
        border: 1px solid var(--color-border-strong);
        border-radius: var(--radius-md);
    }

    textarea {
        min-height: 100px;
        resize: vertical;
    }

    button {
        min-height: 42px;
        color: var(--color-on-primary);
        font-weight: 800;
        cursor: pointer;
        background: var(--color-primary);
        border: 1px solid var(--color-primary);
        border-radius: var(--radius-md);
    }
</style>
