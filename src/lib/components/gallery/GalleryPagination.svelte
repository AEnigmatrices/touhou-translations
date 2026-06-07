<script lang="ts">
    type JumpItem = 'ellipsis-start' | 'ellipsis-end';
    type PaginationItem = number | JumpItem;

    interface Props {
        currentPage: number;
        totalPages: number;
        paginationItems: PaginationItem[];
        openJump: JumpItem | null;
        jumpPage: string;
        onPageChange: (page: number) => void;
        onOpenJumpInput: (item: JumpItem) => void;
        onJumpPageInput: (value: string) => void;
        onJumpPageBlur: () => void;
        onJumpSubmit: () => void;
        onCloseJump: () => void;
    }

    let {
        currentPage,
        totalPages,
        paginationItems,
        openJump,
        jumpPage,
        onPageChange,
        onOpenJumpInput,
        onJumpPageInput,
        onJumpPageBlur,
        onJumpSubmit,
        onCloseJump,
    }: Props = $props();
</script>

<nav class="pagination" aria-label="Gallery pages">
    <button type="button" disabled={currentPage === 1} onclick={() => onPageChange(currentPage - 1)}>Previous</button>
    {#each paginationItems as item}
        {#if typeof item === 'number'}
            <button
                type="button"
                class:active={item === currentPage}
                aria-current={item === currentPage ? 'page' : undefined}
                onclick={() => onPageChange(item)}
            >
                {item}
            </button>
        {:else}
            {#if openJump === item}
                <form class="jump-form" onsubmit={event => {
                    event.preventDefault();
                    onJumpSubmit();
                }}>
                    <input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={jumpPage}
                        aria-label={`Jump to page between 1 and ${totalPages}`}
                        oninput={event => onJumpPageInput(event.currentTarget.value)}
                        onblur={onJumpPageBlur}
                        onkeydown={event => {
                            if (event.key === 'Escape') onCloseJump();
                        }}
                    />
                    <button type="submit">Go</button>
                </form>
            {:else}
                <button class="ellipsis" type="button" onclick={() => onOpenJumpInput(item)} aria-label={`Jump to page between 1 and ${totalPages}`}>
                    ...
                </button>
            {/if}
        {/if}
    {/each}
    <button type="button" disabled={currentPage === totalPages} onclick={() => onPageChange(currentPage + 1)}>Next</button>
</nav>

<style>
    .pagination {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 0.35rem;
        margin-top: 1.25rem;
    }

    button {
        min-height: 38px;
        padding: 0 0.8rem;
        color: var(--color-muted);
        cursor: pointer;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
    }

    button.active {
        color: var(--color-primary);
        background: var(--color-primary-soft);
        border-color: rgba(180, 35, 59, 0.24);
    }

    button:disabled {
        color: var(--color-faint);
        cursor: not-allowed;
        background: var(--color-bg-soft);
    }

    .pagination button {
        min-width: 42px;
    }

    .ellipsis {
        display: inline-flex;
        min-width: 28px;
        height: 38px;
        align-items: center;
        justify-content: center;
        color: var(--color-muted);
        font-weight: 700;
    }

    .jump-form {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
    }

    .jump-form input {
        width: 84px;
        height: 38px;
        padding: 0 0.55rem;
        color: var(--color-ink);
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
    }

    .jump-form button {
        min-width: 42px;
    }
</style>
