import i18next from 'i18next';
import React, { useState } from 'react';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { AdditionalInfoChipRow } from '../../components/common/chip/additionalInfoChip';
import { ExpeditionAlphabetDecoder } from '../../components/common/expeditionAlphabetDecoder';
import { HeadComponent } from '../../components/core/headComponent';
import { ItemHeaderRow } from '../../components/core/itemHeaderRow';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { CartFloatingActionButton } from '../../components/floatingActionButton/cartFloatingActionButton';
import { FavouriteFloatingActionButton } from '../../components/floatingActionButton/favouriteFloatingActionButton';
import { ShareDialog } from '../../components/shareDialog';
import { IdPrefix } from '../../constants/IdPrefix';
import { NetworkState } from '../../constants/NetworkState';
import { PlatformControlMapping } from '../../contracts/data/controlMapping';
import { EggNeuralTrait } from '../../contracts/data/eggNeuralTrait';
import { FavouriteItem } from '../../contracts/favourite/favouriteItem';
import { GameItemModel } from '../../contracts/GameItemModel';
import { Processor } from '../../contracts/Processor';
import { Recharge } from '../../contracts/recharge/recharge';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { anyObject } from '../../helper/typescriptHacks';
import { LocaleKey } from '../../localization/LocaleKey';
import { DataJsonService } from '../../services/json/DataJsonService';
import { ToastService } from '../../services/toastService';
import { displayCookItems, displayEggTraits, displayProceduralStatBonuses, displayRechargedByItems, displayRefItems, displayRequiredItems, displayStatBonuses, displayUsedToCookItems, displayUsedToCreateItems, displayUsedToRechargeItems, displayUsedToRefItems } from './catalogueItem.Components';
import { DevDetailsBottomModalSheet } from './devDetailsBottomModalSheet';
import { IReduxProps } from './catalogueItem.Redux';

interface IProps extends IReduxProps {
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
    eggTraitArray: Array<EggNeuralTrait>;
    controlLookup: Array<PlatformControlMapping>;
    additionalData: Array<any>;
    networkState: NetworkState;

    toastService: ToastService;
    dataJsonService: DataJsonService;

    // Container Specific
    addThisItemToCart: () => void;
    addThisItemToFavourites: () => void;
    removeThisItemToFavourites: () => void;
}

export const CatalogueItemPresenter: React.FC<IProps> = (props: IProps) => {
    const [isDetailPaneOpen, setDetailPaneOpen] = useState<boolean>(false);

    const getFloatingActionButtons = (): Array<any> => {
        const components: any[] = [];
        if (props.item == null || props.item.Id == null) return components;
        const shareDialogProps = {
            id: props.item.Id,
            itemName: props.item.Name,
            selectedLanguage: props.selectedLanguage!,
            toastService: props.toastService,
        }
        components.push(<ShareDialog
            key="share-dialog"
            {...shareDialogProps}
        />);

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
            <DefaultAnimation>
                <div className="content">
                    <ItemHeaderRow {...props.item}
                        controlLookup={props.controlLookup}
                        openDevProperties={() => setDetailPaneOpen(!isDetailPaneOpen)}
                    >
                        <ExpeditionAlphabetDecoder id={props.item.Id} />
                    </ItemHeaderRow>
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
                    {displayEggTraits(props.eggTraitArray)}
                </div>
                <DevDetailsBottomModalSheet
                    appId={props.item.Id}
                    isDetailPaneOpen={isDetailPaneOpen}
                    dataJsonService={props.dataJsonService}
                    setDetailPaneOpen={() => setDetailPaneOpen(false)}
                />
            </DefaultAnimation>
        )
    }

    const { Name: title, Description: description, Id: id } = props?.item ?? anyObject;
    return (
        <>
            <HeadComponent
                id={id}
                title={title}
                description={description}
                selectedLanguage={props.selectedLanguage}
                updateUrl={true}
            />
            <NavBar title={title} additionalItems={getFloatingActionButtons()} />
            {handleLoadingOrError()}

            {getFloatingActionButtons()}
            <div className="col-12" style={{ marginBottom: '2em', marginTop: '2em' }}></div>
        </>
    );
}
