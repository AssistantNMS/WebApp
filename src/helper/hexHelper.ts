export const intArrayToHex = (currentCodes: Array<number>): string => {
  let hexCodes = '';
  for (const code of currentCodes) {
    hexCodes += code.toString(16);
  }
  return hexCodes;
};
