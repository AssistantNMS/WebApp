import React, { useEffect, useState } from 'react';
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
interface IWithoutDepInj {}

interface IProps extends IWithDepInj, IWithoutDepInj, IReduxProps {}

export const CatalogueListContainerUnconnected: React.FC<IProps> = (props: IProps) => {
  const { types } = useParams();

  const [items, setItems] = useState<Array<GameItemModel>>(new Array<GameItemModel>());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);

  useEffect(() => {
    fetchData(types ?? '');
  }, [types, props.selectedLanguage]);

  const fetchData = async (newTypes: string) => {
    const itemsResult = await props.allGameItemsService.getSelectedCatalogueItems(newTypes.split('-'));
    if (!itemsResult.isSuccess) {
      // Error
      return;
    }

    setItems(itemsResult.value);
    setNetworkState(NetworkState.Success);
  };

  const onSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e?.persist?.();

    const searchValue = e?.target?.value || '';
    if (searchTerm === searchValue) return;

    setSearchTerm(searchValue);
  };

  const getDisplayItems = (localItems: Array<GameItemModel>, searchText?: string): Array<GameItemModel> => {
    const newDisplayItems = new Array<GameItemModel>();
    for (const itemIndex in localItems) {
      if (localItems[itemIndex] != null) {
        const item = localItems[itemIndex];
        if (searchText != null) {
          if (!item.Name.toLowerCase().includes(searchText.toLowerCase())) continue;
        }
        newDisplayItems.push(item);
      }
    }
    return newDisplayItems;
  };

  const displayItems = getDisplayItems(items, searchTerm.trim());
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
};

export const CatalogueListContainer = withServices<IWithoutDepInj, IWithDepInj>(
  connect(mapStateToProps)(CatalogueListContainerUnconnected),
  (services: IDependencyInjection) => ({
    allGameItemsService: services.allGameItemsService,
    dataJsonService: services.dataJsonService,
    toastService: services.toastService,
  }),
);
