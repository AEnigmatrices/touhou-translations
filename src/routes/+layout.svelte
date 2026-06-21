<script lang="ts">
    import { page } from '$app/state';
    import { resolve } from '$app/paths';
    import { goto } from '$app/navigation';
    import type { Snippet } from 'svelte';
    import { SITE_NAME } from '../utils/siteMetadata';
    import '../styles/global.css';

    let {
        children,
        data,
    }: {
        children: Snippet;
        data: { randomPostIds: string[] };
    } = $props();

    const links = [
        { label: 'Home', href: resolve('/'), routeId: '/' },
        { label: 'Characters', href: resolve('/characters'), routeId: '/characters' },
        { label: 'Artists', href: resolve('/artists'), routeId: '/artists' },
        { label: 'Gallery', href: resolve('/gallery'), routeId: '/gallery' },
    ];

    const socialLinks = [
        { label: 'Reddit', href: 'https://www.reddit.com/user/Aenigmatrix/' },
        { label: 'Twitter', href: 'https://twitter.com/AEnigmatrices' },
        { label: 'YouTube', href: 'https://www.youtube.com/@Aenigmatrices' },
        { label: 'Pixiv', href: 'https://www.pixiv.net/en/users/4920496' },
    ];

    function goToRandomPost() {
        if (data.randomPostIds.length === 0) return;

        const id = data.randomPostIds[Math.floor(Math.random() * data.randomPostIds.length)];
        void goto(resolve('/posts/[id]', { id }));
    }
</script>

<svelte:head>
    <link rel="preconnect" href="https://i.redd.it" />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">
        {"@context":"https://schema.org","@type":"WebSite","name":"Touhou Translations","alternateName":"Touhou TL","url":"https://aenigmatrices.github.io/touhou-translations/","description":"An archive of fan-translated Touhou Project comics and illustrations."}
    </script>
</svelte:head>

<div class="layout">
    <header class="app-bar">
        <nav class="toolbar" aria-label="Primary navigation">
            <a class="brand" href={resolve('/')}>Touhou Translations</a>
            <div class="tabs" aria-label="Navigation tabs">
                {#each links as link (link.href)}
                    <a
                        class:active={page.route.id === link.routeId}
                        aria-current={page.route.id === link.routeId ? 'page' : undefined}
                        href={link.href}
                    >
                        {link.label}
                    </a>
                {/each}
                <button
                    type="button"
                    class:active={page.route.id === '/posts/[id]'}
                    aria-current={page.route.id === '/posts/[id]' ? 'page' : undefined}
                    onclick={goToRandomPost}
                >
                    Post
                </button>
            </div>
        </nav>
    </header>

    <nav class="mobile-tabs" aria-label="Mobile navigation">
        {#each links as link (link.href)}
            <a
                class:active={page.route.id === link.routeId}
                aria-current={page.route.id === link.routeId ? 'page' : undefined}
                href={link.href}
            >
                {link.label}
            </a>
        {/each}
        <button
            type="button"
            class:active={page.route.id === '/posts/[id]'}
            aria-current={page.route.id === '/posts/[id]' ? 'page' : undefined}
            onclick={goToRandomPost}
        >
            Post
        </button>
    </nav>

    <main class="main">
        {@render children()}
    </main>

    <footer class="footer">
        <div class="footer-inner">
            <section>
                <h2>Touhou Translations</h2>
                <p>A fan-driven archive featuring English translations of Touhou illustrations and comics.</p>
                <p>
                    Character portraits by
                    <a href="https://www.pixiv.net/en/users/4920496" target="_blank" rel="noopener noreferrer">dairi</a>
                    and
                    <a href="https://www.nicovideo.jp/user/3494232" target="_blank" rel="noopener noreferrer">haruka</a>,
                    used under their stated permissions.
                </p>
            </section>
            <section class="project">
                <h2>Project</h2>
                <a href="https://github.com/AEnigmatrices/touhou-translations" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
                <a href="https://github.com/AEnigmatrices/touhou-translations/issues" target="_blank" rel="noopener noreferrer">Submit an Issue</a>
                <a href="https://touhou-project.news/guidelines_en/" target="_blank" rel="noopener noreferrer">Fan Content Guidelines</a>
            </section>
        </div>
        <div class="footer-bottom">
            <div class="socials">
                {#each socialLinks as link (link.href)}
                    <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>{link.label}</a>
                {/each}
            </div>
            <small>© Touhou Translations</small>
        </div>
    </footer>
</div>

<style>
    .layout {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }

    .app-bar {
        position: sticky;
        top: 0;
        z-index: 100;
        color: var(--color-ink);
        background: rgba(255, 255, 255, 0.86);
        border-bottom: 1px solid var(--color-border);
        box-shadow: var(--shadow-sm);
        backdrop-filter: blur(12px);
    }

    .toolbar {
        display: flex;
        min-height: 68px;
        width: min(1280px, 100%);
        align-items: center;
        justify-content: space-between;
        padding: 0 1.5rem;
        margin: 0 auto;
    }

    .brand {
        color: var(--color-ink);
        font-size: 1.12rem;
        font-weight: 800;
        text-decoration: none;
        white-space: nowrap;
    }

    .tabs {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.3rem;
        background: rgba(238, 242, 247, 0.72);
        border: 1px solid rgba(42, 55, 76, 0.08);
        border-radius: 999px;
    }

    .tabs a,
    .tabs button {
        display: inline-flex;
        min-height: 38px;
        align-items: center;
        padding: 0 0.95rem;
        color: var(--color-muted);
        font-size: 0.93rem;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
        background: transparent;
        border: 0;
        border-radius: 999px;
    }

    .tabs a:hover,
    .tabs button:hover,
    .tabs a.active,
    .tabs button.active {
        color: var(--color-primary);
        background: var(--color-surface);
        box-shadow: var(--shadow-sm);
    }

    .main {
        flex: 1;
        padding: var(--space-page);
    }

    .mobile-tabs {
        display: none;
    }

    .footer {
        margin-top: 4rem;
        padding: 2.5rem 1.5rem 5rem;
        color: var(--color-text);
        background: var(--color-surface);
        border-top: 1px solid var(--color-border);
    }

    .footer-inner {
        display: grid;
        width: min(1280px, 100%);
        grid-template-columns: minmax(0, 1fr) minmax(240px, 0.6fr);
        gap: 3rem;
        margin: 0 auto;
        text-align: left;
    }

    .footer h2 {
        margin: 0 0 0.75rem;
        color: var(--color-ink);
        font-size: 1.05rem;
    }

    .footer p {
        max-width: 68ch;
        margin: 0.5rem 0 0;
        color: var(--color-muted);
        font-size: 0.92rem;
    }

    .project {
        display: grid;
        justify-items: end;
        gap: 0.45rem;
        text-align: right;
    }

    .project a,
    .footer p a {
        color: var(--color-primary);
        font-weight: 700;
    }

    .footer-bottom {
        display: flex;
        width: min(1280px, 100%);
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding-top: 1.25rem;
        margin: 2rem auto 0;
        color: var(--color-muted);
        border-top: 1px solid var(--color-border);
    }

    .socials {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    .socials a {
        display: inline-flex;
        min-height: 36px;
        align-items: center;
        justify-content: center;
        padding: 0 0.75rem;
        color: var(--color-muted);
        font-size: 0.78rem;
        font-weight: 800;
        text-decoration: none;
        border: 1px solid var(--color-border);
        border-radius: 999px;
    }

    .socials a:hover {
        color: var(--color-primary);
        background: var(--color-primary-soft);
        border-color: var(--color-primary);
    }

    @media (max-width: 900px) {
        .main {
            padding: 0 0 4.75rem;
        }
    }

    @media (max-width: 700px) {
        .tabs {
            display: none;
        }

        .toolbar {
            justify-content: center;
            min-height: 56px;
            padding: 0 1rem;
        }

        .mobile-tabs {
            position: fixed;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 110;
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            padding: 0.35rem max(0.35rem, env(safe-area-inset-right)) max(0.35rem, env(safe-area-inset-bottom)) max(0.35rem, env(safe-area-inset-left));
            background: rgba(255, 255, 255, 0.94);
            border-top: 1px solid var(--color-border);
            box-shadow: 0 -3px 18px rgba(24, 33, 47, 0.12);
            backdrop-filter: blur(12px);
        }

        .mobile-tabs a,
        .mobile-tabs button {
            display: inline-flex;
            min-width: 0;
            min-height: 44px;
            align-items: center;
            justify-content: center;
            padding: 0.25rem;
            color: var(--color-muted);
            font-size: 0.72rem;
            font-weight: 750;
            text-decoration: none;
            cursor: pointer;
            background: transparent;
            border: 0;
            border-radius: var(--radius-md);
        }

        .mobile-tabs .active {
            color: var(--color-primary);
            background: var(--color-primary-soft);
        }

        .footer-inner {
            grid-template-columns: 1fr;
        }

        .project,
        .footer-bottom {
            justify-items: start;
            text-align: left;
        }

        .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
