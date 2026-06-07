<script lang="ts">
    import ListPage from '$lib/components/ListPage.svelte';
    import type { Character } from '../../types/data';

    let { data }: { data: { characters: Character[] } } = $props();
</script>

<ListPage mode="character" characters={data.characters} />
