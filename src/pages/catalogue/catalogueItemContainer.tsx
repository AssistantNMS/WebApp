import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NetworkState } from '../../constants/NetworkState';
import { EggNeuralTrait } from '../../contracts/data/eggNeuralTrait';
import { BlueprintSource, blueprintToLocalKey } from '../../contracts/enum/BlueprintSource';
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

interface IWithDepInj {
    gameItemService: GameItemService;
    allGameItemsService: AllGameItemsService;
    rechargeByService: RechargeByService;
    dataJsonService: DataJsonService;
    toastService: ToastService;
}
interface IWithoutDepInj { }

interface IProps extends IWithDepInj, IWithoutDepInj, IReduxProps { }


const CatalogueItemContainerUnconnected: React.FC<IProps> = (props: IProps) => {
    let { langCode, itemId } = useParams();

    const [item, setItem] = useState<GameItemModel>(anyObject);
    const [resArray, setResArray] = useState<Array<RequiredItemDetails>>([]);
    const [usedToCreateArray, setUsedToCreateArray] = useState<Array<GameItemModel>>([]);
    const [refArray, setRefArray] = useState<Array<Processor>>([]);
    const [usedToRefArray, setUsedToRefArray] = useState<Array<Processor>>([]);
    const [cookArray, setCookArray] = useState<Array<Processor>>([]);
    const [usedToCookArray, setUsedToCookArray] = useState<Array<Processor>>([]);
    const [rechargedBy, setRechargedBy] = useState<Recharge>(anyObject);
    const [usedToRechargeArray, setUsedToRechargeArray] = useState<Array<Recharge>>([]);
    const [eggTraitArray, setEggTraitArray] = useState<Array<EggNeuralTrait>>([]);
    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);
    const [additionalData, setAdditionalData] = useState<Array<any>>([]);

    useEffect(() => {
        if (langCode != null) {
            const indexOfLang = localeMap.findIndex(l => l.code === langCode);
            if (indexOfLang > -1) {
                if (langCode !== props.selectedLanguage) props.setLanguage(props.selectedLanguage!);
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
        setResArray([]);
        setUsedToCreateArray([]);
        setRefArray([]);
        setUsedToRefArray([]);
        setCookArray([]);
        setUsedToCookArray([]);
        setRechargedBy(anyObject);
        setUsedToRechargeArray([]);
        setAdditionalData([]);
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

        const resArray = await getResArray(itemResult.value.Id);
        const usedToCreateArray = await getUsedToCreateArray(itemResult.value.Id);
        const refArray = await getRefArray(itemResult.value.Id);
        const usedToRefArray = await getUsedToRefArray(itemResult.value.Id);
        const cookArray = await getCookArray(itemResult.value.Id);
        const usedToCookArray = await getUsedToCookArray(itemResult.value.Id);
        const rechargedBy = await getRechargeByArray(itemResult.value.Id);
        const usedToRechargeArray = await getUsedToRechargeArray(itemResult.value.Id);
        const eggTraitArray = await getEggTraitArray(itemResult.value.Id);

        setItem(itemResult.value);
        setResArray(resArray ?? []);
        setUsedToCreateArray(usedToCreateArray ?? []);
        setRefArray(refArray ?? []);
        setUsedToRefArray(usedToRefArray ?? []);
        setCookArray(cookArray ?? []);
        setUsedToCookArray(usedToCookArray ?? []);
        setRechargedBy(rechargedBy ?? anyObject);
        setUsedToRechargeArray(usedToRechargeArray ?? []);
        setEggTraitArray(eggTraitArray ?? []);
        setAdditionalData(getAdditionalData(itemResult.value));

        setNetworkState(NetworkState.Success);
    }

    const getResArray = async (itemId: string) => {
        const resArrayResult = await props.gameItemService.getRequiredItems(itemId);
        if (!resArrayResult.isSuccess) return [];
        return resArrayResult.value;
    }

    const getUsedToCreateArray = async (itemId: string) => {
        const usedToCreateArrayResult = await props.allGameItemsService.getByInputsId(itemId);
        if (!usedToCreateArrayResult.isSuccess) return [];
        return usedToCreateArrayResult.value;
    }

    const getRechargeByArray = async (itemId: string) => {
        const rechargeByResult = await props.rechargeByService.getRechargeById(itemId);
        if (!rechargeByResult.isSuccess) return anyObject;
        return rechargeByResult.value;
    }

    const getUsedToRechargeArray = async (itemId: string) => {
        const usedToRechargeResult = await props.rechargeByService.getRechargeByChargeById(itemId);
        if (!usedToRechargeResult.isSuccess) return [];
        return usedToRechargeResult.value;
    }

    const getRefArray = async (itemId: string) => {
        const refArray = await props.gameItemService.getRefinedByOutput(itemId);
        if (!refArray.isSuccess) return [];
        return refArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length);
    }

    const getUsedToRefArray = async (itemId: string) => {
        const usedToRefArray = await props.gameItemService.getRefinedByInput(itemId);
        if (!usedToRefArray.isSuccess) return [];
        return usedToRefArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length);
    }

    const getCookArray = async (itemId: string) => {
        const cookArray = await props.gameItemService.getCookingByOutput(itemId);
        if (!cookArray.isSuccess) return [];
        return cookArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length);
    }

    const getUsedToCookArray = async (itemId: string) => {
        const usedToCookArray = await props.gameItemService.getCookingByInput(itemId);
        if (!usedToCookArray.isSuccess) return [];
        return usedToCookArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length);
    }

    const getEggTraitArray = async (itemId: string) => {
        const eggTraitsArray = await props.dataJsonService.getEggNeuralTraits();
        if (!eggTraitsArray.isSuccess) return [];
        return eggTraitsArray.value.filter(egg => egg.AppId === itemId);
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

        switch (itemDetail.BlueprintCostType) {
            case CurrencyType.NANITES:
                const bpCostText = i18next.t(LocaleKey.blueprintCost);
                const bpCost = itemDetail.BlueprintCost;
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

    return (
        <CatalogueItemPresenter
            {...props}
            item={item}
            resArray={resArray}
            usedToCreateArray={usedToCreateArray}
            refArray={refArray}
            usedToRefArray={usedToRefArray}
            cookArray={cookArray}
            usedToCookArray={usedToCookArray}
            rechargedBy={rechargedBy}
            usedToRechargeArray={usedToRechargeArray}
            eggTraitArray={eggTraitArray}
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
