import React, { ReactNode, useEffect, useState } from 'react';

import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { HeadComponent } from '../../components/core/headComponent';
import { Error } from '../../components/core/error/error';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { RequiredItemListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemListTile';
import { NetworkState } from '../../constants/NetworkState';
import { TwitchDrop, TwitchDropDay } from '../../contracts/data/twitchDrop';
import { shouldListBeCentered } from '../../helper/mathHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';
import { DataJsonService } from '../../services/json/DataJsonService';
import { twitchDrops } from '../../constants/Route';
import { useLocation } from 'react-router-dom';
import { dateAdd, twitchDate } from '../../helper/dateHelper';

interface IWithDepInj {
    dataService: DataJsonService;
}
interface IWithoutDepInj { }
interface IProps extends IWithDepInj, IWithoutDepInj { }


export const TwitchDropViewerPageUnconnected: React.FC<IProps> = (props: IProps) => {
    let location = useLocation();

    const [twitchDropItem, setTwitchDropItem] = useState<TwitchDrop>(anyObject);
    const [networkStatus, setStatus] = useState<NetworkState>(NetworkState.Loading);

    useEffect(() => {
        if (!location.pathname.includes(twitchDrops)) return;

        const url = location.pathname;
        const seasIdSlashIndex = url.lastIndexOf('/');
        const twitchId: any = url.substring(seasIdSlashIndex + 1, url.length);
        if (isNaN(twitchId)) return;

        fetchTwitchDrop(parseInt(twitchId));
        // eslint-disable-next-line
    }, []);

    const fetchTwitchDrop = async (twitchId: number) => {
        const twitchDropsResult = await props.dataService.getTwitchDrops();
        if (!twitchDropsResult.isSuccess) {
            setTwitchDropItem(anyObject);
            setStatus(NetworkState.Error);
            return;
        }

        const twitchItem = twitchDropsResult.value.find(t => t.Id === twitchId);
        if (twitchItem == null) {
            setTwitchDropItem(anyObject);
            setStatus(NetworkState.Error);
            return;
        }

        setTwitchDropItem(twitchItem);
        setStatus(NetworkState.Success);
    }

    const quantityTemplate = (quantity: number): ReactNode => {
        let template = translate(LocaleKey.minutes);
        let localQuantity = quantity;

        if (quantity > 60) {
            localQuantity = quantity / 60;
            template = translate(LocaleKey.hours);
        }

        return (<span>{template.replaceAll('{0}', localQuantity.toString())}</span>);
    }

    const displayTwitchDropDay = (startDate: Date, drop: TwitchDropDay) => {
        const rewards = drop.Rewards.map((r) => ({
            Id: r.Id,
            Quantity: r.WatchTimeInMin,
            quantityLabel: 'test',
            quantityTemplate,
        }));
        return (
            <div key={drop.DayNumber} className="gen-item col-12">
                <h3 className="pb1">{twitchDate(dateAdd(startDate, (drop.DayNumber - 1)))}</h3>
                <GenericListPresenter
                    list={rewards}
                    presenter={RequiredItemListTile}
                    isCentered={shouldListBeCentered(rewards.length)}
                    limitResultsTo={12}
                />
                <br />
                <hr />
            </div>
        );
    }

    const displayTwitchDrop = (drop: TwitchDrop) => {

        if (networkStatus === NetworkState.Loading) {
            return <SmallLoading />
        }

        if (networkStatus === NetworkState.Error) {
            return <Error />
        }

        return (
            <div key={drop.Id} className="row pb1" data-key={drop.Id}>
                <div className="gen-item col-12 pt1">
                    <h4><b>{translate(LocaleKey.startDate)}</b>: {twitchDate(drop.StartDate)}</h4>
                    <h4><b>{translate(LocaleKey.endDate)}</b>: {twitchDate(drop.EndDate)}</h4>
                </div>
                <div className="col-12">
                    <hr />
                </div>
                <div className="gen-item col-12">
                    <div className="row">
                        {drop.Days.map(day => displayTwitchDropDay(drop.StartDate, day))}
                    </div>
                </div>
            </div>
        );
    }

    const title = translate(LocaleKey.twitchCampaignNum).replaceAll('{0}', twitchDropItem?.Id?.toString?.());
    return (
        <DefaultAnimation>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div data-id="TwitchDropViewerPage" className="content">
                <div className="row full pt1 pb5">
                    <div className="col-12">
                        <div className="generic-item-list">
                            {displayTwitchDrop(twitchDropItem)}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultAnimation>
    );
}

export const TwitchDropViewerPage = withServices<IWithoutDepInj, IWithDepInj>(
    TwitchDropViewerPageUnconnected,
    (services: IDependencyInjection) => ({
        dataService: services.dataJsonService,
    })
);
