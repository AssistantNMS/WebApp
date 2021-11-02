
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Recharge } from '../../../contracts/recharge/recharge';
import { catalogueItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';

import { GameItemService } from '../../../services/json/GameItemService';
import { GameItemModel } from '../../../contracts/GameItemModel';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { SmallLoading } from '../../core/loading/loading';

interface IWithDepInj {
    gameItemService: GameItemService;
}

interface IWithoutDepInj extends Recharge {
    currentItemId: string;
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

const RechargeItemListTileClass: React.FC<IProps> = (props: IProps) => {
    const [parent, setParent] = useState<GameItemModel>();
    const [child, setChild] = useState<GameItemModel>();
    const [childValue, setChildValue] = useState<number>();

    useEffect(() => {
        const childIds = props.ChargeBy.filter(ch => ch.Id === props.currentItemId);
        setChildValue(childIds[0].Value);
        fetchData(props.Id, childIds[0].Id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async (itemId: string, childId: string) => {
        const parentDetails = await props.gameItemService.getItemDetails(itemId);
        const childDetails = await props.gameItemService.getItemDetails(childId);

        if (!parentDetails.isSuccess || !childDetails.isSuccess) return;
        setParent(parentDetails.value);
        setChild(childDetails.value);
    }

    if (parent == null || child == null || childValue == null) {
        return (<SmallLoading />);
    }

    const childName = (props.TotalChargeAmount / childValue) + 'x ' + child.Name;
    return (
        <Link to={`${catalogueItem}/${props.Id}`} data-id="RechargeItemListTile" className="gen-item-container" draggable={false}>
            <ImageContainer key={parent.Icon} Name={parent.Name} Icon={parent.Icon} Colour={parent.Colour} />
            <div className="gen-item-content-container">
                <TextContainer text={parent.Name} />
                <div className="quantity-container">{childName}</div>
            </div>
        </Link>
    );
}

const RechargeItemListTileClassWithDepInj = withServices<IWithoutDepInj, IWithDepInj>(
    RechargeItemListTileClass,
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);

export const RechargeItemListTile = (props: IProps): JSX.Element => <RechargeItemListTileClassWithDepInj {...props} />;