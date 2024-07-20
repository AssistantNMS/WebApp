import * as React from 'react';
import { useEffect, useState } from 'react';
import { NetworkState } from '../../../constants/NetworkState';
import { GameItemModel } from '../../../contracts/GameItemModel';
import { ExpeditionSeasonReward } from '../../../contracts/helloGames/expeditionSeason';
import { anyObject } from '../../../helper/typescriptHacks';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { GameItemService } from '../../../services/json/GameItemService';
import { CustomizedRequiredItemDetails, RequiredItemsQuantityContainer } from '../../common/tile/quantityContainer';

interface IWithDepInj {
  gameItemService: GameItemService;
}

interface IWithoutDepInj {
  rewards: Array<ExpeditionSeasonReward>;
}

interface IProps extends IWithDepInj, IWithoutDepInj {}

const ExpeditionSeasonRewardsOnlyTileInternal: React.FC<IProps> = (props: IProps) => {
  const [dataLookup, setDataLookup] = useState<Array<GameItemModel>>([]);
  const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);

  useEffect(() => {
    fetchData(props.rewards);
  }, []);

  const fetchData = async (rewards: Array<ExpeditionSeasonReward>) => {
    const localLookup: Array<GameItemModel> = [];
    for (const reward of rewards) {
      const itemDetails = await props.gameItemService.getItemDetails(reward.Id);
      localLookup.push(itemDetails.value);
    }
    setDataLookup(localLookup);
    setNetworkState(NetworkState.Success);
  };

  const mapToRequiredItems = (lookup: Array<GameItemModel>): Array<CustomizedRequiredItemDetails> => {
    const rewardsAsRequiredItems: Array<CustomizedRequiredItemDetails> = [];

    for (const reward of props.rewards) {
      let found: GameItemModel = anyObject;
      for (const lookupItem of lookup) {
        if (lookupItem.Id === reward.Id) {
          found = lookupItem;
          break;
        }
      }
      const newItem: CustomizedRequiredItemDetails = {
        Id: reward.Id,
        Icon: found.Icon,
        Colour: found.Colour,
        Name: found.Name,
        Quantity: reward.AmountMax,
      };
      if (reward.AmountMin !== reward.AmountMax) {
        newItem.QuantityRange = `(${reward.AmountMin} - ${reward.AmountMax})`;
      }
      rewardsAsRequiredItems.push(newItem);
    }

    const orderedRewardsAsRequiredItems = rewardsAsRequiredItems.sort((reqA: CustomizedRequiredItemDetails, reqB: CustomizedRequiredItemDetails) => {
      return reqB.Quantity - reqA.Quantity;
    });
    return orderedRewardsAsRequiredItems;
  };

  if (networkState !== NetworkState.Success) {
    return <span></span>;
  }

  return (
    <RequiredItemsQuantityContainer
      requiredItems={mapToRequiredItems(dataLookup)}
      limitRequiredItems={2}
      addExtraPadding={true}
      addBreakLines={true}
    />
  );
};

const ExpeditionSeasonRewardsOnlyTileWithDepInj = withServices<IWithoutDepInj, IWithDepInj>(
  ExpeditionSeasonRewardsOnlyTileInternal,
  (services: IDependencyInjection) => ({
    gameItemService: services.gameItemService,
  }),
);

export const ExpeditionSeasonRewardsOnlyTile = (props: IWithoutDepInj): JSX.Element => <ExpeditionSeasonRewardsOnlyTileWithDepInj {...props} />;
