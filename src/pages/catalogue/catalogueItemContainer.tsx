import i18next from 'i18next';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BlueprintSource, blueprintToLocalKey } from '../../contracts/enum/BlueprintSource';
import { CurrencyType } from '../../contracts/enum/CurrencyType';
import { FavouriteItem } from '../../contracts/favourite/favouriteItem';
import { GameItemModel } from '../../contracts/GameItemModel';
import { Processor } from '../../contracts/Processor';
import { Recharge } from '../../contracts/recharge/recharge';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { anyObject } from '../../helper/typescriptHacks';
import { LocaleKey } from '../../localization/LocaleKey';
import { AllGameItemsService } from '../../services/AllGameItemsService';
import { GameItemService } from '../../services/GameItemService';
import { RechargeByService } from '../../services/RechargeByService';
import { mapDispatchToProps, mapStateToProps } from './catalogueItem.Redux';
import { CatalogueItemPresenter } from './catalogueItemPresenter';

interface IProps {
    location: any;
    match: any;
    history: any;
    selectedLanguage?: string;
    favourites: Array<FavouriteItem>;
    addItemToCart?: (item: GameItemModel, quantity: number) => void;
    addItemToFavourites?: (item: GameItemModel) => void;
    removeItemToFavourites?: (itemId: string) => void;
}

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
    gameItemService: GameItemService;
    allGameItemsService: AllGameItemsService;
    rechargeByService: RechargeByService;
    additionalData: Array<any>;
}

export class CatalogueItemContainerUnconnected extends React.Component<IProps, IState> {
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
            gameItemService: new GameItemService(),
            allGameItemsService: new AllGameItemsService(),
            rechargeByService: new RechargeByService(),
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
                additionalData: []
            }
        });
    }

    fetchData = async (itemId: string) => {
        var itemResult = await this.state.gameItemService.getItemDetails(itemId ?? '');
        if (!itemResult.isSuccess) return;

        this.getResArray(itemResult.value.Id);
        this.getUsedToCreateArray(itemResult.value.Id);
        this.getRefArray(itemResult.value.Id);
        this.getUsedToRefArray(itemResult.value.Id);
        this.getCookArray(itemResult.value.Id);
        this.getUsedToCookArray(itemResult.value.Id);
        this.getRechargeByArray(itemResult.value.Id);
        this.getUsedToRechargeArray(itemResult.value.Id);
        this.setState(() => {
            return {
                item: itemResult.value,
                additionalData: this.getAdditionalData(itemResult.value)
            }
        });
    }

    getResArray = async (itemId: string) => {
        var resArrayResult = await this.state.gameItemService.getRequiredItems(itemId);
        if (!resArrayResult.isSuccess) return;
        this.setState(() => {
            return {
                resArray: resArrayResult.value,
            }
        });
    }

    getUsedToCreateArray = async (itemId: string) => {
        var usedToCreateArrayResult = await this.state.allGameItemsService.getByInputsId(itemId);
        if (!usedToCreateArrayResult.isSuccess) return;
        this.setState(() => {
            return {
                usedToCreateArray: usedToCreateArrayResult.value,
            }
        });
    }

    getRechargeByArray = async (itemId: string) => {
        var rechargeByResult = await this.state.rechargeByService.getRechargeById(itemId);
        if (!rechargeByResult.isSuccess) return;
        this.setState(() => {
            return {
                rechargedBy: rechargeByResult.value,
            }
        });
    }

    getUsedToRechargeArray = async (itemId: string) => {
        var usedToRechargeResult = await this.state.rechargeByService.getRechargeByChargeById(itemId);
        console.log(usedToRechargeResult);
        if (!usedToRechargeResult.isSuccess) return;
        this.setState(() => {
            return {
                usedToRechargeArray: usedToRechargeResult.value,
            }
        });
    }

    getRefArray = async (itemId: string) => {
        var refArray = await this.state.gameItemService.getRefinedByOutput(itemId);
        if (!refArray.isSuccess) return;
        this.setState(() => {
            return {
                refArray: refArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length),
            }
        });
    }

    getUsedToRefArray = async (itemId: string) => {
        var usedToRefArray = await this.state.gameItemService.getRefinedByInput(itemId);
        if (!usedToRefArray.isSuccess) return;
        this.setState(() => {
            return {
                usedToRefArray: usedToRefArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length),
            }
        });
    }

    getCookArray = async (itemId: string) => {
        var cookArray = await this.state.gameItemService.getCookingByOutput(itemId);
        if (!cookArray.isSuccess) return;
        this.setState(() => {
            return {
                cookArray: cookArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length),
            }
        });
    }

    getUsedToCookArray = async (itemId: string) => {
        var usedToCookArray = await this.state.gameItemService.getCookingByInput(itemId);
        if (!usedToCookArray.isSuccess) return;
        this.setState(() => {
            return {
                usedToCookArray: usedToCookArray.value.sort((a: Processor, b: Processor) => a.Inputs.length - b.Inputs.length),
            }
        });
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
                case CurrencyType.NONE:
                    break;
                case CurrencyType.NANITES:
                    additionalData.push({ text: itemDetail.BaseValueUnits, image: '/assets/images/nanites.png' });
                    break;
                case CurrencyType.CREDITS:
                    additionalData.push({ text: itemDetail.BaseValueUnits, image: '/assets/images/credits.png' });
                    break;
                case CurrencyType.QUICKSILVER:
                    additionalData.push({ text: itemDetail.BaseValueUnits, image: '/assets/images/rawMaterials/57.png' });
                    break;
                case CurrencyType.SALVAGEDDATA:
                    additionalData.push({ text: itemDetail.BaseValueUnits, image: '/assets/images/curiosities/16.png' });
                    break;
            }
        }

        if (itemDetail.CurrencyType !== CurrencyType.NANITES &&
            itemDetail.HideBlueprintNaniteCost === false &&
            itemDetail.BlueprintNaniteCost != null &&
            itemDetail.BlueprintNaniteCost > 1) {
            const bpCostText = i18next.t(LocaleKey.blueprintCost);
            const bpCost = itemDetail.BlueprintNaniteCost;
            additionalData.push({ text: `${bpCostText}: ${bpCost}`, image: '/assets/images/nanites.png' });
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
        const { value: quantity } = await Swal.fire({
            title: i18next.t(LocaleKey.quantity),
            input: 'number',
            inputValue: '1',
            showCancelButton: true
        });
        if (this.props.addItemToCart == null) return;
        if (isNaN(quantity)) return;
        this.props.addItemToCart(this.state.item, quantity);
    }

    addThisItemToFavourites = () => {
        if (this.props.addItemToFavourites == null) return;
        this.props.addItemToFavourites(this.state.item);
    }

    removeThisItemToFavourites = () => {
        if (this.props.removeItemToFavourites == null) return;
        this.props.removeItemToFavourites(this.state.item.Id);
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

export const CatalogueItemContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(CatalogueItemContainerUnconnected));