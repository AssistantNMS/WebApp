export const getPortalImageType = (useAltGlyph: boolean) => {
  let type: string = 'white';
  if (useAltGlyph) type = 'alt';
  return type;
};
export const getPortalImage = (type: string, portalImageCode: number) => `/assets/images/portals/${type}/${portalImageCode.toString(16)}.png`;
export const getPortalEmptyImage = (type: string) => `/assets/images/portals/${type}/dot.png`;
