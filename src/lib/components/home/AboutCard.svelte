<script lang="ts">
    import { base } from '$app/paths';
</script>

<section class="card about">
    <div class="about-head">
        <img src={`${base}/icons/touhou-translations-profile-icon.png`} alt="Touhou Translations profile icon" />
        <h2>About This Site</h2>
    </div>
    <p>
        This website is a personal archive and viewer for Touhou Project fan comics and illustrations that I have
        translated into English and posted on
        <a href="https://www.reddit.com/r/touhou/" target="_blank" rel="noopener noreferrer">r/touhou</a>.
    </p>
    <p>Honestly, I just want a convenient way to browse the artworks that I have already translated.</p>
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
</style>
