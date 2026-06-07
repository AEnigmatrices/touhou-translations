<script lang="ts">
    import { asset } from '$app/paths';
    import ProfileItem from '../profile/ProfileItem.svelte';
    import type { Artist, Character } from '../../../types/data';

    interface Props {
        items: Array<Character | Artist>;
        mode: 'character' | 'artist';
        isSelectMode: boolean;
        selectedItems: string[];
        onToggleItem: (id: string) => void;
        selectedGalleryUrl: (id: string) => string;
    }

    let { items, mode, isSelectMode, selectedItems, onToggleItem, selectedGalleryUrl }: Props = $props();
</script>

<ul class="grid">
    {#each items as item (item.id)}
        <ProfileItem
            name={item.name}
            imageUrl={asset(`/${item.portrait}`)}
            description1={`${item.artworkCount} artwork${item.artworkCount === 1 ? '' : 's'}`}
            description2={mode === 'character'
                ? `${(item as Character).artistCount} artist${(item as Character).artistCount === 1 ? '' : 's'}`
                : `${(item as Artist).characterCount} character${(item as Artist).characterCount === 1 ? '' : 's'}`}
            link={isSelectMode ? undefined : selectedGalleryUrl(item.id)}
            isSelectMode={isSelectMode}
            isSelected={selectedItems.includes(item.id)}
            onToggleSelect={() => onToggleItem(item.id)}
            size="large"
        />
    {/each}
</ul>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1.4rem;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    @media (min-width: 1280px) {
        .grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
    }

    @media (max-width: 640px) {
        .grid {
            grid-template-columns: 1fr;
            gap: 0.85rem;
        }
    }
</style>
