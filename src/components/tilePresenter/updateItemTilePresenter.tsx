import * as React from 'react';
import { Link } from 'react-router-dom';

import { MajorUpdateItem } from '../../contracts/data/majorUpdateItem';
import { ImageContainer } from '../common/tile/imageContainer';
import { TextContainer } from '../common/tile/textContainer';
import { newItemsAddedDetails, newItemsAddedParam } from '../../constants/Route';
import { ActionContainer } from '../common/tile/actionContainer';
import { formatDate } from '../../helper/dateHelper';

interface IProps extends MajorUpdateItem {}

export const UpdateItemCardListTile: React.FC<IProps> = (props: IProps) => {
  return (
    <Link key={props.guid} to={`${newItemsAddedDetails.replaceAll(newItemsAddedParam, props.guid)}`} className="update item card" draggable={false}>
      <ImageContainer Icon={props.icon} Name={props.title} Colour="" />
      <TextContainer text={props.title} additionalCss="title" />
      <div className="row justify" style={{ paddingLeft: '1em', paddingRight: '1em' }}></div>
    </Link>
  );
};

export const UpdateItemListTile: React.FC<IProps> = (props: IProps) => {
  return (
    <Link
      key={props.guid}
      to={`${newItemsAddedDetails.replaceAll(newItemsAddedParam, props.guid)}`}
      className="gen-item-container noselect"
      draggable={false}
    >
      <ImageContainer Name={props.title} Icon={props.icon.replaceAll('.png', '-icon.png')} />
      <div className="gen-item-content-container" data-id="UpdateItemListTile">
        <TextContainer text={props.title} />
        <div className="quantity-container">{formatDate(props.releaseDate, 'YYYY-MM-DD')}</div>
        <ActionContainer
          actions={[
            <div key={`${props.guid}-emoji`} className="max-w-150" style={{ fontSize: '2em' }}>
              {props.emoji}
            </div>,
          ]}
        />
      </div>
    </Link>
  );
};
