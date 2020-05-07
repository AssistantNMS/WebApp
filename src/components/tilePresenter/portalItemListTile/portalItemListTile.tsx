
import * as React from 'react';

import { PortalRecord } from '../../../contracts/portal/portalRecord';
import { PortalGlyphGridDisplay } from '../../common/portal/portalGlyphGrid';

import { TextContainer } from '../../common/tile/textContainer';

export const PortalCardListTile = (props: PortalRecord) => {
    const displayTags = () => {
        if (!props.Tags || props.Tags.length < 1) return null;
        return (
            <div className="row justify" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                {
                    props.Tags.map((item, index) => {
                        return <span key={`portalTage: ${item}-${index}`} className="default chip">{item}</span>
                    })
                }
            </div>
        );
    };

    /* <Link to={`${guides}/${props.Uuid}`} className="portal item card">
    </Link> */
    return (
        <div className="portal item card">
            <PortalGlyphGridDisplay
                codes={props.Codes || []}
                columnMultiplier={2}
                isDark={true}
                useAltGlyph={false}
            />
            <TextContainer text={props.Name} additionalCss="title" />
            {displayTags()}
        </div>
    );
}
