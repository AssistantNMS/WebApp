
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react-markdown/lib/react-markdown';
import { Link } from 'react-router-dom';

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
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

const QuicksilverRequiredItemListTileClass: React.FC<IProps> = (props: IProps) => {
    const [item, setItem] = useState<GameItemModel>();

    useEffect(() => {
        fetchData(props.Id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async (itemId: string) => {
        const itemDetails = await props.gameItemService.getItemDetails(itemId);
        setItem(itemDetails.value);
    }

    if (item == null) {
        return (<TileLoading />);
    }

    return (
        <Link to={`${catalogueItem}/${props.Id}`} data-id="QuicksilverRequiredItemListTile" className="gen-item-container qs-special" draggable={false}>
            <ImageContainer Name={item.Name} Icon={item.Icon} Colour={item.Colour} />
            <div className="gen-item-content-container">
                <TextContainer text={item.Name} additionalCss="full" />
            </div>
        </Link>
    );
}

const QuicksilverRequiredItemListTileClassWithDepInj = withServices<IWithoutDepInj, IWithDepInj>(
    QuicksilverRequiredItemListTileClass,
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);

export const QuicksilverRequiredItemListTile = (props: IWithoutDepInj): JSX.Element => <QuicksilverRequiredItemListTileClassWithDepInj {...props} />;