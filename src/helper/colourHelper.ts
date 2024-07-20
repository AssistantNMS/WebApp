export const invertColor = (hex: string, blackOrWhite: boolean = false) => {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  const rInt = parseInt(hex.slice(0, 2), 16),
    gInt = parseInt(hex.slice(2, 4), 16),
    bInt = parseInt(hex.slice(4, 6), 16);

  // invert color components
  const r = (255 - rInt).toString(16),
    g = (255 - gInt).toString(16),
    b = (255 - bInt).toString(16);

  if (blackOrWhite) {
    // https://stackoverflow.com/a/3943023/112731
    return rInt * 0.299 + gInt * 0.587 + bInt * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }

  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
};

export const padZero = (str: string, len?: number) => {
  const localLen = len || 2;
  const zeros = new Array(localLen).join('0');
  return (zeros + str).slice(-localLen);
};
