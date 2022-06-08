import React, { ReactNode } from 'react';

import { RequiredItemDetails } from '../../../contracts/RequiredItemDetails';
import { LocaleKey } from '../../../localization/LocaleKey';
import { translate } from '../../../localization/Translate';
import { CustomTooltip } from '../tooltip/tooltip';

export interface CustomizedRequiredItemDetails extends RequiredItemDetails {
    QuantityRange?: string;
}

interface IRequiredItemQuantityProps {
    requiredItems: Array<RequiredItemDetails | CustomizedRequiredItemDetails>;
    limitRequiredItems?: number;
    addTrailingSpace?: boolean;
    addExtraPadding?: boolean;
    addBreakLines?: boolean;
}

export const RequiredItemsQuantityContainer: React.FC<IRequiredItemQuantityProps> = (props: IRequiredItemQuantityProps) => {

    const requiredItemsToString = (rowIndex: number, startIndex: number, row: RequiredItemDetails | CustomizedRequiredItemDetails) => {
        let result: string = '';
        result += (rowIndex > startIndex ? ' + ' : '');

        if (row.Quantity === 0) {
            result += row.Name + ' ' + translate(LocaleKey.blueprint);
        } else {
            const quantityRange = (row as CustomizedRequiredItemDetails).QuantityRange;
            if (quantityRange == null) {
                result += row.Quantity.toString();
            } else {
                result += quantityRange;
            }
            result += 'x ' + row.Name;
        }

        return result;
    }

    const requiredItemsToNodeArray = (rowIndex: number, startIndex: number, endIndex: number, rows: Array<RequiredItemDetails | CustomizedRequiredItemDetails>): Array<ReactNode> => {
        const result: Array<ReactNode> = [];
        const baseKey = `${rowIndex}-${startIndex}`;
        const row: RequiredItemDetails | CustomizedRequiredItemDetails = rows[rowIndex];

        if (rowIndex > startIndex) {
            result.push(<span key={`${baseKey}-+`}>&nbsp;+&nbsp;</span>);

            if (props.addBreakLines) {
                result.push(<br key={`${baseKey}-breakline`} />);
            }
        }

        if (row.Quantity === 0) {
            result.push(<span key={`${baseKey}-name-no-quantity`} className="item-name">{row.Name}</span>);
            if (rows.length > 1) {
                result.push(<span key={`${baseKey}-name-no-space`} className="item-name">&nbsp;</span>);
            }
            if (props.addTrailingSpace) {
                result.push(<span key={`${baseKey}-trailing-space`} style={{ opacity: 0 }}>&nbsp;</span>);
            }
            result.push(<span key={`${baseKey}-blueprint`}>{translate(LocaleKey.blueprint)}</span>);
        } else {
            const quantityRange = (row as CustomizedRequiredItemDetails).QuantityRange;
            if (quantityRange == null) {
                result.push(<span key={`${baseKey}-quantity`}>{row.Quantity.toString()}</span>);
            } else {
                result.push(<span key={`${baseKey}-quantity-range`}>{quantityRange}</span>);
            }
            result.push(<span key={`${baseKey}-x`}>x&nbsp;</span>);
            result.push(<span key={`${baseKey}-name`} className="item-name">{row.Name}</span>);

            if (props.addTrailingSpace) {
                result.push(<span key={`${baseKey}-trailing-space`} style={{ opacity: 0 }}>&nbsp;test</span>);
            }
        }

        if (props.addExtraPadding) {
            if ((rows.length > 1) && (rowIndex === endIndex)) {
                result.push(<span key={`${baseKey}-space`} style={{ opacity: 0 }}>&nbsp;+&nbsp;</span>);
            }
        }

        return result;
    }

    let subtitle = '';
    const quantities: Array<ReactNode> = [];
    const startIndex = 0;
    const endIndex = props.requiredItems.length - 1;
    const addEtc = props.limitRequiredItems && endIndex >= (props.limitRequiredItems ?? 0);
    for (let inputIndex = startIndex; inputIndex < props.requiredItems.length; inputIndex++) {
        subtitle += requiredItemsToString(inputIndex, startIndex, props.requiredItems[inputIndex]);

        let localEndIndex = (inputIndex === ((props.limitRequiredItems ?? 0) - 1)) ? inputIndex : endIndex;
        if (props.limitRequiredItems == null || inputIndex < props.limitRequiredItems) {
            const tempArray = requiredItemsToNodeArray(inputIndex, startIndex, localEndIndex, props.requiredItems);
            for (const temp of tempArray) {
                quantities.push(temp);
            }
        }
    }

    if (addEtc) {
        quantities.pop();
        quantities.push(<span key="quantity-etc-+">&nbsp;+&nbsp;</span>);
        quantities.push(<br key="quantity-etc-br" />);
        quantities.push(<span key="quantity-etc">{translate(LocaleKey.more)}...</span>);
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
            <CustomTooltip tooltipText={props.tooltipText} position="top-start">
                {props.spans}
            </CustomTooltip>
        </div>
    );
}