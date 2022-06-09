import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react-markdown/lib/react-markdown';
import { Link } from 'react-router-dom';

import { translate } from '../../../localization/Translate';
import { catalogueItem } from '../../../constants/Route';
import { GameItemModel } from '../../../contracts/GameItemModel';
import { RequiredItem } from '../../../contracts/RequiredItem';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { LocaleKey } from '../../../localization/LocaleKey';
import { GameItemService } from '../../../services/json/GameItemService';
import { ActionContainer } from '../../common/tile/actionContainer';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';
import { TileLoading } from '../../core/loading/loading';

interface IWithDepInj {
    gameItemService: GameItemService;
}

interface IWithoutDepInj extends RequiredItem {
    quantityLabel?: string;
    quantityIconSuffix?: ReactNode;
    editItem?: () => void;
    removeItem?: () => void;
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

const RequiredItemListTileClass: React.FC<IProps> = (props: IProps) => {
    const [item, setItem] = useState<GameItemModel>();

    useEffect(() => {
        fetchData(props.Id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async (itemId: string) => {
        const itemDetails = await props.gameItemService.getItemDetails(itemId);
        setItem(itemDetails.value);
    }

    const editItem = async (e: any) => {
        e.preventDefault();
        if (props.editItem != null) {
            props.editItem();
        }
    }

    const removeItem = (e: any) => {
        e.preventDefault();
        if (props.removeItem != null) {
            props.removeItem();
        }
    }

    const getActions = () => {
        const result = [];
        if (props.editItem) {
            result.push(<i key="edit" onClick={editItem} className="material-icons">edit</i>);
        }
        if (props.removeItem) {
            result.push(<i key="delete" onClick={removeItem} className="material-icons">delete</i>);
        }
        return result;
    }

    if (item == null) {
        return (<TileLoading />);
    }

    const hasQuantity = (props.Quantity != null && props.Quantity > 0);
    const additionalCss = hasQuantity ? "" : "full";
    const quantityRenderer = (hasQ: boolean, localProps: IProps) => {
        if (!hasQ) return null;

        const label = localProps.quantityLabel ?? translate(LocaleKey.quantity);
        return (
            <div className="quantity-container">{label}: {localProps.Quantity} {localProps.quantityIconSuffix}</div>
        );
    }

    return (
        <Link to={`${catalogueItem}/${props.Id}`} data-id="RequiredItemListTile" className="gen-item-container" draggable={false}>
            <ImageContainer Name={item.Name} Icon={item.Icon} Colour={item.Colour} />
            <div className="gen-item-content-container">
                <TextContainer text={item.Name} additionalCss={additionalCss} />
                {quantityRenderer(hasQuantity, { ...props })}
                <ActionContainer actions={getActions()} />
            </div>
        </Link>
    );
}

const RequiredItemListTileClassWithDepInj = withServices<IWithoutDepInj, IWithDepInj>(
    RequiredItemListTileClass,
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);

export const RequiredItemListTile = (props: IWithoutDepInj): JSX.Element => <RequiredItemListTileClassWithDepInj {...props} />;
