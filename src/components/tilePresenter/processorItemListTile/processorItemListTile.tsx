
import * as React from 'react';
import { Link } from 'react-router-dom';

import { anyObject } from '../../../helper/typescriptHacks';

import { Processor } from '../../../contracts/Processor';
import { processorItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';
import { GameItemService } from '../../../services/GameItemService';
import { RequiredItem } from '../../../contracts/RequiredItem';
import { RequiredItemDetails } from '../../../contracts/RequiredItemDetails';
import { TileLoading } from '../../core/loading/loading';


interface IProps extends Processor {
    singleItemImage: string;
    doubleItemImage: string;
    tripleItemImage: string;
}

interface IState {
    item: Processor;
    colour: string;
    requiredItems: Array<RequiredItemDetails>;
    gameItemService: GameItemService;
}

class ProcessorItemListTileClass extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            item: anyObject,
            colour: '',
            requiredItems: [],
            gameItemService: new GameItemService()
        }

        this.fetchData([this.props.Output, ...this.props.Inputs]);
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
                colour: requiredItems.length === 1 ? requiredItems[0].Colour : prev.colour
            }
        });
    }

    processorInputsToString(rowIndex: number, startIndex: number, row: RequiredItemDetails) {
        return (rowIndex > startIndex ? ' + ' : '') +
            row.Quantity.toString() +
            'x ' +
            row.Name;
    }

    render() {
        if (!this.state.requiredItems || this.state.requiredItems.length === 0) {
            return (<TileLoading />);
        }

        var output = this.state.requiredItems[0];
        let subtitle = '';
        const startIndex = 1;
        for (let inputIndex = startIndex; inputIndex < this.state.requiredItems.length; inputIndex++) {
            subtitle += this.processorInputsToString(inputIndex, startIndex, this.state.requiredItems[inputIndex]);
        }
        return (
            <Link to={`${processorItem}/${this.props.Id}`} className="gen-item-container">
                <ImageContainer Name={output.Name} Icon={output.Icon} Colour={this.state.colour} Quantity={output.Quantity} />
                <div className="gen-item-content-container">
                    <TextContainer text={output.Name} />
                    <div className="quantity-container">{subtitle}</div>
                </div>
            </Link>
        );
    }
}


export const ProcessorItemListTile = (props: any | Processor): JSX.Element => <ProcessorItemListTileClass {...props} />;