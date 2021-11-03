import React from 'react';
import { columnMultiplierHelper } from '../../../helper/columnHelper';

interface IProps {
    useAltGlyphs: boolean;
}

interface IPortalGlyphGridDisplayProps extends IProps {
    codes: Array<number>;
    columnMultiplier?: number
}

export const PortalGlyphGridDisplay: React.FC<IPortalGlyphGridDisplayProps> = (props: IPortalGlyphGridDisplayProps) => {
    const type = getPortalImageType(props.useAltGlyphs);
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
        base: 1,
        xl: 1,
        lg: 1,
        md: 1,
        sm: 1,
        xs: 2,
    };

    return (
        <div className="row full justify p1 glyphgrid">
            {portalImages.map((image: string, index: number) => (
                <div key={image + index} draggable={false} className={columnMultiplierHelper(columnDefs)} >
                    <img src={image} style={{ width: '100%' }} className="noselect" draggable={false} alt={image} />
                </div>
            ))}
        </div>
    );
}

interface IPortalGlyphGridProps extends IProps {
    onPortalClick?: (portalCode: number) => void;
}

export const PortalGlyphKeypadGrid: React.FC<IPortalGlyphGridProps> = (props: IPortalGlyphGridProps) => {
    const type = getPortalImageType(props.useAltGlyphs);
    const portalImages: Array<string> = [];
    for (let portalIndex = 0; portalIndex < 16; portalIndex++) {
        portalImages.push(getPortalImage(type, portalIndex));
    }

    const safeClick = (portalCode: number) => () => {
        if (props.onPortalClick) props.onPortalClick(portalCode);
    }

    return (
        <div className="row full justify p1" draggable={false}>
            {portalImages.map((image: string, index: number) => (
                <div key={image + index} draggable={false} onClick={safeClick(index)} className="col-3 col-xl-1 col-lg-1 col-md-3 col-sm-3 col-xs-3">
                    <img src={image} style={{ width: '100%' }} className="noselect" draggable={false} alt={image} />
                </div>
            ))}
        </div>
    );
}

const getPortalImageType = (useAltGlyph: boolean) => {
    let type: string = 'white';
    if (useAltGlyph) type = 'alt';
    return type;
};
const getPortalImage = (type: string, portalImageCode: number) => `/assets/images/portals/${type}/${portalImageCode.toString(16)}.png`;
const getPortalEmptyImage = (type: string) => `/assets/images/portals/${type}/dot.png`;

