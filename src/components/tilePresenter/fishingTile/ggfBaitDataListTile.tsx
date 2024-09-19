import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { NetworkState } from '../../../constants/NetworkState';
import { catalogueItem, fishingBait } from '../../../constants/Route';
import { GoodGuyFreeBaitViewModel } from '../../../contracts/generated/Model/goodGuyFreeBaitViewModel';
import { LocaleKey } from '../../../localization/LocaleKey';
import { translate } from '../../../localization/Translate';
import { CommonSection } from '../../../pages/catalogue/catalogueItem.Components';
import { ApiService } from '../../../services/api/ApiService';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';
import { TileLoading } from '../../core/loading/loading';
import { AppImage } from '../../../constants/AppImage';
import { ActionContainer } from '../../common/tile/actionContainer';
import { GgfInfoModal } from './ggfInfoAlert';

interface IGgfBaitDataListTile extends GoodGuyFreeBaitViewModel {
  isCatalogueMode?: boolean;
}

export const GgfBaitDataListTile = (props: IGgfBaitDataListTile) => (
  <Link to={props.isCatalogueMode ? fishingBait : `${catalogueItem}/${props.appId}`} data-id="GgfBaitDataListTile" className="gen-item-container" draggable={false}>
    <ImageContainer Icon={props.icon} Name={props.name} Colour='095C77' />
    <div className="gen-item-content-container fishing">
      <TextContainer text={props.name} />
      <div className="quantity-container">
        <span><b>{translate(LocaleKey.rarity)}:</b>&nbsp;<span className="secondary-colour">{props.rarity}%</span></span>
        <span>,&nbsp;&nbsp;</span>
        <span><b>{translate(LocaleKey.size)}:</b>&nbsp;<span className="secondary-colour">{props.size}%</span></span>
      </div>
      {
        props.isCatalogueMode == true && (
          <ActionContainer
            actions={[
              <GgfInfoModal key="info" bait={props} />,
            ]}
          />
        )
      }
    </div>
  </Link>
);

interface IProps {
  itemId: string;
  selectedLanguage?: string;
  apiService: ApiService;
}

export const GgfBaitDataListTileForCatalogue: React.FC<IProps> = (props: IProps) => {
  const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);
  const [bait, setBait] = useState<GoodGuyFreeBaitViewModel>();

  useEffect(() => {
    fetchData(props.itemId);
  }, []);

  const fetchData = async (itemId: string) => {
    const language = props.selectedLanguage ?? 'en';
    const baitResult = await props.apiService.getGoodGuysFreeBait(language);
    let networkStateResult = NetworkState.Error;
    if (baitResult.isSuccess) {
      const specificToItemId = baitResult.value.filter((sc) => sc.appId == itemId);
      if (specificToItemId.length > 0) {
        setBait(specificToItemId[0]);
        networkStateResult = NetworkState.Success;
      }
    }
    setNetworkState(networkStateResult);
  };

  if (networkState === NetworkState.Loading) return (<TileLoading />);
  if (bait == null) return (<span></span>);

  return (
    <CommonSection
      heading={translate(LocaleKey.fishingBait)}
      content={
        <div className="generic-item-list row justify">
          <div className="gen-item col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <GgfBaitDataListTile {...bait} icon={AppImage.fishingBait} isCatalogueMode={true} />
          </div>
        </div>
      }
    />
  );
};
