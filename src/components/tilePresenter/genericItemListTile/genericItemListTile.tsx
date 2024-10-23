import * as React from 'react';
import { Link } from 'react-router-dom';

import { catalogueItem } from '../../../constants/Route';
import { GameItemModel } from '../../../contracts/GameItemModel';
import { removeTags } from '../../common/descriptionRegexHighlighter';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';

export const GenericItemListTile: React.FC<GameItemModel> = (props: GameItemModel) => (
  <Link to={`${catalogueItem}/${props.Id}`} data-id="GenericItemListTile" className="gen-item-container" draggable={false}>
    <ImageContainer {...props} />
    <div className="gen-item-content-container">
      <TextContainer text={removeTags(props.Name)} additionalCss="full" />
    </div>
  </Link>
);
