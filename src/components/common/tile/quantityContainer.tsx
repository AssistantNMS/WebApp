import React, { ReactNode } from 'react';
import { Tooltip } from 'react-tippy';

import { RequiredItemDetails } from '../../../contracts/RequiredItemDetails';

interface IRequiredItemQuantityProps {
    requiredItems: Array<RequiredItemDetails>;
}

export const RequiredItemsQuantityContainer: React.FC<IRequiredItemQuantityProps> = (props: IRequiredItemQuantityProps) => {

    const requiredItemsToString = (rowIndex: number, startIndex: number, row: RequiredItemDetails) => {
        return (rowIndex > startIndex ? ' + ' : '') +
            row.Quantity.toString() +
            'x ' +
            row.Name;
    }

    const requiredItemsToNodeArray = (rowIndex: number, startIndex: number, row: RequiredItemDetails): Array<ReactNode> => {
        const result: Array<ReactNode> = [];
        if (rowIndex > startIndex) {
            result.push(<span key={`${rowIndex}-${startIndex}-+`}>&nbsp;+&nbsp;</span>);
        }
        result.push(<span key={`${rowIndex}-${startIndex}-quantity`}>{row.Quantity.toString()}</span>);
        result.push(<span key={`${rowIndex}-${startIndex}-x`}>x&nbsp;</span>);
        result.push(<span key={`${rowIndex}-${startIndex}-name`} className="item-name">{row.Name}</span>);

        return result;
    }

    let subtitle = '';
    const quantities: Array<ReactNode> = [];
    const startIndex = 0;
    for (let inputIndex = startIndex; inputIndex < props.requiredItems.length; inputIndex++) {
        subtitle += requiredItemsToString(inputIndex, startIndex, props.requiredItems[inputIndex]);
        const tempArray = requiredItemsToNodeArray(inputIndex, startIndex, props.requiredItems[inputIndex]);
        for (const temp of tempArray) {
            quantities.push(temp);
        }
    }

    return (
        <BaseTooltipQuantityContainer
            tooltipText={subtitle}
            spans={quantities}
        />
    );
}

interface IBaseTooltipQuantityProps {
    tooltipText: string;
    spans: Array<ReactNode>;
}

export const BaseTooltipQuantityContainer: React.FC<IBaseTooltipQuantityProps> = (props: IBaseTooltipQuantityProps) => {
    return (
        <div className="quantity-container">
            <Tooltip
                title={props.tooltipText}
                arrow={true}
                theme="light"
                position="top-start"
            >
                {props.spans}
            </Tooltip>
        </div>
    );
}