
import * as React from 'react';
// import i18next from 'i18next';
import { Link } from 'react-router-dom';

import { catalogueItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';
import { QuicksilverItem } from '../../../contracts/data/quicksilver';

import { GameItemService } from '../../../services/GameItemService';
import { ActionContainer } from '../../common/tile/actionContainer';

export interface IQuicksilverItemProps extends QuicksilverItem {
    isDisabled: boolean;
}

interface IState {
    name: string;
    icon: string;
    colour: string;
    gameItemService: GameItemService;
}

class QuicksilverItemListTileClass extends React.Component<IQuicksilverItemProps, IState> {
    constructor(props: IQuicksilverItemProps) {
        super(props);

        this.state = {
            name: '...',
            icon: 'loader.svg',
            colour: '',
            gameItemService: new GameItemService()
        }

        this.fetchData(this.props.ItemId);
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

    getActions = () => {
        const result = [];
        if (this.props.isDisabled) {
            result.push(<i key="locked" className="material-icons x2">lock</i>);
        }
        return result;
    }

    render() {
        return (
            <Link to={`${catalogueItem}/${this.props.ItemId}`} className="gen-item-container" draggable={false}>
                <ImageContainer Name={this.state.name} Icon={this.state.icon} Colour={this.state.colour} greyScale={this.props.isDisabled} />
                <div className="gen-item-content-container">
                    <TextContainer text={this.state.name} additionalCss={(this.props.Tier != null && this.props.Tier > 0) ? "" : "full"} />
                    {
                        (this.props.Tier != null && this.props.Tier > 0)
                            ? <div className="quantity-container">Tier: {this.props.Tier}</div>
                            : null
                    }
                    <ActionContainer actions={this.getActions()} />
                </div>
            </Link>
        );
    }
}

export const QuicksilverItemListTile = (props: IQuicksilverItemProps, index: number): JSX.Element =>
    <QuicksilverItemListTileClass {...props} />;