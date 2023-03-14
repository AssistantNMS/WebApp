import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { adScriptId, adScriptUrl } from '../../constants/Overwolf';
import { addScriptToHead, removeScriptFromHead } from '../../helper/documentHelper';

declare global {
    interface Window {
        OwAd?: any;
    }
}

export enum OwAdSize {
    Square, // 400 x 300
    Rectangle, // 400 x 600
    SmallSquare, // 300 x 250
    VerticalRectangle, // 160 x 600
    LongRectangle, // 728 x 90
}

export interface IProps {
    containerId?: string;
    size: OwAdSize;
}

export const AdContainer: React.FC<IProps> = (props: IProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const sizeLookup = {
        [OwAdSize.Square]: { width: 400, height: 300 },
        [OwAdSize.Rectangle]: { width: 400, height: 600 },
        [OwAdSize.SmallSquare]: { width: 300, height: 250 },
        [OwAdSize.VerticalRectangle]: { width: 160, height: 600 },
        [OwAdSize.LongRectangle]: { width: 728, height: 90 },
    };

    useEffect(() => {
        addScriptToHead(adScriptId, adScriptUrl, () => {
            if (typeof window.OwAd === 'undefined' || containerRef.current === null) {
                return;
            }
            new window.OwAd(containerRef.current, { size: sizeLookup[props.size] });
        });

        return () => {
            removeScriptFromHead(adScriptId);
        };
    }, []);

    return (
        <aside
            className={classNames('ad-container', props.containerId)}
            style={sizeLookup[props.size]}
        >
            <div className="ad-text">
                Ads support the development of this app.
                <br />
                Become a Patreon supporter to deactivate ads 💗.
            </div>
            <div ref={containerRef} className="ad-div-ref" />
        </aside>
    );
}