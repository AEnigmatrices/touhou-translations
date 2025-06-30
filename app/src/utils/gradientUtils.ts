export const getGradient = (hue: number, saturation: number, lightness: number): string => {
    const hue2 = (hue + 20) % 360;
    return `linear-gradient(135deg, hsl(${hue}, ${saturation}%, ${lightness}%), hsl(${hue2}, ${saturation}%, ${lightness}%))`;
}