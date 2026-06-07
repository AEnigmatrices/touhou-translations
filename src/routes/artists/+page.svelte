<script lang="ts">
    import ListPage from '$lib/components/ListPage.svelte';
    import type { Artist } from '../../types/data';

    export let data: { artists: Artist[] };
</script>

<ListPage mode="artist" artists={data.artists} />
