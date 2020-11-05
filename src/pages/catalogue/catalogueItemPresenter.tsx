import i18next from 'i18next';
import React from 'react';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { AdditionalInfoChipRow } from '../../components/common/chip/additionalInfoChip';
import { ItemHeaderRow } from '../../components/core/itemHeaderRow';
import { CartFloatingActionButton } from '../../components/floatingActionButton/cartFloatingActionButton';
import { FavouriteFloatingActionButton } from '../../components/floatingActionButton/favouriteFloatingActionButton';
import { GenericItemWithRequirementsListTile } from '../../components/tilePresenter/genericItemListTile/genericItemWithRequirementsListTile';
import { ProcessorItemListTile } from '../../components/tilePresenter/processorItemListTile/processorItemListTile';
import { RequiredItemDetailsListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile';
import { IdPrefix } from '../../constants/IdPrefix';
import { FavouriteItem } from '../../contracts/favourite/favouriteItem';
import { GameItemModel } from '../../contracts/GameItemModel';
import { Processor } from '../../contracts/Processor';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { LocaleKey } from '../../localization/LocaleKey';
import { AllGameItemsService } from '../../services/AllGameItemsService';
import { GameItemService } from '../../services/GameItemService';
import { RechargeByService } from '../../services/RechargeByService';
import { ChargeBy } from '../../contracts/recharge/chargeBy';
import { Recharge } from '../../contracts/recharge/recharge';
import { ChargeByItemListTile } from '../../components/tilePresenter/recharge/chargeByItemListTile';
import { RechargeItemListTile } from '../../components/tilePresenter/recharge/rechargeItemListTile';

interface IProps {
    // Container Props
    selectedLanguage?: string;
    favourites: Array<FavouriteItem>;

    // Container State
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

    // Container Specific
    addThisItemToCart: () => void;
    addThisItemToFavourites: () => void;
    removeThisItemToFavourites: () => void;
}

export const CatalogueItemPresenter: React.FC<IProps> = (props: IProps) => {

    const displayRequiredItems = (resArray: Array<RequiredItemDetails>) => {
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

    const displayUsedToCreateItems = (usedToCreateArray: Array<GameItemModel>) => {
        if (usedToCreateArray == null || usedToCreateArray.length < 1) return null;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>{i18next.t(LocaleKey.usedToCreate)}</h3>
                    </div>
                    <div className="col-12">
                        <GenericListPresenter list={usedToCreateArray} presenter={GenericItemWithRequirementsListTile} />
                    </div>
                </div>
                <hr className="mt-3em" />
            </>
        );
    }

    const displayRechargedByItems = (rechargedBy: Recharge) => {
        if (rechargedBy == null || rechargedBy.ChargeBy == null || rechargedBy.ChargeBy.length < 1) return null;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>{i18next.t(LocaleKey.rechargeThisUsing)}</h3>
                    </div>
                    <div className="col-12">
                        <GenericListPresenter list={rechargedBy.ChargeBy} presenter={(item: ChargeBy) => <ChargeByItemListTile {...item} totalChargeAmount={rechargedBy.TotalChargeAmount} />} />
                    </div>
                </div>
                <hr className="mt-3em" />
            </>
        );
    }

    const displayUsedToRechargeItems = (usedToRechargeArray: Array<Recharge>) => {
        if (usedToRechargeArray == null || usedToRechargeArray.length < 1) return null;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>{i18next.t(LocaleKey.useXToRecharge).replace('{0}', props.item.Name)}</h3>
                    </div>
                    <div className="col-12">
                        <GenericListPresenter list={usedToRechargeArray} presenter={(item: Recharge) => <RechargeItemListTile {...item} currentItemId={props.item.Id} />} />
                    </div>
                </div>
                <hr className="mt-3em" />
            </>
        );
    }

    const displayRefItems = (refRecipesArray: Array<Processor>) => {
        if (refRecipesArray == null || refRecipesArray.length < 1) return null;
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>{i18next.t(LocaleKey.refinedUsing)}</h3>
                    </div>
                    <div className="col-12">
                        <GenericListPresenter list={refRecipesArray} presenter={ProcessorItemListTile} />
                    </div>
                </div>
                <hr className="mt-3em" />
            </>
        );
    }

    const displayUsedToRefItems = (usedToRefArray: Array<Processor>) => {
        if (usedToRefArray == null || usedToRefArray.length < 1) return null;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>{i18next.t(LocaleKey.refineToCreate).replace('{0}', props.item.Name)}</h3>
                    </div>
                    <div className="col-12">
                        <GenericListPresenter list={usedToRefArray} presenter={ProcessorItemListTile} />
                    </div>
                </div>
                <hr className="mt-3em" />
            </>
        );
    }

    const displayCookItems = (cookRecipesArray: Array<Processor>) => {
        if (cookRecipesArray == null || cookRecipesArray.length < 1) return null;
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>{i18next.t(LocaleKey.cookingRecipe)}</h3>
                    </div>
                    <div className="col-12">
                        <GenericListPresenter list={cookRecipesArray} presenter={ProcessorItemListTile} />
                    </div>
                </div>
                <hr className="mt-3em" />
            </>
        );
    }

    const displayUsedToCookItems = (usedToCookArray: Array<Processor>) => {
        if (usedToCookArray == null || usedToCookArray.length < 1) return null;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>{i18next.t(LocaleKey.cookToCreate).replace('{0}', props.item.Name)}</h3>
                    </div>
                    <div className="col-12">
                        <GenericListPresenter list={usedToCookArray} presenter={ProcessorItemListTile} />
                    </div>
                </div>
                <hr className="mt-3em" />
            </>
        );
    }
    const getFloatingActionButtons = () => {
        const components: any[] = [];
        if (props.item == null || props.item.Id == null) return null;
        if (!props.item.Id.includes(IdPrefix.Cooking)) {
            components.push(CartFloatingActionButton(props.addThisItemToCart));
        }
        const isFavourited = props.favourites.find(f => f.Id === props.item.Id) != null;
        components.push(FavouriteFloatingActionButton(isFavourited, props.addThisItemToFavourites, props.removeThisItemToFavourites));
        return components;
    }

    const title = props?.item?.Name;
    const description = props?.item?.Description;
    return (
        <>
            <HeadComponent title={title} description={description} />
            <NavBar title={title} />
            <div className="content">
                <ItemHeaderRow {...props.item} />
                <AdditionalInfoChipRow additionalData={props.additionalData} />
                {displayRequiredItems(props.resArray)}
                {displayUsedToCreateItems(props.usedToCreateArray)}
                {displayRechargedByItems(props.rechargedBy)}
                {displayUsedToRechargeItems(props.usedToRechargeArray)}
                {displayRefItems(props.refArray)}
                {displayUsedToRefItems(props.usedToRefArray)}
                {displayCookItems(props.cookArray)}
                {displayUsedToCookItems(props.usedToCookArray)}
            </div>

            {getFloatingActionButtons()}
            <div className="col-12" style={{ marginBottom: '2em', marginTop: '2em' }}></div>
        </>
    );
}
