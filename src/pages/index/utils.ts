export const hashDateToIndex = (dateStr: string, max: number): number => {
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        hash = (hash * 31 + dateStr.charCodeAt(i)) % max;
    }
    return Math.abs(hash) % max;
};