export const calculatePopoverPosition = (e: MouseEvent, offset: number, popoverSize: { width: number; height: number }) => {
    const x = (e.clientX + offset + popoverSize.width > window.innerWidth)
        ? e.clientX - offset - popoverSize.width
        : e.clientX + offset;

    const y = (e.clientY + offset + popoverSize.height > window.innerHeight)
        ? e.clientY - offset - popoverSize.height
        : e.clientY + offset;

    return { x, y };
}

export const formatArtworkDescription = (count?: number) => {
    if (typeof count !== 'number') return undefined;
    return `${count} artwork${count !== 1 ? 's' : ''}`;
}
