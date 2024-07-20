import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NetworkState } from '../../constants/NetworkState';
import { RequiredItem } from '../../contracts/RequiredItem';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { Tree } from '../../contracts/tree/tree';
import { getAllRequiredItemsForMultiple, getAllRequiredItemsForTree } from '../../helper/itemHelper';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { GameItemService } from '../../services/json/GameItemService';
import { GenericPageAllRequiredPresenter } from './genericPageAllRequiredPresenter';

interface IWithDepInj {
  gameItemService: GameItemService;
}
interface IWithoutDepInj {}

interface IProps extends IWithDepInj, IWithoutDepInj {}

export const GenericPageAllRequiredContainerUnconnected: React.FC<IProps> = (props: IProps) => {
  const location = useLocation();
  const [treeRequiredItems, setTreeRequiredItems] = useState<Array<Tree<RequiredItemDetails>>>([]);
  const [requiredItems, setRequiredItems] = useState<Array<RequiredItemDetails>>([]);
  const [status, setStatus] = useState<NetworkState>(NetworkState.Loading);
  const [selectedOption, setSelectedOption] = useState<LocaleKey>(LocaleKey.flatList);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const requiredItemIds: Array<RequiredItem> = location.state?.requiredItems || [];
    const itemsResult = await getAllRequiredItemsForMultiple(props.gameItemService, requiredItemIds);
    const treeItemsResult = await getAllRequiredItemsForTree(props.gameItemService, requiredItemIds);

    setTreeRequiredItems(treeItemsResult);
    setRequiredItems(itemsResult);
    setStatus(NetworkState.Success);
  };

  return (
    <GenericPageAllRequiredPresenter
      status={status}
      treeRequiredItems={treeRequiredItems}
      requiredItems={requiredItems}
      selectedOption={selectedOption}
      setSelectedOption={(selectedOpt: LocaleKey) => setSelectedOption(selectedOpt)}
    />
  );
};

export const GenericPageAllRequiredContainer = withServices<IWithoutDepInj, IWithDepInj>(
  GenericPageAllRequiredContainerUnconnected,
  (services: IDependencyInjection) => ({
    gameItemService: services.gameItemService,
  }),
);
