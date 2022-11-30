import React from 'react';
import { columnMultiplierHelper } from '../../../helper/columnHelper';
import { getPortalEmptyImage, getPortalImage, getPortalImageType } from '../../../helper/portalHelper';

interface IProps {
    useAltGlyphs: boolean;
}

interface IPortalGlyphGridDisplayProps extends IProps {
    codes: Array<number>;
    columnMultiplier?: number
}

export const PortalGlyphGridDisplay: React.FC<IPortalGlyphGridDisplayProps> = (props: IPortalGlyphGridDisplayProps) => {
    const type = getPortalImageType(props.useAltGlyphs);
    const portalImages: Array<any> = [];
    for (let displayIndex = 0; displayIndex < 12; displayIndex++) {
        if (props.codes.length <= displayIndex) {
            portalImages.push({
                url: getPortalEmptyImage(type),
                code: '',
            });
        }
        if (props.codes.length > displayIndex) {
            const code = props.codes[displayIndex];
            portalImages.push({
                url: getPortalImage(type, code),
                code: code.toString(16).toUpperCase(),
            });
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
            {portalImages.map((imageObj: any, index: number) => (
                <div key={imageObj.url + index} draggable={false} className={columnMultiplierHelper(columnDefs)} >
                    <img src={imageObj.url} style={{ width: '100%' }} draggable={false} alt={imageObj.code} />
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
