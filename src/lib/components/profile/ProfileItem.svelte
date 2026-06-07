<script lang="ts">
    import ProfileContent from './ProfileContent.svelte';

    interface Props {
        name: string;
        imageUrl: string;
        description1?: string;
        description2?: string;
        link?: string;
        isSelectMode?: boolean;
        isSelected?: boolean;
        size?: 'default' | 'large';
        onToggleSelect?: () => void;
    }

    let {
        name,
        imageUrl,
        description1 = undefined,
        description2 = undefined,
        link = undefined,
        isSelectMode = false,
        isSelected = false,
        size = 'default',
        onToggleSelect = undefined,
    }: Props = $props();

    const isLarge = $derived(size === 'large');
    const isSelectable = $derived(Boolean(isSelectMode && onToggleSelect));
</script>

<li class:selected={isSelected} class:large={isLarge} aria-label={`Profile: ${name}`}>
    {#if link}
        <a class="box" href={link}>
            <ProfileContent {name} {imageUrl} {description1} {description2} {isLarge} />
        </a>
    {:else if isSelectable}
        <button class="box" type="button" onclick={onToggleSelect}>
            <ProfileContent {name} {imageUrl} {description1} {description2} {isLarge} showCheckbox {isSelected} />
        </button>
    {:else}
        <div class="box">
            <ProfileContent {name} {imageUrl} {description1} {description2} {isLarge} />
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
</style>
