import { useCallback, useRef } from 'react';


export const useDebouncedValidation = (
    validateFn: (value: string) => Promise<string | void>, onError: (message: string) => void,
    onClear: () => void, delay = 500
) => {
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    return useCallback((value: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            const errorMsg = await validateFn(value.trim());
            if (typeof errorMsg === 'string' && errorMsg.length > 0) {
                onError(errorMsg);
            } else {
                onClear();
            }
        }, delay);
    }, [validateFn, onError, onClear, delay]);
};