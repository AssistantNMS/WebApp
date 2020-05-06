import React from 'react';

interface IProps {
    isDark: boolean;
    useAltGlyph: boolean;
}

interface IPortalGlyphGridDisplayProps extends IProps {
    codes: Array<number>;
}

export const PortalGlyphGridDisplay: React.FC<IPortalGlyphGridDisplayProps> = (props: IPortalGlyphGridDisplayProps) => {
    const type = getPortalImageType(props.isDark, props.useAltGlyph);
    const portalImages: Array<string> = [];
    for (let displayIndex = 0; displayIndex < 12; displayIndex++) {
        if (props.codes.length <= displayIndex) {
            portalImages.push(getPortalEmptyImage(type));
        }
        if (props.codes.length > displayIndex) {
            const code = props.codes[displayIndex];
            portalImages.push(getPortalImage(type, code));
        }
    }

    return (
        <div className="row full justify pt1">
            {portalImages.map((item: string, index: number) => getPortalImageComponent(item, index))}
        </div>
    );
}

interface IPortalGlyphGridProps extends IProps {
    onPortalClick?: (portalCode: number) => void;
}

export const PortalGlyphKeypadGrid: React.FC<IPortalGlyphGridProps> = (props: IPortalGlyphGridProps) => {
    const type = getPortalImageType(props.isDark, props.useAltGlyph);
    const portalImages: Array<string> = [];
    for (let portalIndex = 0; portalIndex < 16; portalIndex++) {
        portalImages.push(getPortalImage(type, portalIndex));
    }

    const safeClick = (portalCode: number) => () => {
        if (props.onPortalClick) props.onPortalClick(portalCode);
    }

    return (
        <div className="row full justify pt1">
            {portalImages.map((item: string, index: number) => getPortalImageComponent(item, index, safeClick(index)))}
        </div>
    );
}

const getPortalImageType = (isDark: boolean, useAltGlyph: boolean) => {
    let type: string = 'black';
    if (isDark) type = 'white';
    if (useAltGlyph) type = 'alt';
    return type;
};
const getPortalImage = (type: string, portalImageCode: number) => `assets/images/portals/${type}/${portalImageCode.toString(16)}.png`;
const getPortalEmptyImage = (type: string) => `assets/images/portals/${type}/dot.png`;
const getPortalImageComponent = (image: string, index: number, onClick?: any) => (
    <div key={image + index} onClick={onClick} className="col-4 col-xl-1 col-lg-2 col-md-2 col-sm-3 col-xs-4">
        <img src={image} style={{ maxWidth: '100%' }} alt={image} />
    </div>
);
