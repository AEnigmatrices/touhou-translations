<script lang="ts">
    let showFeaturedVideo = $state(false);
</script>

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

<style>
    .card {
        overflow: hidden;
        padding: 1.1rem;
        text-align: left;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
    }

    h2 {
        margin: 0 0 0.85rem;
        color: var(--color-ink);
        font-size: 1.1rem;
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
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
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
</style>
