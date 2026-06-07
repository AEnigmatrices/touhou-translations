<script lang="ts">
    import { base } from '$app/paths';

    export let data: {
        featuredPosts: { id: string; img: string; nsfw: boolean; date: number }[];
        dailyPostCandidates: { id: string; img: string; nsfw: boolean; date: number }[];
    };

    const day = Math.floor(Date.now() / 86_400_000);
    $: dailyPost = data.dailyPostCandidates.length
        ? data.dailyPostCandidates[day % data.dailyPostCandidates.length]
        : null;
</script>

<svelte:head>
    <title>Home | Touhou Translations</title>
</svelte:head>

<section class="container">
    <div class="grid">
        <section class="card featured">
            <h1>Featured Posts</h1>
            <div class="featured-grid">
                {#each data.featuredPosts as post}
                    <a class="thumb" href={`${base}/posts/${post.id}/`} aria-label={`View featured post ${post.id}`}>
                        <img src={post.img} alt="" loading="lazy" decoding="async" />
                    </a>
                {/each}
            </div>
        </section>

        <div class="stack">
            <section class="card about">
                <div class="about-head">
                    <img src={`${base}/icons/touhou-translations-profile-icon.png`} alt="Touhou Translations profile icon" />
                    <h2>About This Site</h2>
                </div>
                <p>
                    This website is a personal archive and viewer for Touhou Project fan comics and illustrations
                    that I have translated into English and posted on
                    <a href="https://www.reddit.com/r/touhou/" target="_blank" rel="noopener noreferrer">r/touhou</a>.
                </p>
                <p>Honestly, I just want a convenient way to browse the artworks that I have already translated.</p>
            </section>

            <section class="card video">
                <h2>Featured Video</h2>
                <div class="video-frame">
                    <iframe
                        src="https://www.youtube-nocookie.com/embed/Gfev_ZEBRNk"
                        title="Featured Video"
                        allowfullscreen
                    ></iframe>
                </div>
            </section>
        </div>

        <section class="card daily">
            <h2>Post of the Day</h2>
            {#if dailyPost}
                <a class="daily-link" href={`${base}/posts/${dailyPost.id}/`}>
                    <img src={dailyPost.img} alt="Post of the day" loading="lazy" decoding="async" />
                </a>
            {/if}
        </section>
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

    .featured {
        grid-column: 1 / -1;
    }

    .stack {
        display: grid;
        gap: 1rem;
    }

    .card {
        overflow: hidden;
        padding: 1.1rem;
        text-align: left;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
    }

    h1,
    h2 {
        margin: 0 0 0.85rem;
        color: var(--color-ink);
        font-size: 1.1rem;
    }

    .featured-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 0.75rem;
    }

    .thumb,
    .daily-link {
        display: block;
        overflow: hidden;
        aspect-ratio: 1;
        background: var(--color-bg-soft);
        border-radius: var(--radius-md);
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .about-head {
        display: flex;
        align-items: center;
        gap: 0.85rem;
    }

    .about-head img {
        width: 52px;
        height: 52px;
        border-radius: 999px;
    }

    p {
        margin: 0.6rem 0 0;
        color: var(--color-muted);
    }

    p a {
        color: var(--color-primary);
        font-weight: 700;
    }

    .video-frame {
        overflow: hidden;
        aspect-ratio: 16 / 9;
        background: #000;
        border-radius: var(--radius-md);
    }

    iframe {
        width: 100%;
        height: 100%;
        border: 0;
    }

    .daily-link {
        aspect-ratio: 4 / 5;
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
