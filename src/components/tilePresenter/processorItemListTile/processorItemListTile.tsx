
import * as React from 'react';
import i18next from 'i18next';
import { Link } from 'react-router-dom';

import { anyObject } from '../../../helper/TypescriptHacks';

import { LocaleKey } from '../../../localization/LocaleKey';
import { Processor } from '../../../contracts/Processor';
import { processorItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';
import { GameItemService } from '../../../services/GameItemService';
import { RequiredItem } from '../../../contracts/RequiredItem';
import { RequiredItemDetails } from '../../../contracts/RequiredItemDetails';


interface IProps extends Processor {
    singleItemImage: string;
    doubleItemImage: string;
    tripleItemImage: string;
}

interface IState {
    item: Processor;
    name: string;
    refinerImage: string;
    colour: string;
    gameItemService: GameItemService;
}

class ProcessorItemListTileClass extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const defaultRefinerImage = props.singleItemImage;
        let refinerImage = defaultRefinerImage;
        if (this.props.Inputs.length === 2) refinerImage = props.doubleItemImage;
        if (this.props.Inputs.length > 2) refinerImage = props.tripleItemImage;

        this.state = {
            item: anyObject,
            name: '...',
            refinerImage: refinerImage,
            colour: '',
            gameItemService: new GameItemService()
        }

        this.fetchData(this.props.Inputs);
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

        let name = requiredItems[0].Name;
        for (let inputIndex = 1; inputIndex < requiredItems.length; inputIndex++) {
            const requiredItem = requiredItems[inputIndex];
            name += ' + ' + requiredItem.Name;
        }

        this.setState((prev: IState) => {
            return {
                name: name,
                refinerImage: requiredItems.length === 1 ? requiredItems[0].Icon : prev.refinerImage,
                colour: requiredItems.length === 1 ? requiredItems[0].Colour : prev.colour
            }
        });
    }

    render() {
        return (
            <Link to={`${processorItem}/${this.props.Id}`} className="gen-item-container">
                <ImageContainer Name={this.state.name} Icon={this.state.refinerImage} Colour={this.state.colour} />
                <div className="gen-item-content-container">
                    <TextContainer text={this.state.name} />
                    <div className="quantity-container">{this.props.Time} {i18next.t(LocaleKey.seconds)}</div>
                </div>
            </Link>
        );
    }
}


export const ProcessorItemListTile = (props: any | Processor): JSX.Element => <ProcessorItemListTileClass {...props} />;