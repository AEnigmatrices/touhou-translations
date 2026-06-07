<script lang="ts">
    interface Props {
        name: string;
        imageUrl: string;
        description1?: string;
        description2?: string;
        isLarge: boolean;
        showCheckbox?: boolean;
        isSelected?: boolean;
    }

    let {
        name,
        imageUrl,
        description1 = undefined,
        description2 = undefined,
        isLarge,
        showCheckbox = false,
        isSelected = false,
    }: Props = $props();
</script>

<div class:large-content={isLarge} class="content">
    <div class:large-image={isLarge} class="image-frame">
        <img src={imageUrl} alt={name} loading="lazy" decoding="async" />
    </div>
    <div class:large-text={isLarge} class="text">
        {#if showCheckbox}
            <span class="checkbox-row">
                <input type="checkbox" checked={isSelected} readonly aria-label={`Select ${name}`} />
            </span>
        {/if}
        <p class:large-name={isLarge} class="name">{name}</p>
        {#if description1}<p class="desc">{description1}</p>{/if}
        {#if description2}<p class="desc">{description2}</p>{/if}
    </div>
</div>

<style>
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
