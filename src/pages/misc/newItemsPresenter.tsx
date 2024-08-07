import React, { useEffect, useState } from 'react';

import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { UpdateItemCardListTile } from '../../components/tilePresenter/updateItemTilePresenter';
import { NetworkState } from '../../constants/NetworkState';
import { MajorUpdateItem } from '../../contracts/data/majorUpdateItem';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';
import { DataJsonService } from '../../services/json/DataJsonService';

interface IWithDepInj {
  dataJsonService: DataJsonService;
}

interface IWithoutDepInj {}

interface IProps extends IWithDepInj, IWithoutDepInj {}

export const NewItemsPresenterUnconnected: React.FC<IProps> = (props: IProps) => {
  const [updates, setUpdates] = useState<Array<MajorUpdateItem>>([]);
  const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);

  useEffect(() => {
    loadUpdateItems();
  }, []);

  const loadUpdateItems = async () => {
    const dataServ = props.dataJsonService;
    const updatesResult = await dataServ.getMajorUpdateItems();
    if (updatesResult.isSuccess === false) {
      setNetworkState(NetworkState.Error);
      return;
    }
    setUpdates(updatesResult.value);
    setNetworkState(NetworkState.Success);
  };

  const displayUpdateItems = (updates: Array<MajorUpdateItem>) => {
    if (updates == null || updates.length === 0)
      return (
        <div className="col-12 mt-3em">
          <h2>{translate(LocaleKey.noItems)}</h2>
        </div>
      );
    return updates.map((item: MajorUpdateItem, index: number) => (
      <div key={`update-${item.guid}-${index}`} className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
        <UpdateItemCardListTile {...item} />
      </div>
    ));
  };

  const renderContent = (updates: Array<MajorUpdateItem>) => {
    if (networkState === NetworkState.Loading) return <SmallLoading />;
    if (networkState === NetworkState.Error) return <Error />;

    return displayUpdateItems(updates);
  };

  const title = translate(LocaleKey.newItemsAdded);
  return (
    <DefaultAnimation>
      <HeadComponent title={title} />
      <NavBar title={title} />
      <div className="content">
        <div className="row full pt1 pb5">{renderContent(updates)}</div>
      </div>
    </DefaultAnimation>
  );
};

export const NewItemsPresenter = withServices<IWithoutDepInj, IWithDepInj>(NewItemsPresenterUnconnected, (services: IDependencyInjection) => ({
  dataJsonService: services.dataJsonService,
}));
