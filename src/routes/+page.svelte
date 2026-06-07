<script lang="ts">
    import { base } from '$app/paths';
    import emblaCarouselSvelte from 'embla-carousel-svelte';

    interface Props {
        data: {
            featuredPosts: { id: string; img: string; nsfw: boolean; date: number }[];
            dailyPostCandidates: { id: string; img: string; nsfw: boolean; date: number }[];
        };
    }

    interface EmblaApi {
        off: (event: 'select' | 'reInit', callback: () => void) => void;
        on: (event: 'select' | 'reInit', callback: () => void) => void;
        scrollNext: () => void;
        scrollPrev: () => void;
        scrollSnapList: () => unknown[];
        scrollTo: (index: number) => void;
        selectedScrollSnap: () => number;
    }

    let { data }: Props = $props();

    const day = Math.floor(Date.now() / 86_400_000);
    const carouselConfig = {
        options: {
            align: 'start' as const,
            containScroll: 'trimSnaps' as const,
            loop: true,
        },
        plugins: [],
    };

    let showFeaturedVideo = $state(false);
    let emblaApi = $state<EmblaApi | null>(null);
    let selectedSlide = $state(0);
    let slideCount = $state(0);
    let removeEmblaListeners: (() => void) | null = null;

    const dailyPost = $derived(data.dailyPostCandidates.length
        ? data.dailyPostCandidates[day % data.dailyPostCandidates.length]
        : null);

    function syncCarouselState(api = emblaApi) {
        if (!api) return;

        selectedSlide = api.selectedScrollSnap();
        slideCount = api.scrollSnapList().length;
    }

    function handleEmblaInit(event: CustomEvent<EmblaApi>) {
        removeEmblaListeners?.();
        emblaApi = event.detail;

        const sync = () => syncCarouselState(event.detail);
        event.detail.on('select', sync);
        event.detail.on('reInit', sync);
        removeEmblaListeners = () => {
            event.detail.off('select', sync);
            event.detail.off('reInit', sync);
        };
        sync();
    }

    $effect(() => () => {
        removeEmblaListeners?.();
    });
</script>

<svelte:head>
    <title>Home | Touhou Translations</title>
</svelte:head>

<section class="container">
    <div class="grid">
        <section class="card featured">
            <div class="section-head">
                <h1>Featured Posts</h1>
            </div>
            <div class="embla" use:emblaCarouselSvelte={carouselConfig} onemblaInit={handleEmblaInit}>
                <div class="embla-track">
                    {#each data.featuredPosts as post}
                        <div class="embla-slide">
                            <a class="thumb" href={`${base}/posts/${post.id}/`} aria-label={`View featured post ${post.id}`}>
                                <img src={post.img} alt="" loading="lazy" decoding="async" />
                            </a>
                        </div>
                    {/each}
                </div>
            </div>
            {#if slideCount > 1}
                <div class="carousel-dots" aria-label="Featured post pages">
                    {#each Array.from({ length: slideCount }, (_, index) => index) as index}
                        <button
                            type="button"
                            class:active={index === selectedSlide}
                            aria-label={`Show featured post page ${index + 1}`}
                            aria-current={index === selectedSlide ? 'true' : undefined}
                            onclick={() => emblaApi?.scrollTo(index)}
                        ></button>
                    {/each}
                </div>
            {/if}
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
                    {#if showFeaturedVideo}
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/Gfev_ZEBRNk?autoplay=1"
                            title="Featured Video"
                            allow="autoplay; encrypted-media; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>
                    {:else}
                        <button class="video-poster" type="button" onclick={() => showFeaturedVideo = true} aria-label="Play featured video">
                            <img src="https://i.ytimg.com/vi/Gfev_ZEBRNk/hqdefault.jpg" alt="" loading="lazy" decoding="async" />
                            <span class="play" aria-hidden="true"></span>
                        </button>
                    {/if}
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

    .section-head h1 {
        margin-bottom: 0.85rem;
    }

    .embla {
        overflow: hidden;
    }

    .embla-track {
        display: flex;
        margin-left: -0.75rem;
        touch-action: pan-y pinch-zoom;
    }

    .embla-slide {
        min-width: 0;
        flex: 0 0 18%;
        padding-left: 0.75rem;
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

    .carousel-dots {
        display: flex;
        justify-content: center;
        gap: 0.35rem;
        margin-top: 0.85rem;
    }

    .carousel-dots button {
        width: 9px;
        height: 9px;
        padding: 0;
        cursor: pointer;
        background: var(--color-border-strong);
        border: 0;
        border-radius: 999px;
    }

    .carousel-dots button.active {
        width: 24px;
        background: var(--color-primary);
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

    .video-poster {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        padding: 0;
        overflow: hidden;
        cursor: pointer;
        background: #111827;
        border: 0;
    }

    .video-poster::after {
        position: absolute;
        inset: 0;
        content: "";
        background: linear-gradient(180deg, rgba(17, 24, 39, 0.1), rgba(17, 24, 39, 0.45));
    }

    .video-poster img {
        transition: transform 0.2s ease;
    }

    .video-poster:hover img {
        transform: scale(1.03);
    }

    .play {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        width: 68px;
        height: 48px;
        background: rgba(180, 35, 59, 0.92);
        border-radius: 14px;
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
        transform: translate(-50%, -50%);
    }

    .play::before {
        position: absolute;
        top: 50%;
        left: 52%;
        width: 0;
        height: 0;
        content: "";
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 16px solid white;
        transform: translate(-50%, -50%);
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

        .embla-slide {
            flex-basis: 28%;
        }
    }

    @media (max-width: 560px) {
        .embla-slide {
            flex-basis: 48%;
        }
    }
</style>
