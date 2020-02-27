
import * as React from 'react';
import i18next from 'i18next';
import { Link } from 'react-router-dom';

import { anyObject } from '../../../helper/TypescriptHacks';

import { LocaleKey } from '../../../localization/LocaleKey';
import { Processor } from '../../../contracts/Processor';
import { catalogueItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';
import { GameItemService } from '../../../services/GameItemService';

interface IState {
    item: Processor;
    name: string;
    refinerImage: string;
    colour: string;
}

class ProcessorItemListTileClass extends React.Component<Processor, IState> {
    constructor(props: Processor) {
        super(props);

        const defaultRefinerImage = 'refiner.png';
        let refinerImage = defaultRefinerImage;
        if (this.props.Inputs.length === 2) refinerImage = 'refinerMedium.png';
        if (this.props.Inputs.length > 2) refinerImage = 'refinerLarge.png';

        this.state = {
            item: anyObject,
            name: props.Operation,
            refinerImage: refinerImage,
            colour: ''
        }

        if (refinerImage === defaultRefinerImage) {
            this.fetchData(this.props.Output.Id);
        }
    }

    fetchData = async (itemId: string) => {
        var itemResult = await (new GameItemService()).getItemDetails(itemId ?? '');
        if (!itemResult.isSuccess) {
            // Error
            return;
        }
        this.setState(() => {
            return {
                name: itemResult.value.Name,
                refinerImage: itemResult.value.Icon,
                colour: itemResult.value.Colour
            }
        });
    }

    render() {
        return (
            <Link to={`${catalogueItem}/${this.props.Id}`} className="item">
                <TextContainer text={this.state.name} />
                <ImageContainer Name={this.props.Operation} Icon={this.state.refinerImage} Colour={this.state.colour} />
                <div className="quantity-container">
                    <h3>{this.props.Time} {i18next.t(LocaleKey.seconds)}</h3>
                </div>
            </Link>
        );
    }
}


export const ProcessorItemListTile = (props: any | Processor): JSX.Element => <ProcessorItemListTileClass {...props} />;