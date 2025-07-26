type Param<T> = { queryKey: string[]; queryFn: () => Promise<T>; };

const staleTime = 1000 * 60 * 60 * 24;
const retry = 2;
const retryDelay = (attempt: number) => Math.min(1000 * 2 ** attempt, 3000);

export const createSuspenseQueryOptions = <T>({ queryKey, queryFn }: Param<T>) => (
    { queryKey, queryFn, staleTime, retry, retryDelay, suspense: true, useErrorBoundary: true }
);