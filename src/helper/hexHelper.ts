export const intArrayToHex = (currentCodes: Array<number>): string => {
    let hexCodes = '';
    for (var code of currentCodes) {
        hexCodes += code.toString(16);
    }
    return hexCodes;
};