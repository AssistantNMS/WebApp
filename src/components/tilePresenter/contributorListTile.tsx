import * as React from 'react';

import { TextContainer } from '../common/tile/textContainer';
import { ImageContainer } from '../common/tile/imageContainer';
import { ContributorViewModel } from '../../contracts/generated/Model/Contributor/contributorViewModel';
import { DonationViewModel } from '../../contracts/generated/AssistantApps/ViewModel/donationViewModel';

export const ContributorListTile = (props: ContributorViewModel, index: number) => {
  const hasQuantity = props.description.length > 1;
  return (
    <a key={props.link + ' ' + index} href={props.link} data-id="ContributorListTile" className="gen-item-container" draggable={false}>
      <ImageContainer Name={props.name} Icon={props.imageUrl} IsExternal={true} />
      <div className="gen-item-content-container">
        <TextContainer text={props.name} additionalCss={hasQuantity ? '' : 'full'} />
        {hasQuantity && <div className="quantity-container">{props.description}</div>}
      </div>
    </a>
  );
};

export const DonatorListTile = (props: DonationViewModel, index: number) => {
  return (
    <div key={`${props.type}-${index}`} data-id="DonatorListTile" className="gen-item-container donation-tile" draggable={false}>
      <ImageContainer
        Name={props.type.toString()}
        Icon={`https://nmsassistant.com/assets/img/donation/${props.type.toString()}.png`}
        IsExternal={true}
      />
      <div className="gen-item-content-container">
        <TextContainer text={props.username} />
        <div className="quantity-container">{props.type}</div>
      </div>
    </div>
  );
};
