import * as React from 'react';

import { PatreonViewModel } from '../../contracts/generated/AssistantApps/ViewModel/patreonViewModel';
import { LazyLoadImage } from '../core/lazyLoadImage/lazyLoadImage';
import { TextContainer } from '../common/tile/textContainer';

export const patronListTile = (props: PatreonViewModel) => (
  <div className="gen-item-container" draggable={false}>
    <div className="image-container lazy-loaded-full-width">
      <LazyLoadImage src={props.imageUrl} alt={props.name} draggable={false} />
    </div>
    <div className="gen-item-content-container">
      <TextContainer text={props.name} additionalCss="full" />
    </div>
  </div>
);
