
import * as React from 'react';
import i18next from 'i18next';
import { Link } from 'react-router-dom';

import { LocaleKey } from '../../../localization/LocaleKey';
import { RequiredItem } from '../../../contracts/RequiredItem';
import { catalogueItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';

import { GameItemService } from '../../../services/GameItemService';

interface IState {
    name: string;
    icon: string;
    colour: string;
    gameItemService: GameItemService;
}

class RequiredItemListTileClass extends React.Component<RequiredItem, IState> {
    constructor(props: RequiredItem) {
        super(props);

        this.state = {
            name: '...',
            icon: 'loader.svg',
            colour: '',
            gameItemService: new GameItemService()
        }

        this.fetchData(this.props.Id);
    }

    fetchData = async (itemId: string) => {
        var itemDetails = await this.state.gameItemService.getItemDetails(itemId);

        this.setState(() => {
            return {
                name: itemDetails.value.Name,
                icon: itemDetails.value.Icon,
                colour: itemDetails.value.Colour
            }
        });
    }

    render() {
        return (
            <Link to={`${catalogueItem}/${this.props.Id}`} className="gen-item-container">
                <ImageContainer Name={this.state.name} Icon={this.state.icon} Colour={this.state.colour} />
                <div className="gen-item-content-container">
                    <TextContainer text={this.state.name} />
                    <div className="quantity-container">{i18next.t(LocaleKey.quantity)}: {this.props.Quantity}</div>
                </div>
            </Link>
        );
    }
}

export const RequiredItemListTile = (props: RequiredItem): JSX.Element => <RequiredItemListTileClass {...props} />;