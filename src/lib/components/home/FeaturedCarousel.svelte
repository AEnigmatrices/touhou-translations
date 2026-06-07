<script lang="ts">
    import { base } from '$app/paths';
    import emblaCarouselSvelte from 'embla-carousel-svelte';

    interface FeaturedPost {
        id: string;
        img: string;
    }

    interface Props {
        posts: FeaturedPost[];
    }

    interface EmblaApi {
        off: (event: 'select' | 'reInit', callback: () => void) => void;
        on: (event: 'select' | 'reInit', callback: () => void) => void;
        scrollSnapList: () => unknown[];
        scrollTo: (index: number) => void;
        selectedScrollSnap: () => number;
    }

    let { posts }: Props = $props();

    const carouselConfig = {
        options: {
            align: 'start' as const,
            containScroll: 'trimSnaps' as const,
            loop: true,
        },
        plugins: [],
    };

    let emblaApi = $state<EmblaApi | null>(null);
    let selectedSlide = $state(0);
    let slideCount = $state(0);
    let removeEmblaListeners: (() => void) | null = null;

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

<section class="card featured">
    <div class="section-head">
        <h1>Featured Posts</h1>
    </div>
    <div class="embla" use:emblaCarouselSvelte={carouselConfig} onemblaInit={handleEmblaInit}>
        <div class="embla-track">
            {#each posts as post}
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

<style>
    .featured {
        grid-column: 1 / -1;
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

    h1 {
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

    .thumb {
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

    @media (max-width: 900px) {
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
