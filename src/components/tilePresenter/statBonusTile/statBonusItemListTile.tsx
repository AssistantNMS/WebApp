import * as React from 'react';
import { translate } from '../../../localization/Translate';
import { ProceduralStatBonus } from '../../../contracts/ProceduralStatBonus';
import { StatBonus } from '../../../contracts/StatBonus';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';

const StatBonusItemListTileClass: React.FC<StatBonus> = (props: StatBonus) => {
  let subTitle = props.Value?.toString() ?? '';
  if (props.LocaleKeyTemplate !== 'defaultTemplate') {
    subTitle = translate(props.LocaleKeyTemplate).replace('{0}', subTitle);
  }
  return (
    <div data-id="StatBonusItemListTile" className="gen-item-container" draggable={false}>
      <div className="smol-image-container">
        <ImageContainer Name={props.Name} Icon={`stats/${props.Image}.png`} />
      </div>
      <div className="gen-item-content-container">
        <TextContainer text={props.Name} />
        <div className="quantity-container">{subTitle}</div>
      </div>
    </div>
  );
};

export const StatBonusItemListTile = (props: StatBonus): JSX.Element => <StatBonusItemListTileClass {...props} />;

const ProceduralStatBonusItemListTileClass: React.FC<ProceduralStatBonus> = (props: ProceduralStatBonus) => {
  let subTitle = props.MinValue + ' => ' + props.MaxValue;
  if (props.MinValue === props.MaxValue) {
    subTitle = props.MinValue;
  }
  
  if (props.LocaleKeyTemplate !== 'defaultTemplate') {
    if (props.MinValue === props.MaxValue) {
      subTitle = translate(props.LocaleKeyTemplate).replace('{0}', props.MinValue.toString());
    } else {
      subTitle =
        translate(props.LocaleKeyTemplate).replace('{0}', props.MinValue.toString()) +
        ' => ' +
        translate(props.LocaleKeyTemplate).replace('{0}', props.MaxValue.toString());
    }
  }

  return (
    <div data-id="ProceduralStatBonusItemListTile" className="gen-item-container" draggable={false}>
      <div className="smol-image-container">
        <ImageContainer Name={props.Name} Icon={`stats/${props.Image}.png`} />
      </div>
      <div className="gen-item-content-container">
        <TextContainer text={props.Name} />
        <div className="quantity-container">{subTitle}</div>
      </div>
    </div>
  );
};

export const ProceduralStatBonusItemListTile = (props: StatBonus): JSX.Element => (
  <ProceduralStatBonusItemListTileClass {...(props as unknown as ProceduralStatBonus)} />
);
