import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NetworkState } from '../../constants/NetworkState';
import { PlatformControlMapping } from '../../contracts/data/controlMapping';
import { EggNeuralTrait } from '../../contracts/data/eggNeuralTrait';
import { BlueprintSource, blueprintToLocalKey } from '../../contracts/enum/BlueprintSource';
import { ControllerPlatformType } from '../../contracts/enum/ControllerPlatformType';
import { CurrencyType } from '../../contracts/enum/CurrencyType';
import { GameItemModel } from '../../contracts/GameItemModel';
import { Processor } from '../../contracts/Processor';
import { Recharge } from '../../contracts/recharge/recharge';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { getQuantityDialog } from '../../helper/dialogHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { localeMap } from '../../localization/Localization';
import { AllGameItemsService } from '../../services/json/AllGameItemsService';
import { DataJsonService } from '../../services/json/DataJsonService';
import { GameItemService } from '../../services/json/GameItemService';
import { RechargeByService } from '../../services/json/RechargeByService';
import { ToastService } from '../../services/toastService';
import { mapDispatchToProps, mapStateToProps, IReduxProps } from './catalogueItem.Redux';
import { CatalogueItemPresenter } from './catalogueItemPresenter';
import { optionalListTask, optionalTask } from '../../helper/promiseHelper';
import { UsageKey } from '../../constants/UsageKey';

interface IWithDepInj {
    gameItemService: GameItemService;
    allGameItemsService: AllGameItemsService;
    rechargeByService: RechargeByService;
    dataJsonService: DataJsonService;
    toastService: ToastService;
}
interface IWithoutDepInj { }

interface IProps extends IWithDepInj, IWithoutDepInj, IReduxProps { }

interface IState {
    item: GameItemModel,
    requiredItems: Array<RequiredItemDetails>,
    usedToCreate: Array<GameItemModel>,
    refined: Array<Processor>,
    usedToRefine: Array<Processor>,
    cooking: Array<Processor>,
    usedToCook: Array<Processor>,
    rechargedBy: Recharge,
    usedToRecharge: Array<Recharge>,
    eggTrait: Array<EggNeuralTrait>,
    controlLookup: Array<PlatformControlMapping>,
    additionalData: Array<any>,
}


const CatalogueItemContainerUnconnected: React.FC<IProps> = (props: IProps) => {
    let { langCode, itemId } = useParams();

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
        additionalData: [],
    };

    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);
    const [itemMeta, setItemMeta] = useState<IState>(defaultMetaState);

    useEffect(() => {
        if (langCode != null) {
            const indexOfLang = localeMap.findIndex(l => l.code === langCode);
            if (indexOfLang > -1) {
                // console.log('Language currently set to: "' + (props.selectedLanguage ?? '') + '"');
                // console.log('Language forced to: "' + langCode + '"');
                if (langCode !== props.selectedLanguage) props.setLanguage(langCode);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        clearData();
        fetchData(itemId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [langCode, itemId, props.selectedLanguage]);

    const clearData = async () => {
        setItemMeta(defaultMetaState);
        setNetworkState(NetworkState.Loading);
    }

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

        const eggTraitTask = optionalListTask(['true'], 'true', () => getEggTrait(itemId));
        const controlLookupTask = optionalListTask(['true'], 'true', () => getControlLookup(props.controlPlatform));

        const newMeta = {
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
            additionalData: getAdditionalData(item),
        };
        setItemMeta(newMeta);
        setNetworkState(NetworkState.Success);
    }

    const getReqItems = async (itemId: string) => {
        const resArrayResult = await props.gameItemService.getRequiredItems(itemId);
        if (!resArrayResult.isSuccess) return [];
        return resArrayResult.value;
    }

    const getUsedToCreate = async (itemId: string) => {
        const usedToCreateArrayResult = await props.allGameItemsService.getByInputsId(itemId);
        if (!usedToCreateArrayResult.isSuccess) return [];
        return usedToCreateArrayResult.value;
    }

    const getRechargeBy = async (itemId: string): Promise<Recharge> => {
        const rechargeByResult = await props.rechargeByService.getRechargeById(itemId);
        if (!rechargeByResult.isSuccess) return anyObject;
        return rechargeByResult.value;
    }

    const getUsedToRecharge = async (itemId: string) => {
        const usedToRechargeResult = await props.rechargeByService.getRechargeByChargeById(itemId);
        if (!usedToRechargeResult.isSuccess) return [];
        return usedToRechargeResult.value;
    }

    const getRefined = async (itemId: string) => {
        const refArray = await props.gameItemService.getRefinedByOutput(itemId);
        if (!refArray.isSuccess) return [];
        return refArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length);
    }

    const getUsedToRefine = async (itemId: string) => {
        const usedToRefArray = await props.gameItemService.getRefinedByInput(itemId);
        if (!usedToRefArray.isSuccess) return [];
        return usedToRefArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length);
    }

    const getCook = async (itemId: string) => {
        const cookArray = await props.gameItemService.getCookingByOutput(itemId);
        if (!cookArray.isSuccess) return [];
        return cookArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length);
    }

    const getUsedToCook = async (itemId: string) => {
        const usedToCookArray = await props.gameItemService.getCookingByInput(itemId);
        if (!usedToCookArray.isSuccess) return [];
        return usedToCookArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length);
    }

    const getEggTrait = async (itemId: string) => {
        const eggTraitsArray = await props.dataJsonService.getEggNeuralTraits();
        if (!eggTraitsArray.isSuccess) return [];
        return eggTraitsArray.value.filter(egg => egg.AppId === itemId);
    }

    const getControlLookup = async (platform: ControllerPlatformType) => {
        const controlsArray = await props.dataJsonService.getControlMapping(platform);
        if (!controlsArray.isSuccess) return [];
        return controlsArray.value;
    }

    const getAdditionalData = (itemDetail: GameItemModel): Array<any> => {
        const additionalData = [];
        if (itemDetail.BlueprintSource !== null && itemDetail.BlueprintSource !== BlueprintSource.unknown) {
            const bpSourceLangKey = blueprintToLocalKey(itemDetail.BlueprintSource);
            additionalData.push({ text: `${i18next.t(LocaleKey.blueprintFrom).toString()}: ${i18next.t(bpSourceLangKey).toString()}` });
        }

        if (itemDetail.MaxStackSize !== null && itemDetail.MaxStackSize > 0.1) {
            additionalData.push({ text: `${i18next.t(LocaleKey.maxStackSize).toString()}: ${itemDetail.MaxStackSize}` });
        }

        if (itemDetail.BaseValueUnits > 1) {
            switch (itemDetail.CurrencyType) {
                case CurrencyType.CREDITS:
                    additionalData.push({ text: itemDetail.BaseValueUnits, image: '/assets/images/credits.png', tooltip: 'Units' });
                    break;
                case CurrencyType.QUICKSILVER:
                    additionalData.push({ text: itemDetail.BaseValueUnits, image: '/assets/images/rawMaterials/57.png', tooltip: 'Quicksilver' });
                    break;
            }
        }

        const bpCost = itemDetail.BlueprintCost;
        if (bpCost > 0) {
            switch (itemDetail.BlueprintCostType) {
                case CurrencyType.NANITES:
                    const bpCostText = i18next.t(LocaleKey.blueprintCost);
                    additionalData.push({ text: `${bpCostText}: ${bpCost}`, image: '/assets/images/nanites.png', tooltip: 'Nanites' });
                    break;
                case CurrencyType.SALVAGEDDATA:
                    additionalData.push({ text: itemDetail.BlueprintCost, image: '/assets/images/curiosities/16.png', tooltip: 'Salvaged Data' });
                    break;
                case CurrencyType.FACTORYOVERRIDE:
                    additionalData.push({ text: itemDetail.BlueprintCost, image: '/assets/images/special/factoryOverride.png', tooltip: 'Factory Override Unit' });
                    break;
                case CurrencyType.NONE:
                default:
                    break;
            }
        }

        if (itemDetail.CookingValue != null && itemDetail.CookingValue > 0.0) {
            const cookingVText = i18next.t(LocaleKey.cookingValue);
            const cookingV = (itemDetail.CookingValue * 100.0);
            additionalData.push({ text: `${cookingVText}: ${cookingV}%`, icon: 'fastfood' });
        }

        if (itemDetail.Power != null && itemDetail.Power !== 0) {
            additionalData.push({ text: itemDetail.Power.toString(), icon: 'flash_on' });
        }

        return additionalData;
    }

    const addThisItemToCart = async () => {
        const quantityResult = await getQuantityDialog(i18next.t(LocaleKey.quantity));
        if (quantityResult.isSuccess === false) return;

        if (props.addItemToCart == null) return;
        props.addItemToCart(item, quantityResult.value);
        // TODO - translate
        props.toastService.success(`Added ${item.Name} to cart`);
    }

    const addThisItemToFavourites = () => {
        if (props.addItemToFavourites == null) return;
        props.addItemToFavourites(item);
        // TODO - translate
        props.toastService.success('Added to Favourites');
    }

    const removeThisItemToFavourites = () => {
        if (props.removeItemToFavourites == null) return;
        props.removeItemToFavourites(item.Id);
        // TODO - translate
        props.toastService.success('Removed from Favourites');
    }

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
            networkState={networkState}
            additionalData={additionalData}
            addThisItemToCart={addThisItemToCart}
            addThisItemToFavourites={addThisItemToFavourites}
            removeThisItemToFavourites={removeThisItemToFavourites}
        />
    );
}

export const CatalogueItemContainer = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps, mapDispatchToProps)(CatalogueItemContainerUnconnected),
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
        allGameItemsService: services.allGameItemsService,
        rechargeByService: services.rechargeByService,
        dataJsonService: services.dataJsonService,
        toastService: services.toastService,
    })
);
