
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { processorItem } from '../../../constants/Route';
import { Processor } from '../../../contracts/Processor';
import { RequiredItem } from '../../../contracts/RequiredItem';
import { RequiredItemDetails } from '../../../contracts/RequiredItemDetails';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { GameItemService } from '../../../services/json/GameItemService';
import { ImageContainer } from '../../common/tile/imageContainer';
import { RequiredItemsQuantityContainer } from '../../common/tile/quantityContainer';
import { TextContainer } from '../../common/tile/textContainer';
import { TileLoading } from '../../core/loading/loading';

interface IWithDepInj {
    gameItemService: GameItemService;
}

interface IWithoutDepInj extends Processor {
    singleItemImage: string;
    doubleItemImage: string;
    tripleItemImage: string;
}

interface IProps extends IWithDepInj, IWithoutDepInj { }


const ProcessorItemListTileClass: React.FC<IProps> = (props: IProps) => {
    const [requiredItems, setRequiredItems] = useState<Array<RequiredItemDetails>>([]);

    useEffect(() => {
        fetchData([props.Output, ...props.Inputs]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async (items: Array<RequiredItem>) => {
        const requiredItemsTasks = items.map(async (item: RequiredItem) => {
            const itemDetails = await props.gameItemService.getItemDetails(item.Id);
            if (!itemDetails.isSuccess) return null;

            const requiredItemDetails: RequiredItemDetails = {
                Id: itemDetails.value.Id,
                Icon: itemDetails.value.Icon,
                Name: itemDetails.value.Name,
                Colour: itemDetails.value.Colour,
                Quantity: item.Quantity
            }
            return requiredItemDetails;
        });
        const requiredItemsResults = await Promise.all(requiredItemsTasks);
        const requiredItems: Array<RequiredItemDetails | any> = requiredItemsResults.filter(r => r);

        if (requiredItems.length < 1) {
            console.error('Could not fetch data for all refiner inputs');
            return;
        }

        setRequiredItems(requiredItems);
    }

    if (!requiredItems || requiredItems.length === 0) {
        return (<TileLoading />);
    }

    const colour = requiredItems.length > 0 ? requiredItems[0].Colour : '';
    const output = requiredItems[0];
    return (
        <Link to={`${processorItem}/${props.Id}`} data-id="ProcessorItemListTile" className="gen-item-container" draggable={false}>
            <ImageContainer Name={output.Name} Icon={output.Icon} Colour={colour} OutputQuantity={output.Quantity} />
            <div className="gen-item-content-container">
                <TextContainer text={output.Name} />
                <RequiredItemsQuantityContainer requiredItems={requiredItems} />
            </div>
        </Link>
    );
}

const ProcessorItemListTileWithDepInj = withServices<IWithoutDepInj, IWithDepInj>(
    ProcessorItemListTileClass,
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);

export const ProcessorItemListTile = (props: any | Processor): JSX.Element => <ProcessorItemListTileWithDepInj {...props} />;