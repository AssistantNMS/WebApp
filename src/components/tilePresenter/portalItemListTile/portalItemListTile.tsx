import * as React from 'react';

import { PortalRecord } from '../../../contracts/portal/portalRecord';
import { PortalGlyphGridDisplay } from '../../common/portal/portalGlyphGrid';
import { intArrayToHex } from '../../../helper/hexHelper';

import { TextContainer } from '../../common/tile/textContainer';
import { ActionContainer } from '../../common/tile/actionContainer';

interface IProps extends PortalRecord {
  useAltGlyphs: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const PortalCardListTile: React.FC<IProps> = (props: IProps) => {
  const displayTags = () => {
    if (!props.Tags || props.Tags.length < 1) return null;
    return (
      <div className="row justify" style={{ paddingTop: '1em', paddingLeft: '1em', paddingRight: '1em' }}>
        {props.Tags.map((item, index) => {
          return (
            <span key={`portalTage: ${item}-${index}`} className="secondary chip">
              {item}
            </span>
          );
        })}
      </div>
    );
  };

  const actions = [];
  if (props.onEdit != null) {
    actions.push(
      <li key="edit">
        <i onClick={props.onEdit} className="material-icons">
          edit
        </i>
      </li>,
    );
  }
  if (props.onDelete != null) {
    actions.push(
      <li key="delete">
        <i onClick={props.onDelete} className="material-icons">
          delete
        </i>
      </li>,
    );
  }

  const hexString = intArrayToHex(props.Codes).toUpperCase();
  const nmsPortalsUrl = `http://nmsportals.github.io/#${hexString}`;

  return (
    <div className="portal item card" draggable={false}>
      <PortalGlyphGridDisplay codes={props.Codes || []} columnMultiplier={2} useAltGlyphs={props.useAltGlyphs} />
      <TextContainer text={props.Name} additionalCss="title" />
      <div className="row justify" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
        <a className="default chip" href={nmsPortalsUrl} target="_blank" rel="noopener noreferrer">
          nmsportals.github.io&nbsp;
          <i className="material-icons">open_in_new</i>
        </a>
      </div>
      <ActionContainer actions={actions} />
      {displayTags()}
    </div>
  );
};
