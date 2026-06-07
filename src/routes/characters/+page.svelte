<script lang="ts">
    import ListPage from '$lib/components/ListPage.svelte';
    import type { Character } from '../../types/data';

    export let data: { characters: Character[] };
</script>

<ListPage mode="character" characters={data.characters} />
