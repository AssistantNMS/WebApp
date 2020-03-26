import React from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

import { anyObject } from '../../helper/TypescriptHacks';
import { setDocumentTitle } from '../../helper/DocumentHelper';
import { mapProcessorToRequiredItems } from '../../mapper/RequiredItemMapper';
import { LocaleKey } from '../../localization/LocaleKey';
import { mapStateToProps, mapDispatchToProps } from './catalogueItem.Redux';

import { Processor } from '../../contracts/Processor';
import { GameItemModel } from '../../contracts/GameItemModel';
import { BlueprintSource, blueprintToLocalKey } from '../../contracts/enum/BlueprintSource';
import { CurrencyType } from '../../contracts/enum/CurrencyType';

import { NavBar } from '../../components/core/navbar/navbar';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { RequiredItemDetailsListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile';
import { RequiredItemListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemListTile';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { GenericItemListTile } from '../../components/tilePresenter/genericItemListTile/genericItemListTile';
import { RefinerItemListTile } from '../../components/tilePresenter/processorItemListTile/refinerItemListTile';
import { NutrientProcessorListTile } from '../../components/tilePresenter/processorItemListTile/nutrientProcessorListTile';
import { CartFloatingActionButton } from '../../components/floatingActionButton/cartFloatingActionButton';

import { GameItemService } from '../../services/GameItemService';
import { AllGameItemsService } from '../../services/AllGameItemsService';
import { IdPrefix } from '../../constants/IdPrefix';

interface IProps {
    location: any;
    match: any;
    history: any;
    selectedLanguage?: string;
    addItemToCart?: (item: GameItemModel, quantity: number) => void;
}
interface IState {
    item: GameItemModel;
    resArray: Array<RequiredItemDetails>;
    usedToCreateArray: Array<GameItemModel>;
    refArray: Array<Processor>;
    usedToRefArray: Array<Processor>;
    cookArray: Array<Processor>;
    usedToCookArray: Array<Processor>;
    gameItemService: GameItemService;
    allGameItemsService: AllGameItemsService;
    additionalData: Array<any>;
}

export class CatalogueItemPresenterUnconnected extends React.Component<IProps, IState> {
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
            gameItemService: new GameItemService(),
            allGameItemsService: new AllGameItemsService(),
            additionalData: []
        }
    }

    componentDidMount() {
        this.fetchData(this.props.match?.params?.itemId);
    }

    // componentWillReceiveProps(nextProps: any) {
    //     const prevItemId = this.props.match?.params?.itemId;
    //     if (nextProps.match?.params?.itemId !== prevItemId) {
    //         this.clearData();
    //         this.fetchData(nextProps.match?.params?.itemId);
    //     }
    // }

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
                additionalData: []
            }
        });
    }

    fetchData = async (itemId: string) => {
        var itemResult = await this.state.gameItemService.getItemDetails(itemId ?? '');
        if (!itemResult.isSuccess) {
            // Error
            return;
        }

        setDocumentTitle(itemResult.value.Name);
        this.getResArray(itemResult.value.Id);
        this.getUsedToCreateArray(itemResult.value.Id);
        this.getRefArray(itemResult.value.Id);
        this.getUsedToRefArray(itemResult.value.Id);
        this.getCookArray(itemResult.value.Id);
        this.getUsedToCookArray(itemResult.value.Id);
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
        const smallChip = 'col-12 col-lg-4 col-md-6 col-sm-6 col-xs-6';
        const largeChip = 'col-12 col-lg-4 col-md-6 col-sm-12 col-xs-12';

        const additionalData = [];
        if (itemDetail.BlueprintSource !== null && itemDetail.BlueprintSource !== BlueprintSource.unknown) {
            const bpSourceLangKey = blueprintToLocalKey(itemDetail.BlueprintSource);
            additionalData.push({ text: `${i18next.t(LocaleKey.blueprintFrom).toString()}: ${i18next.t(bpSourceLangKey).toString()}`, class: largeChip });
        }

        if (itemDetail.MaxStackSize !== null && itemDetail.MaxStackSize > 0.1) {
            additionalData.push({ text: `${i18next.t(LocaleKey.maxStackSize).toString()}: ${itemDetail.MaxStackSize}`, class: smallChip });
        }

        if (itemDetail.BaseValueUnits > 1) {
            switch (itemDetail.CurrencyType) {
                case CurrencyType.NONE:
                    break;
                case CurrencyType.NANITES:
                    additionalData.push({ text: itemDetail.BaseValueUnits, image: '/assets/images/nanites.png', class: smallChip });
                    break;
                case CurrencyType.CREDITS:
                    additionalData.push({ text: itemDetail.BaseValueUnits, image: '/assets/images/credits.png', class: smallChip });
                    break;
                case CurrencyType.QUICKSILVER:
                    additionalData.push({ text: itemDetail.BaseValueUnits, image: '/assets/images/rawMaterials/57.png', class: smallChip });
                    break;
            }
        }
        return additionalData;
    }

    displayAdditionalData = (additionalData: Array<any>) => {
        if (additionalData == null || additionalData.length === 0) return null;

        return (
            <div className="row justify " style={{ marginTop: '1em', paddingBottom: '.5em' }}>
                {
                    additionalData.map((item, index) => {
                        return (
                            <div className={item.class} key={`additional-data-${index}`}>
                                <h4 className="default chip">
                                    {item.text}&nbsp;
                                            {
                                        (item.image != null && item.image.length > 0)
                                            ? <img src={item.image} alt={item.image} style={{ maxHeight: '20px' }} />
                                            : null
                                    }
                                </h4>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    displayRequiredItems = (resArray: Array<RequiredItemDetails>) => {
        if (resArray == null || resArray.length < 1) return null;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>{i18next.t(LocaleKey.craftedUsing)}</h3>
                    </div>
                    <div className="col-12">
                        <GenericListPresenter list={resArray} presenter={RequiredItemDetailsListTile} />
                    </div>
                </div>
                <hr className="mt-3em" />
            </>
        );
    }

    displayUsedToCreateItems = (usedToCreateArray: Array<GameItemModel>) => {
        if (usedToCreateArray == null || usedToCreateArray.length < 1) return null;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>{i18next.t(LocaleKey.usedToCreate)}</h3>
                    </div>
                    <div className="col-12">
                        <GenericListPresenter list={usedToCreateArray} presenter={GenericItemListTile} />
                    </div>
                </div>
                <hr className="mt-3em" />
            </>
        );
    }

    displayRefItems = (refRecipesArray: Array<Processor>) => {
        if (refRecipesArray == null || refRecipesArray.length < 1) return null;
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>{i18next.t(LocaleKey.refinedUsing)}</h3>
                    </div>
                    <div className="col-12">
                        <GenericListPresenter list={refRecipesArray} presenter={RefinerItemListTile} />
                    </div>
                </div>
                <hr className="mt-3em" />
            </>
        );
    }

    displayUsedToRefItems = (usedToRefArray: Array<Processor>) => {
        if (usedToRefArray == null || usedToRefArray.length < 1) return null;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>{i18next.t(LocaleKey.refineToCreate).replace('{0}', this.state.item.Name)}</h3>
                    </div>
                    <div className="col-12">
                        <GenericListPresenter list={mapProcessorToRequiredItems(usedToRefArray)} presenter={RequiredItemListTile} />
                    </div>
                </div>
                <hr className="mt-3em" />
            </>
        );
    }

    displayCookItems = (cookRecipesArray: Array<Processor>) => {
        if (cookRecipesArray == null || cookRecipesArray.length < 1) return null;
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>{i18next.t(LocaleKey.cookingRecipe)}</h3>
                    </div>
                    <div className="col-12">
                        <GenericListPresenter list={cookRecipesArray} presenter={NutrientProcessorListTile} />
                    </div>
                </div>
                <hr className="mt-3em" />
            </>
        );
    }

    displayUsedToCookItems = (usedToCookArray: Array<Processor>) => {
        if (usedToCookArray == null || usedToCookArray.length < 1) return null;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>{i18next.t(LocaleKey.cookToCreate).replace('{0}', this.state.item.Name)}</h3>
                    </div>
                    <div className="col-12">
                        <GenericListPresenter list={mapProcessorToRequiredItems(usedToCookArray)} presenter={RequiredItemListTile} />
                    </div>
                </div>
                <hr className="mt-3em" />
            </>
        );
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

    getFloatingActionButtons = () => {
        const components: any[] = [];
        if (this.state.item == null || this.state.item.Id == null) return null;
        if (!this.state.item.Id.includes(IdPrefix.Cooking)) {
            components.push(CartFloatingActionButton(this.addThisItemToCart));
        }
        return components;
    }

    render() {
        return (
            <>
                <NavBar title={this.state.item.Name} />
                <div className="content">
                    <div className="row border-bottom">
                        <div className="col-12 col-lg-2 col-md-2 col-sm-2 col-xs-3 image-container generic-item-image-container"
                            style={{ backgroundColor: `#${this.state.item.Colour}` }}>
                            <img src={`/assets/images/${this.state.item.Icon}`} alt={this.state.item.Name} style={{ maxWidth: '100%' }} />
                        </div>
                        <div className="col-12 col-lg-10 col-md-10 col-sm-10 col-xs-9">
                            <h2 className="ta-left ta-center-sm" style={{ marginBottom: 0 }}>{this.state.item.Name}</h2>
                            {
                                this.state.item.Group
                                    ? <h3 className="ta-left ta-center-sm" style={{ marginTop: 0 }}>{this.state.item.Group}</h3>
                                    : null
                            }
                            <h5 className="ta-left ta-center-sm">{this.state.item.Description}</h5>
                        </div>
                    </div>
                    {this.displayAdditionalData(this.state.additionalData)}
                    {this.displayRequiredItems(this.state.resArray)}
                    {this.displayUsedToCreateItems(this.state.usedToCreateArray)}
                    {this.displayRefItems(this.state.refArray)}
                    {this.displayUsedToRefItems(this.state.usedToRefArray)}
                    {this.displayCookItems(this.state.cookArray)}
                    {this.displayUsedToCookItems(this.state.usedToCookArray)}
                </div>

                {this.getFloatingActionButtons()}
            </>
        );
    }
}

export const CatalogueItemPresenter = connect(mapStateToProps, mapDispatchToProps)(withRouter(CatalogueItemPresenterUnconnected));