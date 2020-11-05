import * as React from 'react';
import { Link } from 'react-router-dom';

import { catalogueItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';
import { GameItemService } from '../../../services/GameItemService';
import { RequiredItem } from '../../../contracts/RequiredItem';
import { RequiredItemDetails } from '../../../contracts/RequiredItemDetails';
import { TileLoading } from '../../core/loading/loading';
import { GameItemModel } from '../../../contracts/GameItemModel';


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
        var requiredItemsTasks = items.map(async (item: RequiredItem) => {
            var itemDetails = await this.state.gameItemService.getItemDetails(item.Id);
            if (!itemDetails.isSuccess) return null;

            var requiredItemDetails: RequiredItemDetails = {
                Id: itemDetails.value.Id,
                Icon: itemDetails.value.Icon,
                Name: itemDetails.value.Name,
                Colour: itemDetails.value.Colour,
                Quantity: item.Quantity
            }
            return requiredItemDetails;
        });
        var requiredItemsResults = await Promise.all(requiredItemsTasks);
        var requiredItems: Array<RequiredItemDetails | any> = requiredItemsResults.filter(r => r);

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

    requiredItemsToString(rowIndex: number, startIndex: number, row: RequiredItemDetails) {
        return (rowIndex > startIndex ? ' + ' : '') +
            row.Quantity.toString() +
            'x ' +
            row.Name;
    }

    render() {
        if (!this.state.requiredItems || this.state.requiredItems.length === 0) {
            return (<TileLoading />);
        }

        let subtitle = '';
        const startIndex = 0;
        for (let inputIndex = startIndex; inputIndex < this.state.requiredItems.length; inputIndex++) {
            subtitle += this.requiredItemsToString(inputIndex, startIndex, this.state.requiredItems[inputIndex]);
        }
        return (
            <Link to={`${catalogueItem}/${this.props.Id}`} className="gen-item-container" draggable={false}>
                <ImageContainer {...this.props} />
                <div className="gen-item-content-container">
                    <TextContainer text={this.props.Name} />
                    <div className="quantity-container">{subtitle}</div>
                </div>
            </Link>
        );
    }
}

export const GenericItemWithRequirementsListTile = (props: any | GameItemModel): JSX.Element => <GenericItemWithRequirementsListTileClass {...props} />;