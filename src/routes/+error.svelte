<script lang="ts">
    import { page } from '$app/stores';
</script>

<main class="root">
    <h1>{$page.status === 404 ? 'Page not found.' : 'Something went wrong.'}</h1>
</main>

<style>
    .root {
        display: grid;
        min-height: 45vh;
        place-items: center;
        text-align: center;
    }

    h1 {
        color: var(--color-ink);
    }
</style>
