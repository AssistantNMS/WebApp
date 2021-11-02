import i18next from 'i18next';
import React from 'react';
import { connect } from 'react-redux';

import { NetworkState } from '../../constants/NetworkState';
import { BlueprintSource, blueprintToLocalKey } from '../../contracts/enum/BlueprintSource';
import { CurrencyType } from '../../contracts/enum/CurrencyType';
import { FavouriteItem } from '../../contracts/favourite/favouriteItem';
import { GameItemModel } from '../../contracts/GameItemModel';
import { Processor } from '../../contracts/Processor';
import { Recharge } from '../../contracts/recharge/recharge';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { getQuantityDialog } from '../../helper/dialogHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { AllGameItemsService } from '../../services/json/AllGameItemsService';
import { GameItemService } from '../../services/json/GameItemService';
import { RechargeByService } from '../../services/json/RechargeByService';
import { ToastService } from '../../services/toastService';
import { mapDispatchToProps, mapStateToProps } from './catalogueItem.Redux';
import { CatalogueItemPresenter } from './catalogueItemPresenter';

interface IWithDepInj {
    gameItemService: GameItemService;
    allGameItemsService: AllGameItemsService;
    rechargeByService: RechargeByService;
    toastService: ToastService;
}
interface IWithoutDepInj {
    location: any;
    match: any;
    history: any;
    selectedLanguage?: string;
    favourites: Array<FavouriteItem>;
    addItemToCart?: (item: GameItemModel, quantity: number) => void;
    addItemToFavourites?: (item: GameItemModel) => void;
    removeItemToFavourites?: (itemId: string) => void;
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

interface IState {
    item: GameItemModel;
    resArray: Array<RequiredItemDetails>;
    usedToCreateArray: Array<GameItemModel>;
    refArray: Array<Processor>;
    usedToRefArray: Array<Processor>;
    cookArray: Array<Processor>;
    usedToCookArray: Array<Processor>;
    rechargedBy: Recharge;
    usedToRechargeArray: Array<Recharge>;
    networkState: NetworkState;
    additionalData: Array<any>;
}

class CatalogueItemContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            item: anyObject,
            resArray: [],
            usedToCreateArray: [],
            refArray: [],
            usedToRefArray: [],
            cookArray: [],
            usedToCookArray: [],
            rechargedBy: anyObject,
            usedToRechargeArray: [],
            networkState: NetworkState.Loading,
            additionalData: []
        }
    }

    componentDidMount() {
        this.fetchData(this.props.match?.params?.itemId);
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        const prevSelectedLanguage = prevProps.selectedLanguage;
        const prevItemId = prevProps.match?.params?.itemId;
        if (this.props.selectedLanguage !== prevSelectedLanguage || this.props.match?.params?.itemId !== prevItemId) {
            this.clearData();
            this.fetchData(this.props.match?.params?.itemId);
        }
    }

    clearData = async () => {
        this.setState(() => {
            return {
                resArray: [],
                usedToCreateArray: [],
                refArray: [],
                usedToRefArray: [],
                cookArray: [],
                usedToCookArray: [],
                rechargedBy: anyObject,
                usedToRechargeArray: [],
                additionalData: [],
                networkState: NetworkState.Loading,
            }
        });
    }

    fetchData = async (itemId: string) => {
        this.setState(() => {
            return {
                networkState: NetworkState.Loading,
            }
        });
        const itemResult = await this.props.gameItemService.getItemDetails(itemId ?? '');
        if (!itemResult.isSuccess) {
            this.setState(() => {
                return {
                    networkState: NetworkState.Error,
                }
            });
            return;
        }

        const resArray = await this.getResArray(itemResult.value.Id);
        const usedToCreateArray = await this.getUsedToCreateArray(itemResult.value.Id);
        const refArray = await this.getRefArray(itemResult.value.Id);
        const usedToRefArray = await this.getUsedToRefArray(itemResult.value.Id);
        const cookArray = await this.getCookArray(itemResult.value.Id);
        const usedToCookArray = await this.getUsedToCookArray(itemResult.value.Id);
        const rechargedBy = await this.getRechargeByArray(itemResult.value.Id);
        const usedToRechargeArray = await this.getUsedToRechargeArray(itemResult.value.Id);
        this.setState(() => {
            return {
                item: itemResult.value,
                resArray: resArray ?? [],
                usedToCreateArray: usedToCreateArray ?? [],
                refArray: refArray ?? [],
                usedToRefArray: usedToRefArray ?? [],
                cookArray: cookArray ?? [],
                usedToCookArray: usedToCookArray ?? [],
                rechargedBy: rechargedBy ?? anyObject,
                usedToRechargeArray: usedToRechargeArray ?? [],
                additionalData: this.getAdditionalData(itemResult.value),
                networkState: NetworkState.Success,
            }
        });
    }

    getResArray = async (itemId: string) => {
        const resArrayResult = await this.props.gameItemService.getRequiredItems(itemId);
        if (!resArrayResult.isSuccess) return;
        return resArrayResult.value;
    }

    getUsedToCreateArray = async (itemId: string) => {
        const usedToCreateArrayResult = await this.props.allGameItemsService.getByInputsId(itemId);
        if (!usedToCreateArrayResult.isSuccess) return;
        return usedToCreateArrayResult.value;
    }

    getRechargeByArray = async (itemId: string) => {
        const rechargeByResult = await this.props.rechargeByService.getRechargeById(itemId);
        if (!rechargeByResult.isSuccess) return;
        return rechargeByResult.value;
    }

    getUsedToRechargeArray = async (itemId: string) => {
        const usedToRechargeResult = await this.props.rechargeByService.getRechargeByChargeById(itemId);
        console.log(usedToRechargeResult);
        if (!usedToRechargeResult.isSuccess) return;
        return usedToRechargeResult.value;
    }

    getRefArray = async (itemId: string) => {
        const refArray = await this.props.gameItemService.getRefinedByOutput(itemId);
        if (!refArray.isSuccess) return;
        return refArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length);
    }

    getUsedToRefArray = async (itemId: string) => {
        const usedToRefArray = await this.props.gameItemService.getRefinedByInput(itemId);
        if (!usedToRefArray.isSuccess) return;
        return usedToRefArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length);
    }

    getCookArray = async (itemId: string) => {
        const cookArray = await this.props.gameItemService.getCookingByOutput(itemId);
        if (!cookArray.isSuccess) return;
        return cookArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length);
    }

    getUsedToCookArray = async (itemId: string) => {
        const usedToCookArray = await this.props.gameItemService.getCookingByInput(itemId);
        if (!usedToCookArray.isSuccess) return;
        return usedToCookArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length);
    }

    getAdditionalData = (itemDetail: GameItemModel): Array<any> => {
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
                additionalData.push({ text: itemDetail.BlueprintCost, image: '/assets/images/curiosities/44.png', tooltip: 'Salvaged Data' });
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

    addThisItemToCart = async () => {
        const quantityResult = await getQuantityDialog(i18next.t(LocaleKey.quantity));
        if (quantityResult.isSuccess === false) return;

        if (this.props.addItemToCart == null) return;
        this.props.addItemToCart(this.state.item, quantityResult.value);
        this.props.toastService.success(`Added ${this.state.item.Name} to cart`);
    }

    addThisItemToFavourites = () => {
        if (this.props.addItemToFavourites == null) return;
        this.props.addItemToFavourites(this.state.item);
        this.props.toastService.success('Added to Favourites');
    }

    removeThisItemToFavourites = () => {
        if (this.props.removeItemToFavourites == null) return;
        this.props.removeItemToFavourites(this.state.item.Id);
        this.props.toastService.success('Removed from Favourites');
    }

    render() {
        return (
            <CatalogueItemPresenter
                {...this.state} {...this.props}
                addThisItemToCart={this.addThisItemToCart}
                addThisItemToFavourites={this.addThisItemToFavourites}
                removeThisItemToFavourites={this.removeThisItemToFavourites}
            />
        );
    }
}

export const CatalogueItemContainer = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps, mapDispatchToProps)(CatalogueItemContainerUnconnected),
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
        allGameItemsService: services.allGameItemsService,
        rechargeByService: services.rechargeByService,
        toastService: services.toastService,
    })
);
