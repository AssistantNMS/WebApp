
import * as React from 'react';
import { Link } from 'react-router-dom';

import { catalogueItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';

import { GameItemService } from '../../../services/json/GameItemService';
import { ChargeBy } from '../../../contracts/recharge/chargeBy';

interface IProps extends ChargeBy {
    totalChargeAmount: number;
}

interface IState {
    name: string;
    icon: string;
    colour: string;
    gameItemService: GameItemService;
}

class ChargeByItemListTileClass extends React.Component<IProps, IState> {
    constructor(props: IProps) {
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
        const itemDetails = await this.state.gameItemService.getItemDetails(itemId);

        this.setState(() => {
            return {
                name: itemDetails.value.Name,
                icon: itemDetails.value.Icon,
                colour: itemDetails.value.Colour
            }
        });
    }

    render() {
        const childName = (this.props.totalChargeAmount / this.props.Value) + 'x ' + this.state.name;
        return (
            <Link to={`${catalogueItem}/${this.props.Id}`} data-id="ChargeByItemListTile" className="gen-item-container" draggable={false}>
                <ImageContainer Name={this.state.name} Icon={this.state.icon} Colour={this.state.colour} />
                <div className="gen-item-content-container">
                    <TextContainer text={childName} additionalCss="full" />
                </div>
            </Link>
        );
    }
}

export const ChargeByItemListTile = (props: IProps): JSX.Element => <ChargeByItemListTileClass {...props} />;