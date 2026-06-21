<script lang="ts">
    import AboutCard from '$lib/components/home/AboutCard.svelte';
    import DailyPost from '$lib/components/home/DailyPost.svelte';
    import FeaturedVideo from '$lib/components/home/FeaturedVideo.svelte';
    import { absoluteSiteUrl, DEFAULT_DESCRIPTION, SITE_NAME } from '../utils/siteMetadata';

    interface Props {
        data: {
            dailyPostCandidates: { id: string; img: string; nsfw: boolean; date: number }[];
        };
    }

    let { data }: Props = $props();

    const day = Math.floor(Date.now() / 86_400_000);

    const dailyPost = $derived(data.dailyPostCandidates.length
        ? data.dailyPostCandidates[day % data.dailyPostCandidates.length]
        : null);
</script>

<svelte:head>
    <title>Home | Touhou Translations</title>
    <meta name="description" content={DEFAULT_DESCRIPTION} />
    <link rel="canonical" href={absoluteSiteUrl()} />
    <meta property="og:title" content={SITE_NAME} />
    <meta property="og:description" content={DEFAULT_DESCRIPTION} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={absoluteSiteUrl()} />
    <meta property="og:image" content={absoluteSiteUrl('icons/touhou-translations-profile-icon.png')} />
</svelte:head>

<section class="container">
    <div class="grid">
        <div class="stack">
            <AboutCard />
            <FeaturedVideo />
        </div>

        <DailyPost post={dailyPost} />
    </div>
</section>

<style>
    .container {
        width: min(1280px, 100%);
        padding: 0.25rem 0 1rem;
        margin: 0 auto;
    }

    .grid {
        display: grid;
        grid-template-columns: minmax(0, 7fr) minmax(280px, 5fr);
        gap: 1.25rem;
    }

    .stack {
        display: grid;
        gap: 1rem;
    }

    @media (max-width: 900px) {
        .container {
            padding: 1rem;
        }

        .grid {
            grid-template-columns: 1fr;
        }
    }
</style>
