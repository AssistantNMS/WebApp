import React from 'react';
import { Link } from 'react-router-dom';

import { catalogueItem } from '../../../constants/Route';
import { FishingData } from '../../../contracts/data/fishingData';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';
import { AppImage } from '../../../constants/AppImage';

export const FishingDataListTile = (props: FishingData) => (
  <Link to={`${catalogueItem}/${props.AppId}`} data-id="FishingDataListTile" className="gen-item-container" draggable={false}>
    <ImageContainer {...props} />
    <div className="gen-item-content-container fishing">
      <TextContainer text={props.Name} />
      <div className="quantity-container">
        {
          props.Biomes.map((b, index) => (
            <span key={`${b}-${index}`}>
              {(index != 0) && <span key={`${b}-comma`}>,&nbsp;</span>}
              <span>{b}</span>
            </span>
          ))
        }
      </div>
      <div className="action-container">
        <div className="action-list">
            <img src={`${AppImage.base}special/fishing-${props.Time}.svg`} className="dayNight" alt={props.TimeKey} />
        </div>
      </div>
    </div>
  </Link>
);
