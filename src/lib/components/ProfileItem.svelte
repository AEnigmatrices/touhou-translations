<script lang="ts">
    export let name: string;
    export let imageUrl: string;
    export let description1: string | undefined = undefined;
    export let description2: string | undefined = undefined;
    export let link: string | undefined = undefined;
    export let isSelectMode = false;
    export let isSelected = false;
    export let size: 'default' | 'large' = 'default';
    export let onToggleSelect: (() => void) | undefined = undefined;

    $: isLarge = size === 'large';
    $: isSelectable = Boolean(isSelectMode && onToggleSelect);
</script>

<li class:selected={isSelected} class:large={isLarge} aria-label={`Profile: ${name}`}>
    {#if link}
        <a class="box" href={link}>
            <div class:large-content={isLarge} class="content">
                <div class:large-image={isLarge} class="image-frame">
                    <img src={imageUrl} alt={name} loading="lazy" decoding="async" />
                </div>
                <div class:large-text={isLarge} class="text">
                    <p class:large-name={isLarge} class="name">{name}</p>
                    {#if description1}<p class="desc">{description1}</p>{/if}
                    {#if description2}<p class="desc">{description2}</p>{/if}
                </div>
            </div>
        </a>
    {:else if isSelectable}
        <button class="box" type="button" on:click={onToggleSelect}>
            <div class:large-content={isLarge} class="content">
                <div class:large-image={isLarge} class="image-frame">
                    <img src={imageUrl} alt={name} loading="lazy" decoding="async" />
                </div>
                <div class:large-text={isLarge} class="text">
                    <span class="checkbox-row">
                        <input type="checkbox" checked={isSelected} readonly aria-label={`Select ${name}`} />
                    </span>
                    <p class:large-name={isLarge} class="name">{name}</p>
                    {#if description1}<p class="desc">{description1}</p>{/if}
                    {#if description2}<p class="desc">{description2}</p>{/if}
                </div>
            </div>
        </button>
    {:else}
        <div class="box">
            <div class:large-content={isLarge} class="content">
                <div class:large-image={isLarge} class="image-frame">
                    <img src={imageUrl} alt={name} loading="lazy" decoding="async" />
                </div>
                <div class:large-text={isLarge} class="text">
                    <p class:large-name={isLarge} class="name">{name}</p>
                    {#if description1}<p class="desc">{description1}</p>{/if}
                    {#if description2}<p class="desc">{description2}</p>{/if}
                </div>
            </div>
        </div>
    {/if}
</li>

<style>
    li {
        overflow: hidden;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
    }

    li:hover {
        border-color: var(--color-border-strong);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
        transform: translateY(-2px);
    }

    li.large {
        height: 100%;
    }

    li.large:hover {
        transform: translateY(-3px);
    }

    li.selected {
        background: var(--color-secondary-soft);
        border-color: var(--color-secondary);
    }

    .box {
        display: block;
        width: 100%;
        height: 100%;
        padding: 0;
        color: inherit;
        font: inherit;
        text-align: left;
        text-decoration: none;
        background: transparent;
        border: 0;
    }

    a.box,
    button.box {
        cursor: pointer;
    }

    .content {
        display: grid;
        grid-template-columns: 84px minmax(0, 1fr);
        min-height: 116px;
        align-items: stretch;
        gap: 0.9rem;
        padding: 0.75rem;
    }

    .large-content {
        grid-template-columns: minmax(116px, 34%) minmax(0, 1fr);
        height: 100%;
        min-height: 150px;
        gap: 1rem;
    }

    .image-frame {
        aspect-ratio: 1;
        width: 100%;
        min-width: 0;
        overflow: hidden;
        background: var(--color-bg-soft);
        border: 1px solid var(--color-border);
        border-radius: calc(var(--radius-lg) - 4px);
    }

    .large-image {
        align-self: stretch;
        height: auto;
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .text {
        display: flex;
        min-width: 0;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        padding: 0.2rem 0.25rem 0.2rem 0;
    }

    .large-text {
        min-width: 0;
        width: 100%;
        text-align: left;
    }

    .checkbox-row {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 2px;
    }

    .name {
        overflow: hidden;
        margin: 0;
        color: var(--color-ink);
        font-size: 0.98rem;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .large-name {
        display: -webkit-box;
        overflow: hidden;
        font-size: 1.02rem;
        text-overflow: unset;
        white-space: normal;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
    }

    .desc {
        overflow: hidden;
        margin: 0.35rem 0 0;
        color: var(--color-muted);
        font-size: 0.82rem;
        line-height: 1.4;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .large-text .desc {
        font-size: 0.82rem;
        white-space: normal;
    }

    @media (max-width: 640px) {
        .content {
            grid-template-columns: 76px minmax(0, 1fr);
            min-height: 92px;
            padding: 0.75rem;
        }

        .large-content {
            grid-template-columns: 88px minmax(0, 1fr);
            min-height: 104px;
        }
    }
</style>
