import React, { useEffect, useState } from 'react';
import { forceCheck } from 'react-lazyload';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NetworkState } from '../../constants/NetworkState';
import { GameItemModel } from '../../contracts/GameItemModel';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { AllGameItemsService } from '../../services/json/AllGameItemsService';
import { DataJsonService } from '../../services/json/DataJsonService';
import { ToastService } from '../../services/toastService';
import { CatalogueListPresenter } from './catalogueListPresenter';
import { mapStateToProps, IReduxProps } from './catalogueList.Redux';

interface IWithDepInj {
    allGameItemsService: AllGameItemsService;
    dataJsonService: DataJsonService;
    toastService: ToastService;
}
interface IWithoutDepInj { }

interface IProps extends IWithDepInj, IWithoutDepInj, IReduxProps { }

export const CatalogueListContainerUnconnected: React.FC<IProps> = (props: IProps) => {
    let { types } = useParams();

    const [items, setItems] = useState<Array<GameItemModel>>(new Array<GameItemModel>());
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);

    useEffect(() => {
        fetchData(types ?? '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [types, props.selectedLanguage]);

    const fetchData = async (newTypes: string) => {
        const itemsResult = await props.allGameItemsService.getSelectedCatalogueItems(newTypes.split('-'));
        if (!itemsResult.isSuccess) {
            // Error
            return;
        }

        setItems(itemsResult.value);
        setNetworkState(NetworkState.Success);
        forceCheck();
    }

    const onSearchTextChange = (e: any) => {
        e?.persist?.();

        const searchValue = e?.target?.value || '';
        if (searchTerm === searchValue) return;

        setSearchTerm(searchValue);
        forceCheck();
    }

    const getDisplayItems = (localItems: Array<GameItemModel>, searchText?: string): Array<GameItemModel> => {
        const newDisplayItems = new Array<GameItemModel>();
        for (const itemIndex in localItems) {
            if (localItems.hasOwnProperty(itemIndex)) {
                const item = localItems[itemIndex];
                if (searchText != null) {
                    if (!item.Name.toLowerCase().includes(searchText.toLowerCase())) continue;
                }
                newDisplayItems.push(item);
            }
        }
        return newDisplayItems;
    }

    const displayItems = getDisplayItems(items, searchTerm);
    return (
        <CatalogueListPresenter
            {...props}
            items={items}
            displayItems={displayItems}
            searchTerm={searchTerm}
            networkState={networkState}
            onSearchTextChange={onSearchTextChange}
        />
    );
}


export const CatalogueListContainer = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps)(CatalogueListContainerUnconnected),
    (services: IDependencyInjection) => ({
        allGameItemsService: services.allGameItemsService,
        dataJsonService: services.dataJsonService,
        toastService: services.toastService,
    })
);
