import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppImage } from '../../constants/AppImage';
import { CurrencyGameItems } from '../../constants/Currency';
import { NetworkState } from '../../constants/NetworkState';
import { UsageKey } from '../../constants/UsageKey';
import { GameItemModel } from '../../contracts/GameItemModel';
import { Processor } from '../../contracts/Processor';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { PlatformControlMapping } from '../../contracts/data/controlMapping';
import { CreatureHarvest } from '../../contracts/data/creatureHarvest';
import { EggNeuralTrait } from '../../contracts/data/eggNeuralTrait';
import { MajorUpdateItem } from '../../contracts/data/majorUpdateItem';
import { StarshipScrap } from '../../contracts/data/starshipScrap';
import { BlueprintSource, blueprintToLocalKey } from '../../contracts/enum/BlueprintSource';
import { ControllerPlatformType } from '../../contracts/enum/ControllerPlatformType';
import { CurrencyType } from '../../contracts/enum/CurrencyType';
import { Recharge } from '../../contracts/recharge/recharge';
import { getQuantityDialog } from '../../helper/dialogHelper';
import { getCurrencyName } from '../../helper/gameItemHelper';
import { optionalListTask, optionalTask } from '../../helper/promiseHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { localeMap } from '../../localization/Localization';
import { translate } from '../../localization/Translate';
import { AllGameItemsService } from '../../services/json/AllGameItemsService';
import { DataJsonService } from '../../services/json/DataJsonService';
import { GameItemService } from '../../services/json/GameItemService';
import { RechargeByService } from '../../services/json/RechargeByService';
import { ToastService } from '../../services/toastService';
import { IReduxProps, mapDispatchToProps, mapStateToProps } from './catalogueItem.Redux';
import { CatalogueItemPresenter } from './catalogueItemPresenter';
import { IChipProps } from '../../components/common/chip/additionalInfoChip';

interface IWithDepInj {
  gameItemService: GameItemService;
  allGameItemsService: AllGameItemsService;
  rechargeByService: RechargeByService;
  dataJsonService: DataJsonService;
  toastService: ToastService;
}
interface IWithoutDepInj {}

interface IProps extends IWithDepInj, IWithoutDepInj, IReduxProps {}

interface IState {
  item: GameItemModel;
  requiredItems: Array<RequiredItemDetails>;
  usedToCreate: Array<GameItemModel>;
  refined: Array<Processor>;
  usedToRefine: Array<Processor>;
  cooking: Array<Processor>;
  usedToCook: Array<Processor>;
  rechargedBy: Recharge;
  usedToRecharge: Array<Recharge>;
  eggTrait: Array<EggNeuralTrait>;
  controlLookup: Array<PlatformControlMapping>;
  starshipScrapItems: Array<StarshipScrap>;
  creatureHarvests: Array<CreatureHarvest>;
  addedInUpdate: Array<MajorUpdateItem>;
  additionalData: Array<IChipProps>;
}

const CatalogueItemContainerUnconnected: React.FC<IProps> = (props: IProps) => {
  const { langCode, itemId } = useParams();

  const defaultMetaState = {
    item: anyObject,
    requiredItems: [],
    usedToCreate: [],
    refined: [],
    usedToRefine: [],
    cooking: [],
    usedToCook: [],
    rechargedBy: anyObject,
    usedToRecharge: [],
    eggTrait: [],
    controlLookup: [],
    starshipScrapItems: [],
    creatureHarvests: [],
    addedInUpdate: [],
    additionalData: [],
  };

  const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);
  const [itemMeta, setItemMeta] = useState<IState>(defaultMetaState);

  useEffect(() => {
    if (langCode != null) {
      const indexOfLang = localeMap.findIndex((l) => l.code === langCode);
      if (indexOfLang > -1) {
        if (langCode !== props.selectedLanguage) props.setLanguage(langCode);
      }
    }
  }, []);

  useEffect(() => {
    clearData();
    fetchData(itemId);
  }, [langCode, itemId, props.selectedLanguage]);

  const clearData = async () => {
    setItemMeta(defaultMetaState);
    setNetworkState(NetworkState.Loading);
  };

  const fetchData = async (itemId?: string) => {
    if (itemId == null || itemId.length < 1) {
      setNetworkState(NetworkState.Error);
      return;
    }

    setNetworkState(NetworkState.Loading);
    const itemResult = await props.gameItemService.getItemDetails(itemId ?? '');
    if (!itemResult.isSuccess) {
      setNetworkState(NetworkState.Error);
      return;
    }

    const item = itemResult.value;
    const usages = itemResult.value.Usages ?? [];

    const reqItemsTask = optionalListTask(['true'], 'true', () => getReqItems(itemId));
    const usedToCreateTask = optionalListTask(usages, UsageKey.hasUsedToCraft, () => getUsedToCreate(itemId));

    const refineTask = optionalListTask(usages, UsageKey.hasRefinedUsing, () => getRefined(itemId));
    const usedToRefineTask = optionalListTask(usages, UsageKey.hasRefinedToCreate, () => getUsedToRefine(itemId));

    const cookTask = optionalListTask(usages, UsageKey.hasCookUsing, () => getCook(itemId));
    const usedToCookTask = optionalListTask(usages, UsageKey.hasCookToCreate, () => getUsedToCook(itemId));

    const rechargedByTask = optionalTask(usages, UsageKey.hasChargedBy, () => getRechargeBy(itemId));
    const usedToRechargeTask = optionalListTask(usages, UsageKey.hasUsedToRecharge, () => getUsedToRecharge(itemId));

    const scrapDataTask = optionalTask(usages, UsageKey.isRewardFromShipScrap, () => getScrapDataForItem(itemId));
    const creatureHarvestsTask = optionalTask(usages, UsageKey.hasCreatureHarvest, () => getCreatureHarvestsForItem(itemId));

    const addedInUpdateTask = optionalListTask(usages, UsageKey.isAddedInTrackedUpdate, () => getAddedInUpdateForItem(itemId));
    const eggTraitTask = optionalListTask(['true'], 'true', () => getEggTrait(itemId));
    const controlLookupTask = optionalListTask(['true'], 'true', () => getControlLookup(props.controlPlatform));

    const newMeta: IState = {
      item: item,
      requiredItems: await reqItemsTask,
      usedToCreate: await usedToCreateTask,
      refined: await refineTask,
      usedToRefine: await usedToRefineTask,
      cooking: await cookTask,
      usedToCook: await usedToCookTask,
      rechargedBy: await rechargedByTask,
      usedToRecharge: await usedToRechargeTask,
      eggTrait: await eggTraitTask,
      controlLookup: await controlLookupTask,
      starshipScrapItems: await scrapDataTask,
      creatureHarvests: await creatureHarvestsTask,
      addedInUpdate: await addedInUpdateTask,
      additionalData: await getAdditionalData(item),
    };
    setItemMeta(newMeta);
    setNetworkState(NetworkState.Success);
  };

  const getReqItems = async (itemId: string) => {
    const resArrayResult = await props.gameItemService.getRequiredItems(itemId);
    if (!resArrayResult.isSuccess) return [];
    return resArrayResult.value;
  };

  const getUsedToCreate = async (itemId: string) => {
    const usedToCreateArrayResult = await props.allGameItemsService.getByInputsId(itemId);
    if (!usedToCreateArrayResult.isSuccess) return [];
    return usedToCreateArrayResult.value;
  };

  const getRechargeBy = async (itemId: string): Promise<Recharge> => {
    const rechargeByResult = await props.rechargeByService.getRechargeById(itemId);
    if (!rechargeByResult.isSuccess) return anyObject;
    return rechargeByResult.value;
  };

  const getUsedToRecharge = async (itemId: string) => {
    const usedToRechargeResult = await props.rechargeByService.getRechargeByChargeById(itemId);
    if (!usedToRechargeResult.isSuccess) return [];
    return usedToRechargeResult.value;
  };

  const getRefined = async (itemId: string) => {
    const refArray = await props.gameItemService.getRefinedByOutput(itemId);
    if (!refArray.isSuccess) return [];
    return refArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length);
  };

  const getUsedToRefine = async (itemId: string) => {
    const usedToRefArray = await props.gameItemService.getRefinedByInput(itemId);
    if (!usedToRefArray.isSuccess) return [];
    return usedToRefArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length);
  };

  const getCook = async (itemId: string) => {
    const cookArray = await props.gameItemService.getCookingByOutput(itemId);
    if (!cookArray.isSuccess) return [];
    return cookArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length);
  };

  const getUsedToCook = async (itemId: string) => {
    const usedToCookArray = await props.gameItemService.getCookingByInput(itemId);
    if (!usedToCookArray.isSuccess) return [];
    return usedToCookArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length);
  };

  const getEggTrait = async (itemId: string) => {
    const eggTraitsArray = await props.dataJsonService.getEggNeuralTraits();
    if (!eggTraitsArray.isSuccess) return [];
    return eggTraitsArray.value.filter((egg) => egg.AppId === itemId);
  };

  const getControlLookup = async (platform: ControllerPlatformType) => {
    const controlsArray = await props.dataJsonService.getControlMapping(platform);
    if (!controlsArray.isSuccess) return [];
    return controlsArray.value;
  };

  const getScrapDataForItem = async (itemId: string) => {
    const starshipScrapsArray = await props.dataJsonService.getStarshipScrapDataForItem(itemId);
    if (!starshipScrapsArray.isSuccess) return [];
    return starshipScrapsArray.value;
  };

  const getCreatureHarvestsForItem = async (itemId: string) => {
    const harvestArray = await props.gameItemService.getCreatureHarvestForItem(itemId);
    if (!harvestArray.isSuccess) return [];
    return harvestArray.value;
  };

  const getAddedInUpdateForItem = async (itemId: string) => {
    const majorUpdates = await props.dataJsonService.getMajorUpdateForItem(itemId);
    if (!majorUpdates.isSuccess) return [];
    return majorUpdates.value;
  };

  const getAdditionalData = async (itemDetail: GameItemModel): Promise<Array<IChipProps>> => {
    const additionalData: Array<IChipProps> = [];
    if (itemDetail.BlueprintSource !== null && itemDetail.BlueprintSource !== BlueprintSource.unknown) {
      const bpSourceLangKey = blueprintToLocalKey(itemDetail.BlueprintSource);
      additionalData.push({
        text: `${translate(LocaleKey.blueprintFrom).toString()}: ${translate(bpSourceLangKey).toString()}`,
      });
    }

    if (itemDetail.MaxStackSize !== null && itemDetail.MaxStackSize > 0.1) {
      additionalData.push({
        text: `${translate(LocaleKey.maxStackSize).toString()}: ${itemDetail.MaxStackSize}`,
      });
    }

    if (itemDetail.BaseValueUnits > 1) {
      switch (itemDetail.CurrencyType) {
        case CurrencyType.CREDITS: {
          const units = await getCurrencyName(props.gameItemService, CurrencyGameItems.units, 'Units');
          additionalData.push({
            text: itemDetail.BaseValueUnits.toString(),
            image: AppImage.units,
            tooltip: units,
          });
          break;
        }
        case CurrencyType.QUICKSILVER: {
          const quicksilver = await getCurrencyName(props.gameItemService, CurrencyGameItems.quicksilver, 'Quicksilver');
          additionalData.push({
            text: itemDetail.BaseValueUnits.toString(),
            image: AppImage.quicksilverForChips,
            tooltip: quicksilver,
          });
          break;
        }
      }
    }

    const bpCost = itemDetail.BlueprintCost;
    if (bpCost > 0) {
      switch (itemDetail.BlueprintCostType) {
        case CurrencyType.NANITES: {
          const bpCostText = translate(LocaleKey.blueprintCost);
          const nanites = await getCurrencyName(props.gameItemService, CurrencyGameItems.nanites, 'Nanites');
          additionalData.push({
            text: `${bpCostText}: ${bpCost}`,
            image: AppImage.nanites,
            tooltip: nanites,
          });
          break;
        }
        case CurrencyType.SALVAGEDDATA: {
          const salvagedData = await getCurrencyName(props.gameItemService, CurrencyGameItems.salvagedData, 'Salvaged Data');
          additionalData.push({
            text: itemDetail.BlueprintCost.toString(),
            image: AppImage.salvagedData,
            tooltip: salvagedData,
          });
          break;
        }
        case CurrencyType.FACTORYOVERRIDE: {
          const factoryModule = await getCurrencyName(props.gameItemService, CurrencyGameItems.factoryModule, 'Factory Module');
          additionalData.push({
            text: itemDetail.BlueprintCost.toString(),
            image: AppImage.factoryOverride,
            tooltip: factoryModule,
          });
          break;
        }
        case CurrencyType.NONE:
        default:
          break;
      }
    }

    if (itemDetail.Power != null && itemDetail.Power !== 0) {
      additionalData.push({
        text: itemDetail.Power.toString(),
        icon: 'flash_on',
      });
    }

    return additionalData;
  };

  const addThisItemToCart = async () => {
    const quantityResult = await getQuantityDialog(translate(LocaleKey.quantity));
    if (quantityResult.isSuccess === false) return;

    if (props.addItemToCart == null) return;
    props.addItemToCart(item, quantityResult.value);
    // TODO - translate
    props.toastService.success(`Added ${item.Name} to cart`);
  };

  const addThisItemToFavourites = () => {
    if (props.addItemToFavourites == null) return;
    props.addItemToFavourites(item);
    // TODO - translate
    props.toastService.success('Added to Favourites');
  };

  const removeThisItemToFavourites = () => {
    if (props.removeItemToFavourites == null) return;
    props.removeItemToFavourites(item.Id);
    // TODO - translate
    props.toastService.success('Removed from Favourites');
  };

  const updateControlLookup = async (newPlatform: ControllerPlatformType) => {
    const controlLookupTask = optionalListTask(['true'], 'true', () => getControlLookup(newPlatform));
    const newControlLookup = await controlLookupTask;
    setItemMeta((oldMeta) => ({
      ...oldMeta,
      controlLookup: newControlLookup,
    }));
  };

  const {
    item,
    requiredItems,
    usedToCreate,
    refined,
    usedToRefine,
    cooking,
    usedToCook,
    rechargedBy,
    usedToRecharge,
    eggTrait,
    controlLookup,
    starshipScrapItems,
    creatureHarvests,
    addedInUpdate,
    additionalData,
  } = itemMeta;

  return (
    <CatalogueItemPresenter
      {...props}
      item={item}
      requiredItems={requiredItems}
      usedToCreate={usedToCreate}
      refined={refined}
      usedToRefine={usedToRefine}
      cooking={cooking}
      usedToCook={usedToCook}
      rechargedBy={rechargedBy}
      usedToRecharge={usedToRecharge}
      eggTrait={eggTrait}
      controlLookup={controlLookup}
      starshipScrapItems={starshipScrapItems}
      creatureHarvests={creatureHarvests}
      addedInUpdate={addedInUpdate}
      additionalData={additionalData}
      networkState={networkState}
      addThisItemToCart={addThisItemToCart}
      addThisItemToFavourites={addThisItemToFavourites}
      removeThisItemToFavourites={removeThisItemToFavourites}
      updateControlLookup={updateControlLookup}
    />
  );
};

export const CatalogueItemContainer = withServices<IWithoutDepInj, IWithDepInj>(
  connect(mapStateToProps, mapDispatchToProps)(CatalogueItemContainerUnconnected),
  (services: IDependencyInjection) => ({
    gameItemService: services.gameItemService,
    allGameItemsService: services.allGameItemsService,
    rechargeByService: services.rechargeByService,
    dataJsonService: services.dataJsonService,
    toastService: services.toastService,
  }),
);
