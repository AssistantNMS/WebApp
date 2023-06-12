import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { HeadComponent } from '../../components/core/headComponent';
import { ItemHeaderRow } from '../../components/core/itemHeaderRow';
import { BasicLink } from '../../components/core/link';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { newItemsAdded } from '../../constants/Route';
import { UpdateItem } from '../../contracts/data/updateItem';
import { formatDate } from '../../helper/dateHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';
import { DataJsonService } from '../../services/json/DataJsonService';
import { GameItemService } from '../../services/json/GameItemService';
import { GameItemModel } from '../../contracts/GameItemModel';
import { GenericItemListTile } from '../../components/tilePresenter/genericItemListTile/genericItemListTile';
import { gameItemModelSortByName } from '../../helper/sortHelper';

interface IWithDepInj {
    dataJsonService: DataJsonService;
    gameItemService: GameItemService;
}

interface IWithoutDepInj {
}

interface IProps extends IWithDepInj, IWithoutDepInj {
}

export const NewItemsDetailPresenterUnconnected: React.FC<IProps> = (props: IProps) => {
    let location = useLocation();

    const [update, setUpdate] = useState<UpdateItem>(anyObject);
    const [gameDetails, setGameDetails] = useState<Array<GameItemModel>>([]);
    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);

    useEffect(() => {
        if (!location.pathname.includes(newItemsAdded)) return;

        const url = location.pathname;
        const idSlashIndex = url.lastIndexOf('/');
        const updateId: any = url.substring(idSlashIndex + 1, url.length);

        loadUpdateItems(updateId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadUpdateItems = async (updateId: string) => {
        const dataServ = props.dataJsonService;
        const updatesResult = await dataServ.getUpdateItems();
        if (updatesResult.isSuccess == false) {
            setNetworkState(NetworkState.Error);
            return;
        }

        const updateItem = updatesResult.value.find(ur => ur.guid == updateId);
        if (updateId == null) {
            setNetworkState(NetworkState.Error);
            return;
        }

        const detailsResult = await props.gameItemService.getItemDetailsFromIdList(updateItem?.itemIds ?? []);
        if (detailsResult.isSuccess == false) return;

        const gameItems = detailsResult.value.map((g: any) => g.value);
        setGameDetails(gameItems.sort(gameItemModelSortByName));

        setUpdate(updateItem!);
        setNetworkState(NetworkState.Success);
    }

    const handleLoadingOrError = () => {
        if (networkState === NetworkState.Loading) return <div className="pt-5"><SmallLoading /></div>;
        if (networkState === NetworkState.Error) {
            return (<h2>{translate(LocaleKey.error)}</h2>);
        }

        return (
            <>
                <ItemHeaderRow
                    Icon={update.icon}
                    Name={update.title}
                    Abbrev={update.gameVersion}
                    Group={update.emoji}
                >
                    <p>
                        {formatDate(update.releaseDate, 'YYYY-MM-DD')}<br />
                        {translate(LocaleKey.newItemsAdded)}: {update.itemIds.length}
                    </p>
                    <BasicLink href={update.postUrl} additionalClassNames="customButton noselect">
                        {translate(LocaleKey.viewPostOnline)}
                    </BasicLink>
                </ItemHeaderRow>
                <div className="mt-1em pb5">
                    <GenericListPresenter
                        list={gameDetails}
                        presenter={(props: any | string): JSX.Element => <GenericItemListTile {...props} />}
                    />
                </div>
            </>
        );
    }

    return (
        <DefaultAnimation>
            <HeadComponent title={update.title} />
            <NavBar title={update.title} />
            <div className="content new-item">
                {handleLoadingOrError()}
            </div>
        </DefaultAnimation>
    );
}

export const NewItemsDetailPresenter = withServices<IWithoutDepInj, IWithDepInj>(
    NewItemsDetailPresenterUnconnected,
    (services: IDependencyInjection) => ({
        dataJsonService: services.dataJsonService,
        gameItemService: services.gameItemService,
    })
);
