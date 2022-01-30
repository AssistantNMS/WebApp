import React, { useEffect, useState } from 'react';
import { RequiredItem } from '../../contracts/RequiredItem';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { getAllRequiredItemsForMultiple, getAllRequiredItemsForTree } from '../../helper/itemHelper';
import { GenericPageAllRequiredPresenter } from './genericPageAllRequiredPresenter';
import { NetworkState } from '../../constants/NetworkState';
import { GameItemService } from '../../services/json/GameItemService';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { Tree } from '../../contracts/tree/tree';
import { LocaleKey } from '../../localization/LocaleKey';
import { useLocation } from 'react-router-dom';

interface IWithDepInj {
    gameItemService: GameItemService;
}
interface IWithoutDepInj { }

interface IProps extends IWithDepInj, IWithoutDepInj { }

export const GenericPageAllRequiredContainerUnconnected: React.FC<IProps> = (props: IProps) => {
    let location = useLocation();
    const [treeRequiredItems, setTreeRequiredItems] = useState<Array<Tree<RequiredItemDetails>>>([]);
    const [requiredItems, setRequiredItems] = useState<Array<RequiredItemDetails>>([]);
    const [status, setStatus] = useState<NetworkState>(NetworkState.Loading);
    const [selectedOption, setSelectedOption] = useState<LocaleKey>(LocaleKey.flatList);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        const requiredItemIds: Array<RequiredItem> = (location.state as any)?.requiredItems || []
        const itemsResult = await getAllRequiredItemsForMultiple(props.gameItemService, requiredItemIds);
        const treeItemsResult = await getAllRequiredItemsForTree(props.gameItemService, requiredItemIds);

        setTreeRequiredItems(treeItemsResult);
        setRequiredItems(itemsResult);
        setStatus(NetworkState.Success);
    }

    return (
        <GenericPageAllRequiredPresenter
            status={status}
            treeRequiredItems={treeRequiredItems}
            requiredItems={requiredItems}
            selectedOption={selectedOption}
            setSelectedOption={(selectedOpt: LocaleKey) => setSelectedOption(selectedOpt)}
        />
    );
}

export const GenericPageAllRequiredContainer = withServices<IWithoutDepInj, IWithDepInj>(
    GenericPageAllRequiredContainerUnconnected,
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);
