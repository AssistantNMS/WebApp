
import i18next from 'i18next';
import * as React from 'react';
import { ProceduralStatBonus } from '../../../contracts/ProceduralStatBonus';
import { StatBonus } from '../../../contracts/StatBonus';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';


const StatBonusItemListTileClass: React.FC<StatBonus> = (props: StatBonus) => {
    let subTitle = props.Value?.toString() ?? '';
    if (props.LocaleKeyTemplate !== 'defaultTemplate') {
        subTitle = i18next.t(props.LocaleKeyTemplate)
            .replace('{0}', subTitle);
    }
    return (
        <div className="gen-item-container" draggable={false}>
            <div className="smol-image-container">
                <ImageContainer Name={props.Name} Icon={`stats/${props.Image}.png`} />
            </div>
            <div className="gen-item-content-container">
                <TextContainer text={props.Name} />
                <div className="quantity-container">{subTitle}</div>
            </div>
        </div>
    );
}


export const StatBonusItemListTile = (props: any | StatBonus): JSX.Element => <StatBonusItemListTileClass {...props} />;



const ProceduralStatBonusItemListTileClass: React.FC<ProceduralStatBonus> = (props: ProceduralStatBonus) => {
    let subTitle = props.MinValue + ' => ' + props.MaxValue;
    if (props.LocaleKeyTemplate !== 'defaultTemplate') {
        if (props.MinValue === props.MaxValue) {
            subTitle = i18next.t(props.LocaleKeyTemplate)
                .replace('{0}', props.MinValue.toString());
        } else {
            subTitle = i18next.t(props.LocaleKeyTemplate)
                .replace('{0}', props.MinValue.toString()) +
                ' => ' +
                i18next.t(props.LocaleKeyTemplate)
                    .replace('{0}', props.MaxValue.toString());
        }
    }

    return (
        <div className="gen-item-container" draggable={false}>
            <div className="smol-image-container">
                <ImageContainer Name={props.Name} Icon={`stats/${props.Image}.png`} />
            </div>
            <div className="gen-item-content-container">
                <TextContainer text={props.Name} />
                <div className="quantity-container">{subTitle}</div>
            </div>
        </div>
    );
}

export const ProceduralStatBonusItemListTile = (props: any | StatBonus): JSX.Element => <ProceduralStatBonusItemListTileClass {...props} />;