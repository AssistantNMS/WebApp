import { RequiredItemDetails } from '../contracts/RequiredItemDetails';
import { RequiredItem } from '../contracts/RequiredItem';
import { GameItemModel } from '../contracts/GameItemModel';

import { GameItemService } from '../services/GameItemService';
import { ResultWithValue } from '../contracts/results/ResultWithValue';

export const getAllRequiredItemsForMultiple = async (requiredItems: Array<RequiredItem>): Promise<Array<RequiredItemDetails>> => {
    let rawMaterials = [];
    for (var requiredItem of requiredItems) {
        const tempItems = await getRequiredItems(requiredItem);
        for (var tempItemIndex = 0;
            tempItemIndex < tempItems.length;
            tempItemIndex++) {
            var tempItem = tempItems[tempItemIndex];
            // if (tempItem.id != requiredItem.id) {
            //   tempItem.quantity = tempItem.quantity * requiredItem.quantity;
            // }
            rawMaterials.push(tempItem);
        }
    }

    const rawMaterialMap: Map<String, RequiredItemDetails> = new Map<String, RequiredItemDetails>();
    for (var rawMaterialIndex = 0;
        rawMaterialIndex < rawMaterials.length;
        rawMaterialIndex++) {
        const rawMaterialDetails: RequiredItemDetails = rawMaterials[rawMaterialIndex];
        if (rawMaterialMap.has(rawMaterialDetails.Id)) {
            const existing = rawMaterialMap.get(rawMaterialDetails.Id);
            rawMaterialMap.set(rawMaterialDetails.Id,
                {
                    ...rawMaterialDetails,
                    Quantity: (existing?.Quantity || 0) + rawMaterialDetails.Quantity,
                });
        } else {
            rawMaterialMap.set(rawMaterialDetails.Id, { ...rawMaterialDetails });
        }
    }
    const results: Array<RequiredItemDetails> = [];
    rawMaterialMap.forEach((val) => {
        results.push(val);
    });
    return results.sort((a, b) => a.Quantity < b.Quantity ? 1 : 0);
}

export const getRequiredItems = async (requiredItem: RequiredItem): Promise<Array<RequiredItemDetails>> => {
    let tempRawMaterials: Array<RequiredItem> = [];

    const gameItemService = new GameItemService();
    const genericResult = await gameItemService.getItemDetails(requiredItem.Id);
    if (!genericResult.isSuccess) {
        console.error(`genericItemResult hasFailed: ${genericResult.errorMessage}`);
        return [];
    }

    tempRawMaterials = genericResult.value.RequiredItems;
    let requiredItemDetails: RequiredItemDetails = toRequiredItemDetails(requiredItem, genericResult.value);

    var rawMaterialsResult: Array<RequiredItemDetails> = [];

    if (tempRawMaterials != null &&
        tempRawMaterials.length === 0 &&
        requiredItemDetails != null) {
        rawMaterialsResult.push(requiredItemDetails);
        return rawMaterialsResult;
    }

    for (var requiredIndex = 0;
        requiredIndex < tempRawMaterials.length;
        requiredIndex++) {
        const rawMaterial: RequiredItem = tempRawMaterials[requiredIndex];
        rawMaterial.Quantity *= requiredItem.Quantity;
        const requiredItems: Array<RequiredItemDetails> = await getRequiredItems(rawMaterial);
        for (const requiredItem of requiredItems) {
            rawMaterialsResult.push(requiredItem);
        }
    }
    return rawMaterialsResult;
}

export const toRequiredItemDetails = (requiredItem: RequiredItem, genericItem: GameItemModel): RequiredItemDetails => {
    const result: RequiredItemDetails = {
        Id: requiredItem.Id,
        Icon: genericItem.Icon,
        Name: genericItem.Name,
        Colour: genericItem.Colour,
        Quantity: requiredItem.Quantity,
    };
    return result;
}

export const requiredItemDetailsFromInputs = async (inputs: Array<RequiredItem>): Promise<ResultWithValue<Array<RequiredItemDetails>>> => {
    const details: Array<RequiredItemDetails> = [];

    for (var refInputIndex = 0; refInputIndex < inputs.length; refInputIndex++) {
        var refinerInput = inputs[refInputIndex];

        const gameItemService = new GameItemService();
        const itemResult = await gameItemService.getItemDetails(refinerInput.Id);
        if (!itemResult.isSuccess) continue;
        details.push(toRequiredItemDetails(refinerInput, itemResult.value));
    }

    return details.length > 0
        ? {
            isSuccess: true,
            value: details,
            errorMessage: ''
        }
        : {
            isSuccess: false,
            value: details,
            errorMessage: 'no item found for refiner inputs'
        };
}
