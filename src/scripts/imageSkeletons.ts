/**
 * Keep placeholders in sync with both prerendered and dynamically replaced images.
 * Without JavaScript the original images remain visible (no persistent skeleton).
 */
const skeletonSelector = '[data-image-skeleton]';

const updateImageSkeleton = (frame: HTMLElement): void => {
    const image = frame.querySelector('img');
    if (!image) {
        delete frame.dataset.imageState;
        return;
    }

    frame.dataset.imageState = image.complete
        ? image.naturalWidth > 0 ? 'ready' : 'error'
        : 'loading';
};

const frameForImage = (image: HTMLImageElement): HTMLElement | null =>
    image.closest<HTMLElement>(skeletonSelector);

const scanImageSkeletons = (node: Node): void => {
    if (!(node instanceof Element)) return;

    if (node.matches(skeletonSelector)) updateImageSkeleton(node as HTMLElement);
    for (const frame of node.querySelectorAll<HTMLElement>(skeletonSelector)) {
        updateImageSkeleton(frame);
    }
};

const initializeImageSkeletons = (): void => {
    if (!document.body) return;

    // Image load/error events do not bubble, so listen in the capture phase.
    document.addEventListener('load', event => {
        if (!(event.target instanceof HTMLImageElement)) return;
        const frame = frameForImage(event.target);
        if (frame) updateImageSkeleton(frame);
    }, true);

    document.addEventListener('error', event => {
        if (!(event.target instanceof HTMLImageElement)) return;
        const frame = frameForImage(event.target);
        if (frame) updateImageSkeleton(frame);
    }, true);

    scanImageSkeletons(document.body);

    const observer = new MutationObserver(records => {
        for (const record of records) {
            if (record.type === 'attributes' && record.target instanceof HTMLImageElement) {
                const frame = frameForImage(record.target);
                if (frame) updateImageSkeleton(frame);
                continue;
            }

            for (const node of record.addedNodes) scanImageSkeletons(node);

            // Removing a poster image (e.g. when the user plays a video) must
            // clear its loading placeholder even if the image never finished.
            if (record.target instanceof Element) {
                const frame = record.target.closest<HTMLElement>(skeletonSelector);
                if (frame) updateImageSkeleton(frame);
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'srcset']
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeImageSkeletons, { once: true });
} else {
    initializeImageSkeletons();
}
