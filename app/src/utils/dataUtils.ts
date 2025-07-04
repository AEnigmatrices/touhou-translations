export function normalizeCommas(input: string): string {
    return input
        .split(',')
        .map(value => value.trim())
        .filter(value => value.length > 0)
        .join(', ');
}