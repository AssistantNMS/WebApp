export const roundDecimal = (orig: number, decimals: number = 2): string => {
    return orig.toFixed(decimals);
}

export const roundDecimalNum = (orig: number, decimals: number = 2): number => {
    const power = Math.pow(10, decimals);
    return (Math.round(orig * power)) / power;
}

export const shouldListBeCentered = (orig: number): boolean => {
    if (orig == 2) return true;
    return (orig % 3) === 1;
}