
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Recharge } from '../../../contracts/recharge/recharge';
import { catalogueItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';

import { GameItemService } from '../../../services/GameItemService';
import { GameItemModel } from '../../../contracts/GameItemModel';
import { anyObject } from '../../../helper/typescriptHacks';

interface IProps extends Recharge {
    currentItemId: string;
}

interface IState {
    parent: GameItemModel;
    child: GameItemModel;
    childValue: number;
    gameItemService: GameItemService;
}

class RechargeItemListTileClass extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const childIds = this.props.ChargeBy.filter(ch => ch.Id === this.props.currentItemId);
        this.state = {
            parent: anyObject,
            child: anyObject,
            childValue: childIds[0].Value,
            gameItemService: new GameItemService()
        }

        this.fetchData(this.props.Id, childIds[0].Id);
    }

    fetchData = async (itemId: string, childId: string) => {
        var parentDetails = await this.state.gameItemService.getItemDetails(itemId);
        var childDetails = await this.state.gameItemService.getItemDetails(childId);

        if (!parentDetails.isSuccess || !childDetails.isSuccess) return;

        this.setState(() => {
            return {
                parent: parentDetails.value,
                child: childDetails.value,
            }
        });
    }

    render() {
        const childName = (this.props.TotalChargeAmount / this.state.childValue) + 'x ' + this.state.child.Name;
        return (
            <Link to={`${catalogueItem}/${this.props.Id}`} className="gen-item-container" draggable={false}>
                <ImageContainer key={this.state.parent.Icon} Name={this.state.parent.Name} Icon={this.state.parent.Icon} Colour={this.state.parent.Colour} />
                <div className="gen-item-content-container">
                    <TextContainer text={this.state.parent.Name} />
                    <div className="quantity-container">{childName}</div>
                </div>
            </Link>
        );
    }
}

export const RechargeItemListTile = (props: IProps): JSX.Element => <RechargeItemListTileClass {...props} />;