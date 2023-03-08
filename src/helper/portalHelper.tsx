import { AppImage } from "../constants/AppImage";

export const getPortalImageType = (useAltGlyph: boolean) => {
    let type: string = 'white';
    if (useAltGlyph) type = 'alt';
    return type;
};
export const getPortalImage = (type: string, portalImageCode: number) => `${AppImage.base()}portals/${type}/${portalImageCode.toString(16)}.png`;
export const getPortalEmptyImage = (type: string) => `${AppImage.base()}portals/${type}/dot.png`;

