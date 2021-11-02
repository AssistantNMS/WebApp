export const roundDecimal = (orig: number, decimals: number = 2): string => {
    return orig.toFixed(decimals);
}