import i18next from 'i18next';
import React from 'react';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { CartFloatingActionButton } from '../../components/floatingActionButton/cartFloatingActionButton';
import { FavouriteFloatingActionButton } from '../../components/floatingActionButton/favouriteFloatingActionButton';
import { GenericItemListTile } from '../../components/tilePresenter/genericItemListTile/genericItemListTile';
import { NutrientProcessorListTile } from '../../components/tilePresenter/processorItemListTile/nutrientProcessorListTile';
import { RefinerItemListTile } from '../../components/tilePresenter/processorItemListTile/refinerItemListTile';
import { RequiredItemDetailsListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile';
import { IdPrefix } from '../../constants/IdPrefix';
import { FavouriteItem } from '../../contracts/favourite/favouriteItem';
import { GameItemModel } from '../../contracts/GameItemModel';
import { Processor } from '../../contracts/Processor';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { LocaleKey } from '../../localization/LocaleKey';
import { AllGameItemsService } from '../../services/AllGameItemsService';
import { GameItemService } from '../../services/GameItemService';

interface IProps {
    // Container Props
    selectedLanguage?: string;
    favourites: Array<FavouriteItem>;
    addItemToCart?: (item: GameItemModel, quantity: number) => void;
    addItemToFavourites?: (item: GameItemModel) => void;
    removeItemToFavourites?: (itemId: string) => void;

    // Container State
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

    // Container Specific
    addThisItemToCart?: (itemId: string) => void;
}

export const CatalogueItemPresenter: React.FC<IProps> = (props: IProps) => {
    const displayAdditionalData = (additionalData: Array<any>) => {
        if (additionalData == null || additionalData.length === 0) return null;

        const getImage = (item: any) => {
            if (item.image != null && item.image.length > 0) {
                return (<img src={item.image} alt={item.image} style={{ maxHeight: '20px' }} />);
            }
            if (item.icon != null && item.icon.length > 0) {
                return (<i className="material-icons" style={{ verticalAlign: 'middle' }}>{item.icon}</i>);
            }

            return null;
        }

        return (
            <div className="row justify " style={{ marginTop: '1em', paddingBottom: '.5em' }}>
                {
                    additionalData.map((item, index) => {
                        return (
                            <div key={`additional-data-${index}`} className="secondary chip extra-padding" style={{ padding: '.25em 1em', margin: '0 .25em' }}>
                                <span>{item.text}&nbsp;</span>
                                {getImage(item)}
                            </div>
                        );
                    })
                }
            </div>
        );
    }

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
                        <GenericListPresenter list={usedToCreateArray} presenter={GenericItemListTile} />
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
                        <GenericListPresenter list={refRecipesArray} presenter={RefinerItemListTile} />
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
                        <GenericListPresenter list={usedToRefArray} presenter={RefinerItemListTile} />
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
                        <GenericListPresenter list={cookRecipesArray} presenter={NutrientProcessorListTile} />
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
                        <GenericListPresenter list={usedToCookArray} presenter={RefinerItemListTile} />
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
        components.push(FavouriteFloatingActionButton(isFavourited, props.addItemToFavourites, props.removeItemToFavourites));
        return components;
    }

    const title = props?.item?.Name;
    const description = props?.item?.Description;
    return (
        <>
            <HeadComponent title={title} description={description} />
            <NavBar title={title} />
            <div className="content">
                <div className="row border-bottom">
                    <div className="col-12 col-lg-2 col-md-2 col-sm-2 col-xs-3 image-container generic-item-image-container"
                        style={{ backgroundColor: `#${props.item.Colour}` }}>
                        <img src={`/assets/images/${props.item.Icon}`} alt={props.item.Name} style={{ maxWidth: '100%' }} />
                    </div>
                    <div className="col-12 col-lg-10 col-md-10 col-sm-10 col-xs-9">
                        <h2 className="ta-left ta-center-sm" style={{ marginBottom: 0 }}>{props.item.Name}</h2>
                        {
                            props.item.Group
                                ? <h3 className="ta-left ta-center-sm" style={{ marginTop: 0 }}>{props.item.Group}</h3>
                                : null
                        }
                        <h5 className="ta-left ta-center-sm">{props.item.Description}</h5>
                    </div>
                </div>
                {displayAdditionalData(props.additionalData)}
                {displayRequiredItems(props.resArray)}
                {displayUsedToCreateItems(props.usedToCreateArray)}
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
