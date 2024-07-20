import React, { useEffect, useState } from 'react';

import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { TwitchCampaignTile } from '../../components/tilePresenter/twitchTile/twitchCampaignTile';
import { NetworkState } from '../../constants/NetworkState';
import { TwitchDrop } from '../../contracts/data/twitchDrop';
import { shouldListBeCentered } from '../../helper/mathHelper';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';
import { DataJsonService } from '../../services/json/DataJsonService';

interface IWithDepInj {
  dataService: DataJsonService;
}
interface IWithoutDepInj {}
interface IProps extends IWithDepInj, IWithoutDepInj {}

export const TwitchDropPageUnconnected: React.FC<IProps> = (props: IProps) => {
  const [twitchDropItems, setTwitchDropItems] = useState<Array<TwitchDrop>>([]);
  const [networkStatus, setStatus] = useState<NetworkState>(NetworkState.Loading);

  useEffect(() => {
    fetchTwitchDrop();
  }, []);

  const fetchTwitchDrop = async () => {
    const twitchDropsResult = await props.dataService.getTwitchDrops();
    if (!twitchDropsResult.isSuccess) {
      setTwitchDropItems([]);
      setStatus(NetworkState.Error);
      return;
    }

    setTwitchDropItems(twitchDropsResult.value);
    setStatus(NetworkState.Success);
  };

  const displayTwitchDrops = (localTwitchDropItems: Array<TwitchDrop>) => {
    if (networkStatus === NetworkState.Loading) {
      return <SmallLoading />;
    }

    if (networkStatus === NetworkState.Error) {
      return <Error />;
    }

    if (localTwitchDropItems == null || localTwitchDropItems.length === 0) return <h2>{translate(LocaleKey.noItems)}</h2>;

    return (
      <GenericListPresenter
        list={localTwitchDropItems}
        presenter={TwitchCampaignTile}
        isCentered={shouldListBeCentered(localTwitchDropItems.length)}
        limitResultsTo={12}
      />
    );
  };

  const title = translate(LocaleKey.twitchDrop);
  return (
    <DefaultAnimation>
      <HeadComponent title={title} />
      <NavBar title={title} />
      <div data-id="TwitchDropPage" className="content">
        <div className="row full pt1 pb5">
          <div className="col-12">{displayTwitchDrops(twitchDropItems)}</div>
        </div>
      </div>
    </DefaultAnimation>
  );
};

export const TwitchDropPage = withServices<IWithoutDepInj, IWithDepInj>(TwitchDropPageUnconnected, (services: IDependencyInjection) => ({
  dataService: services.dataJsonService,
}));
