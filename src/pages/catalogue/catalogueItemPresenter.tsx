import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { State } from '../../redux/state';
import { GameItemService } from '../../services/GameItemService';
import { anyObject } from '../../helper/TypescriptHacks';
import { LocaleKey } from '../../localization/LocaleKey';
import { NavBar } from '../../components/core/navbar/navbar';
import { GameItemModel } from '../../contracts/GameItemModel';
import { BlueprintSource, blueprintToLocalKey } from '../../contracts/enum/BlueprintSource';
import { CurrencyType } from '../../contracts/enum/CurrencyType';

import i18next from 'i18next';
import { AllGameItemsService } from '../../services/AllGameItemsService';
import { GameItemList } from '../../components/common/gameItemList/gameItemList';
import { RequiredItemListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemListTile';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';

interface IProps {
    location: any;
    match: any;
    history: any;
    selectedLanguage?: string;
}
interface IState {
    item: GameItemModel;
    resArray: Array<RequiredItemDetails>;
    usedToCreateArray: Array<GameItemModel>;
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
            gameItemService: new GameItemService(),
            allGameItemsService: new AllGameItemsService(),
            additionalData: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        const prevSelectedLanguage = prevProps.selectedLanguage;
        if (this.props.selectedLanguage !== prevSelectedLanguage) {
            this.fetchData();
        }
    }

    fetchData = async () => {
        var itemResult = await this.state.gameItemService.getItemDetails(this.props.match?.params?.itemId ?? '');
        if (!itemResult.isSuccess) {
            // Error
            return;
        }
        this.getResArray(itemResult.value.Id);
        this.getUsedToCreateArray(itemResult.value.Id);
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

    displayRequiredItems = (resArray: Array<RequiredItemDetails>) => {
        if (resArray == null || resArray.length < 1) return null;

        return (
            <div className="row">
                <div className="col-12">
                    <h4>{i18next.t(LocaleKey.craftedUsing)}</h4>
                </div>
                <div className="col-12">
                    <GameItemList items={resArray} presenter={RequiredItemListTile} />
                </div>
            </div>
        );
    }

    displayUsedToCreateItems = (usedToCreateArray: Array<GameItemModel>) => {
        if (usedToCreateArray == null || usedToCreateArray.length < 1) return null;

        return (
            <div className="row">
                <div className="col-12">
                    <h4>{i18next.t(LocaleKey.usedToCreate)}</h4>
                </div>
                <div className="col-12">
                    <GameItemList items={usedToCreateArray} />
                </div>
            </div>
        );
    }

    render() {
        return (
            <>
                <NavBar title={this.state.item.Name} />
                <div className="content">
                    <div className="row">
                        <div className="col-12 col-lg-2 col-md-2 col-sm-2 col-xs-3 image-container generic-item-image-container"
                            style={{ backgroundColor: `#${this.state.item.Colour}` }}>
                            <img src={`/assets/images/${this.state.item.Icon}`} alt={this.state.item.Name} style={{ maxWidth: '100%' }} />
                        </div>
                        <div className="col-12 col-lg-10 col-md-10 col-sm-10 col-xs-9">
                            <h2 className="ta-left ta-center-sm">{this.state.item.Name}</h2>
                            {
                                this.state.item.Group
                                    ? <h3 className="ta-left ta-center-sm" style={{ margin: 0 }}>{this.state.item.Group}</h3>
                                    : null
                            }
                        </div>
                    </div >
                    <hr />
                    <div className="row">
                        <div className="col-12">
                            <h4>{this.state.item.Description}</h4>
                        </div>
                    </div>
                    <div className="row" style={{ justifyContent: 'center' }}>
                        {
                            this.state.additionalData.map((item, index) => {
                                return (
                                    <div className={item.class} key={`additional-data-${index}`}>
                                        <h5 className="default chip">
                                            {item.text}&nbsp;
                                            {
                                                (item.image != null && item.image.length > 0)
                                                    ? <img src={item.image} alt={item.image} style={{ maxHeight: '20px' }} />
                                                    : null
                                            }
                                        </h5>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <hr />
                    {this.displayRequiredItems(this.state.resArray)}
                    {this.displayUsedToCreateItems(this.state.usedToCreateArray)}
                </div>
            </>
        );
    }
}


export const mapStateToProps = (state: State) => {
    return {
        selectedLanguage: state.settingReducer.selectedLanguage,
    };
};

export const CatalogueItemPresenter = connect(mapStateToProps)(withRouter(CatalogueItemPresenterUnconnected));