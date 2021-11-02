import React from 'react';
import i18next from 'i18next';

import { AdditionalInfoChipRow } from '../../components/common/chip/additionalInfoChip';
import { HeadComponent } from '../../components/core/headComponent';
import { ItemHeaderRow } from '../../components/core/itemHeaderRow';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { CartFloatingActionButton } from '../../components/floatingActionButton/cartFloatingActionButton';
import { FavouriteFloatingActionButton } from '../../components/floatingActionButton/favouriteFloatingActionButton';
import { ShareFloatingActionButton } from '../../components/floatingActionButton/shareFloatingActionButton';
import { showShareDialog } from '../../components/shareDialog';
import { IdPrefix } from '../../constants/IdPrefix';
import { NetworkState } from '../../constants/NetworkState';
import { FavouriteItem } from '../../contracts/favourite/favouriteItem';
import { GameItemModel } from '../../contracts/GameItemModel';
import { Processor } from '../../contracts/Processor';
import { Recharge } from '../../contracts/recharge/recharge';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { anyObject } from '../../helper/typescriptHacks';
import { LocaleKey } from '../../localization/LocaleKey';
import { AllGameItemsService } from '../../services/json/AllGameItemsService';
import { GameItemService } from '../../services/json/GameItemService';
import { RechargeByService } from '../../services/json/RechargeByService';
import { ToastService } from '../../services/toastService';
import { displayCookItems, displayProceduralStatBonuses, displayRechargedByItems, displayRefItems, displayRequiredItems, displayStatBonuses, displayUsedToCookItems, displayUsedToCreateItems, displayUsedToRechargeItems, displayUsedToRefItems } from './catalogueItem.Components';

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
    toastService: ToastService;
    additionalData: Array<any>;
    networkState: NetworkState;

    // Container Specific
    addThisItemToCart: () => void;
    addThisItemToFavourites: () => void;
    removeThisItemToFavourites: () => void;
}

export const CatalogueItemPresenter: React.FC<IProps> = (props: IProps) => {
    const getFloatingActionButtons = (): Array<any> => {
        const components: any[] = [];
        if (props.item == null || props.item.Id == null) return components;
        const shareDialogProps = {
            id: props.item.Id,
            toastService: props.toastService,
        }
        components.push(ShareFloatingActionButton(() => showShareDialog(shareDialogProps)));

        if (!props.item.Id.includes(IdPrefix.Cooking)) {
            components.push(CartFloatingActionButton(props.addThisItemToCart));
        }
        const isFavourited = props.favourites.find(f => f.Id === props.item.Id) != null;
        components.push(FavouriteFloatingActionButton(isFavourited, props.addThisItemToFavourites, props.removeThisItemToFavourites));
        return components;
    }

    const handleLoadingOrError = () => {
        if (props.networkState === NetworkState.Loading) return <div className="pt-5"><SmallLoading /></div>;
        if (props.networkState === NetworkState.Error) {
            return (<h2>{i18next.t(LocaleKey.error)}</h2>);
        }
        return displayDetails();
    }

    const displayDetails = () => {
        return (
            <>
                <div className="content">
                    <ItemHeaderRow {...props.item} />
                    <AdditionalInfoChipRow additionalData={props.additionalData} />

                    {displayRequiredItems(props.resArray)}
                    {displayUsedToCreateItems(props.usedToCreateArray)}
                    {displayRechargedByItems(props.rechargedBy)}
                    {displayUsedToRechargeItems(props.item.Id, props.item.Name, props.usedToRechargeArray)}
                    {displayRefItems(props.refArray)}
                    {displayUsedToRefItems(props.item.Name, props.usedToRefArray)}
                    {displayCookItems(props.cookArray)}
                    {displayUsedToCookItems(props.item.Name, props.usedToCookArray)}
                    {displayStatBonuses(props.item.StatBonuses)}
                    {displayProceduralStatBonuses(props.item.NumStatsMin, props.item.NumStatsMax, props.item.ProceduralStatBonuses)}
                </div>
            </>
        )
    }

    const { Name: title, Description: description, Id: id } = props?.item ?? anyObject;
    return (
        <>
            <HeadComponent id={id} title={title} description={description} updateUrl={true} />
            <NavBar title={title} additionalItems={getFloatingActionButtons()} />
            {handleLoadingOrError()}

            {getFloatingActionButtons()}
            <div className="col-12" style={{ marginBottom: '2em', marginTop: '2em' }}></div>
        </>
    );
}
