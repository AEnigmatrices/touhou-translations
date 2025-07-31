import { useEffect, useRef, useState } from 'react';

interface Props { totalItems: number; chunkSize?: number; }

const useInfiniteScroll = ({ totalItems, chunkSize = 12 }: Props) => {

    const loaderRef = useRef<HTMLDivElement | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const isLoadingRef = useRef(false);

    const [visibleCount, setVisibleCount] = useState(chunkSize);

    useEffect(() => {
        if (!loaderRef.current) return;

        observerRef.current = new IntersectionObserver(
            entries => {
                if (
                    entries[0].isIntersecting &&
                    !isLoadingRef.current &&
                    visibleCount < totalItems
                ) {
                    isLoadingRef.current = true;
                    setVisibleCount(prev => prev + chunkSize);
                }
            },
            { rootMargin: '200px' }
        );

        const currentObserver = observerRef.current;
        currentObserver.observe(loaderRef.current);

        return () => currentObserver.disconnect();
    }, [visibleCount, totalItems, chunkSize]);

    useEffect(() => {
        isLoadingRef.current = false;
    }, [visibleCount]);

    return { loaderRef, visibleCount, setVisibleCount };
};

export default useInfiniteScroll;