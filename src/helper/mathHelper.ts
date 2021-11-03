export const roundDecimal = (orig: number, decimals: number = 2): string => {
    return orig.toFixed(decimals);
}

export const roundDecimalNum = (orig: number, decimals: number = 2): number => {
    const power = Math.pow(10, 2);
    return (Math.round(orig * power)) / power;
}