<script lang="ts">
    import ListPage from '$lib/components/ListPage.svelte';
    import type { Artist } from '../../types/data';

    let { data }: { data: { artists: Artist[] } } = $props();
</script>

<ListPage mode="artist" artists={data.artists} />
