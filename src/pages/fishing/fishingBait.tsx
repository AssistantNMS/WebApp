import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { PatreonBlock } from '../../components/common/patreon/patreonBlock';
import { SearchBar } from '../../components/common/searchBar';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { BaitDataListTile } from '../../components/tilePresenter/fishingTile/baitDataListTile';
import { GgfBaitDataListTile } from '../../components/tilePresenter/fishingTile/ggfBaitDataListTile';
import { GgfInfoAlert } from '../../components/tilePresenter/fishingTile/ggfInfoAlert';
import { NetworkState } from '../../constants/NetworkState';
import { patreonUnlockDate } from '../../constants/Patreon';
import { BaitData } from '../../contracts/data/baitData';
import { GoodGuyFreeBaitViewModel } from '../../contracts/generated/Model/goodGuyFreeBaitViewModel';
import { shouldListBeCentered } from '../../helper/mathHelper';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';
import { ApiService } from '../../services/api/ApiService';
import { DataJsonService } from '../../services/json/DataJsonService';
import { IReduxProps, mapStateToProps } from './fishingList.Redux';

interface IWithDepInj {
  apiService: ApiService;
  dataJsonService: DataJsonService;
}
interface IWithoutDepInj { }

interface IProps extends IWithDepInj, IWithoutDepInj, IReduxProps { }

export const FishingBaitPageUnconnected: React.FC<IProps> = (props: IProps) => {
  const [baitNetworkState, setBaitNetworkState] = useState<NetworkState>(NetworkState.Loading);
  const [ggfNetworkState, setGgfNetworkState] = useState<NetworkState>(NetworkState.Loading);
  const [gameBait, setGameBait] = useState<Array<BaitData>>([]);
  const [searchGgfBait, setSearchGgfBait] = useState<string>();
  const [ggfBait, setGgfBait] = useState<Array<GoodGuyFreeBaitViewModel>>([]);

  useEffect(() => {
    fetchData();
    fetchGgfData();
  }, []);

  const fetchData = async () => {
    const baitResult = await props.dataJsonService.getBaitData();
    if (baitResult.isSuccess) {
      setGameBait(baitResult.value);
    }
    setBaitNetworkState(baitResult.isSuccess ? NetworkState.Success : NetworkState.Error);
  };

  const fetchGgfData = async () => {
    const language = props.selectedLanguage ?? 'en';
    const ggfBaitResult = await props.apiService.getGoodGuysFreeBait(language);

    if (ggfBaitResult.isSuccess) {
      setGgfBait(ggfBaitResult.value);
    }
    setGgfNetworkState(ggfBaitResult.isSuccess ? NetworkState.Success : NetworkState.Error);
  };


  const onSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e?.persist?.();

    const searchValue = e?.target?.value || '';
    if (searchGgfBait === searchValue) return;

    setSearchGgfBait(searchValue);
  };

  const getDisplayItems = (localItems: Array<GoodGuyFreeBaitViewModel>, searchString?: string): Array<GoodGuyFreeBaitViewModel> => {
    const newDisplayItems = [];
    for (const item of localItems) {
      if (searchString != null) {
        if (!item.name.toLowerCase().includes(searchString.trim().toLowerCase())) continue;
      }
      newDisplayItems.push(item);
    }
    return newDisplayItems;
  };

  const renderGameDataContent = () => {
    if (baitNetworkState === NetworkState.Loading) return <SmallLoading />;
    if (baitNetworkState === NetworkState.Error) return <Error />;

    return (
      <div className="bait-list pt1">
        <GenericListPresenter
          list={gameBait}
          identifier={item => item.AppId}
          presenter={BaitDataListTile}
          isCentered={shouldListBeCentered(gameBait.length)}
        />
      </div>
    );
  };

  const renderGgfContent = () => {
    if (ggfNetworkState === NetworkState.Loading) return <SmallLoading />;
    if (ggfNetworkState === NetworkState.Error) return (<span></span>);
    if (ggfBait.length < 0) return (<span></span>);

    const displayItems = getDisplayItems(ggfBait, searchGgfBait);

    return (
      <>
        <div className="row">
          <div className="col-12">
            <GgfInfoAlert />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <SearchBar searchTerm={searchGgfBait ?? ''} onSearchTextChange={onSearchTextChange} />
          </div>
          <div className="col-12">
            <GenericListPresenter
              list={displayItems}
              identifier={item => item.appId}
              presenter={GgfBaitDataListTile}
              isCentered={shouldListBeCentered(ggfBait.length)}
            />
          </div>
        </div>
      </>
    );
  };

  const title = translate(LocaleKey.fishingBait);
  return (
    <DefaultAnimation>
      <HeadComponent title={title} />
      <NavBar title={title} />
      <div className="content" data-id="FishingBait">
        <PatreonBlock dateAvailable={patreonUnlockDate.fishing}>
          <>
            {renderGameDataContent()}
            {renderGgfContent()}
          </>
        </PatreonBlock>
      </div>
    </DefaultAnimation>
  );
};

export const FishingBaitPage = withServices<IWithoutDepInj, IWithDepInj>(
  connect(mapStateToProps)(FishingBaitPageUnconnected),
  (services: IDependencyInjection) => ({
    apiService: services.apiService,
    dataJsonService: services.dataJsonService,
  }),
);
