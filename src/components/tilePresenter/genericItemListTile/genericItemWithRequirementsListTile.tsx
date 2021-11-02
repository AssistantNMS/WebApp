import React from 'react';
import { Link } from 'react-router-dom';

import { catalogueItem } from '../../../constants/Route';
import { GameItemModel } from '../../../contracts/GameItemModel';
import { RequiredItem } from '../../../contracts/RequiredItem';
import { RequiredItemDetails } from '../../../contracts/RequiredItemDetails';
import { GameItemService } from '../../../services/json/GameItemService';
import { ImageContainer } from '../../common/tile/imageContainer';
import { RequiredItemsQuantityContainer } from '../../common/tile/quantityContainer';
import { TextContainer } from '../../common/tile/textContainer';
import { TileLoading } from '../../core/loading/loading';

interface IProps extends GameItemModel {
}

interface IState {
    requiredItems: Array<RequiredItemDetails>;
    gameItemService: GameItemService;
}

class GenericItemWithRequirementsListTileClass extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            requiredItems: [],
            gameItemService: new GameItemService()
        }

        this.fetchData(this.props.RequiredItems);
    }

    fetchData = async (items: Array<RequiredItem>) => {
        const requiredItemsTasks = items.map(async (item: RequiredItem) => {
            const itemDetails = await this.state.gameItemService.getItemDetails(item.Id);
            if (!itemDetails.isSuccess) return null;

            const requiredItemDetails: RequiredItemDetails = {
                Id: itemDetails.value.Id,
                Icon: itemDetails.value.Icon,
                Name: itemDetails.value.Name,
                Colour: itemDetails.value.Colour,
                Quantity: item.Quantity
            }
            return requiredItemDetails;
        });
        const requiredItemsResults = await Promise.all(requiredItemsTasks);
        const requiredItems: Array<RequiredItemDetails | any> = requiredItemsResults.filter(r => r);

        if (requiredItems.length < 1) {
            console.error('Could not fetch data for all refiner inputs');
            return;
        }

        this.setState((prev: IState) => {
            return {
                requiredItems: requiredItems,
            }
        });
    }

    render() {
        if (!this.state.requiredItems || this.state.requiredItems.length === 0) {
            return (<TileLoading />);
        }

        return (
            <Link to={`${catalogueItem}/${this.props.Id}`} data-id="GenericItemWithRequirementsListTile" className="gen-item-container" draggable={false}>
                <ImageContainer {...this.props} />
                <div className="gen-item-content-container">
                    <TextContainer text={this.props.Name} />
                    <RequiredItemsQuantityContainer requiredItems={this.state.requiredItems} />
                </div>
            </Link>
        );
    }
}

export const GenericItemWithRequirementsListTile = (props: any | GameItemModel): JSX.Element => <GenericItemWithRequirementsListTileClass {...props} />;