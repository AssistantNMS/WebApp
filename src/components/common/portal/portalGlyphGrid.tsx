import React from 'react';
import { columnMultiplierHelper } from '../../../helper/columnHelper';

interface IProps {
    isDark: boolean;
    useAltGlyph: boolean;
}

interface IPortalGlyphGridDisplayProps extends IProps {
    codes: Array<number>;
    columnMultiplier?: number
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

    const columnDefs = {
        multiplier: props.columnMultiplier ?? 1,
        base: 2,
        xl: 1,
        lg: 1,
        md: 2,
        sm: 2,
        xs: 2,
    };

    return (
        <div className="row full justify p1">
            {portalImages.map((image: string, index: number) => (
                <div key={image + index} draggable={false} className={columnMultiplierHelper(columnDefs)} >
                    <img src={image} style={{ maxWidth: '100%' }} alt={image} />
                </div>
            ))}
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
        <div className="row full justify p1">
            {portalImages.map((image: string, index: number) => (
                <div key={image + index} draggable={false} onClick={safeClick(index)} className="col-3 col-xl-1 col-lg-2 col-md-3 col-sm-3 col-xs-3">
                    <img src={image} style={{ maxWidth: '100%' }} alt={image} />
                </div>
            ))}
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

