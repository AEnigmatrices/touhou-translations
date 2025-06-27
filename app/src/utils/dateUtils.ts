export const hashDateToIndex = (dateStr: string, max: number): number => {
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        hash = (hash << 5) - hash + dateStr.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash) % max;
};
