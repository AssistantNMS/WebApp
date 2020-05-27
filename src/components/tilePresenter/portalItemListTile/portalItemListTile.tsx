
import * as React from 'react';

import { PortalRecord } from '../../../contracts/portal/portalRecord';
import { PortalGlyphGridDisplay } from '../../common/portal/portalGlyphGrid';
import { intArrayToHex } from '../../../helper/hexHelper';

import { TextContainer } from '../../common/tile/textContainer';
import { ActionContainer } from '../../common/tile/actionContainer';

interface IProps extends PortalRecord {
    isDark: boolean;
    useAltGlyphs: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const PortalCardListTile = (props: IProps) => {
    const displayTags = () => {
        if (!props.Tags || props.Tags.length < 1) return null;
        return (
            <div className="row justify" style={{ paddingTop: '1em', paddingLeft: '1em', paddingRight: '1em' }}>
                {
                    props.Tags.map((item, index) => {
                        return <span key={`portalTage: ${item}-${index}`} className="secondary chip">{item}</span>
                    })
                }
            </div>
        );
    };

    let actions = [];
    if (props.onEdit != null) {
        actions.push(<li><i key="edit" onClick={props.onEdit} className="material-icons">edit</i></li>)
    }
    if (props.onDelete != null) {
        actions.push(<li><i key="delete" onClick={props.onDelete} className="material-icons">delete</i></li>);
    }

    const hexString = intArrayToHex(props.Codes).toUpperCase();
    const nmsPortalsUrl = `http://nmsportals.github.io/#${hexString}`;

    return (
        <div className="portal item card">
            <PortalGlyphGridDisplay
                codes={props.Codes || []}
                columnMultiplier={2}
                isDark={props.isDark}
                useAltGlyphs={props.useAltGlyphs}
            />
            <TextContainer text={props.Name} additionalCss="title" />
            <div className="row justify" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                <a className="default chip" href={nmsPortalsUrl} target="_blank" rel="noopener noreferrer">
                    nmsportals.github.io&nbsp;<i className="material-icons">open_in_new</i>
                </a>
            </div>
            <ActionContainer actions={actions} />
            {displayTags()}
        </div>
    );
}
