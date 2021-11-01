
import * as React from 'react';
import i18next from 'i18next';
import { Link } from 'react-router-dom';

import { LocaleKey } from '../../../localization/LocaleKey';
import { RequiredItem } from '../../../contracts/RequiredItem';
import { catalogueItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';
import { ActionContainer } from '../../common/tile/actionContainer';

import { GameItemService } from '../../../services/json/GameItemService';

interface IProps extends RequiredItem {
    editItem?: () => void;
    removeItem?: () => void;
}

interface IState {
    name: string;
    icon: string;
    colour: string;
    gameItemService: GameItemService;
}

class RequiredItemListTileClass extends React.Component<IProps, IState> {
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
    editItem = async (e: any) => {
        e.preventDefault();
        if (this.props.editItem != null) {
            this.props.editItem();
        }
    }

    removeItem = (e: any) => {
        e.preventDefault();
        if (this.props.removeItem != null) {
            this.props.removeItem();
        }
    }

    getActions = () => {
        const result = [];
        if (this.props.editItem) {
            result.push(<i key="edit" onClick={this.editItem} className="material-icons">edit</i>);
        }
        if (this.props.removeItem) {
            result.push(<i key="delete" onClick={this.removeItem} className="material-icons">delete</i>);
        }
        return result;
    }

    render() {
        return (
            <Link to={`${catalogueItem}/${this.props.Id}`} className="gen-item-container" draggable={false}>
                <ImageContainer Name={this.state.name} Icon={this.state.icon} Colour={this.state.colour} />
                <div className="gen-item-content-container">
                    <TextContainer text={this.state.name} additionalCss={(this.props.Quantity != null && this.props.Quantity > 0) ? "" : "full"} />
                    {
                        (this.props.Quantity != null && this.props.Quantity > 0)
                            ? <div className="quantity-container">{i18next.t(LocaleKey.quantity)}: {this.props.Quantity}</div>
                            : null
                    }
                    <ActionContainer actions={this.getActions()} />
                </div>
            </Link>
        );
    }
}

export const RequiredItemListTile = (props: IProps): JSX.Element => <RequiredItemListTileClass {...props} />;