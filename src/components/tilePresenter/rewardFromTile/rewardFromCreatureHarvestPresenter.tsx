import React from 'react';
import { AppImage } from '../../../constants/AppImage';
import { CreatureHarvest } from '../../../contracts/data/creatureHarvest';
import { LocaleKey } from '../../../localization/LocaleKey';
import { translate } from '../../../localization/Translate';
import { ActionContainer } from '../../common/tile/actionContainer';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';
import { BasicLink } from '../../core/link';

interface IProps {
  creatureHarvest: CreatureHarvest;
}

export const RewardFromCreatureHarvestTile: React.FC<IProps> = (props: IProps) => {
  const hasWikiLink = props.creatureHarvest.WikiLink != null && props.creatureHarvest.WikiLink.length > 0;

  let wikiLinkInDescrip = false;
  let descriptionIsEmpty = false;
  let description = props.creatureHarvest.Description;
  if (description != null && description.length > 0) {
    const localeKey = props.creatureHarvest.HarvestType === 0 ? LocaleKey.creatureHarvestKill : LocaleKey.creatureHarvestHarvest;
    description = translate(localeKey);
  } else if (hasWikiLink) {
    wikiLinkInDescrip = true;
  } else {
    descriptionIsEmpty = true;
  }

  const displayLinkOnTheRightHandside = hasWikiLink && wikiLinkInDescrip === false;
  const displayTextFull = hasWikiLink === false && descriptionIsEmpty === true;

  const content = (
    <>
      <ImageContainer Name="creatureHarvest" Icon={props.creatureHarvest.HarvestType === 0 ? AppImage.creatureKill : AppImage.creatureHarvest} />
      <div className="gen-item-content-container" data-id="RewardFromCreatureHarvestTile">
        <TextContainer text={props.creatureHarvest.CreatureType} additionalCss={displayTextFull ? 'full' : ''} />
        {displayTextFull ? (
          <></>
        ) : (
          <>
            {wikiLinkInDescrip === true ? (
              <div className="quantity-container">
                {translate(LocaleKey.viewMoreOnNmsWiki)}&nbsp;
                <i className="material-icons">open_in_new</i>
              </div>
            ) : (
              <div className="quantity-container">{description}</div>
            )}
          </>
        )}
        <ActionContainer
          actions={
            displayLinkOnTheRightHandside
              ? [
                  <div key="viewMoreOnNmsWiki" className="max-w-150">
                    {translate(LocaleKey.viewMoreOnNmsWiki)}
                    <br />
                    <i className="material-icons">open_in_new</i>
                  </div>,
                ]
              : []
          }
        />
      </div>
    </>
  );

  if (hasWikiLink) {
    return (
      <BasicLink
        key={`creature-harvest-${props.creatureHarvest.ItemId}`}
        additionalClassNames="gen-item-container"
        href={hasWikiLink ? props.creatureHarvest.WikiLink : '#'}
      >
        {content}
      </BasicLink>
    );
  }

  return (
    <div data-id="RewardFromCreatureHarvestTile" key={`creature-harvest-${props.creatureHarvest.ItemId}`} className="gen-item-container">
      {content}
    </div>
  );
};
