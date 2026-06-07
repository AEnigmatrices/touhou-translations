<div class="root" aria-label="Loading" role="status">
    <span class="spinner"></span>
</div>

<style>
    .root {
        display: grid;
        width: 100%;
        height: 100%;
        min-height: 48px;
        place-items: center;
    }

    .spinner {
        width: 28px;
        height: 28px;
        border: 3px solid rgba(180, 35, 59, 0.16);
        border-top-color: var(--color-primary);
        border-radius: 999px;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>
