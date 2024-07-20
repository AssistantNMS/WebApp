export interface PortalRecord {
  Uuid: string;
  Date: string;
  Name: string;
  Codes: Array<number>;
  Tags: Array<string>;
}

export const compareCodes = (codes: Array<number>, current: Array<number>) => {
  let isEqual = true;
  for (let codeIndex = 0; codeIndex < codes.length; codeIndex++) {
    if (codes[codeIndex] !== current[codeIndex]) {
      isEqual = false;
      break;
    }
  }
  return isEqual;
};
