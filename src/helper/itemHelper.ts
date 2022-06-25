import { RequiredItemDetails } from '../contracts/RequiredItemDetails';
import { RequiredItem } from '../contracts/RequiredItem';
import { GameItemModel } from '../contracts/GameItemModel';

import { GameItemService } from '../services/json/GameItemService';
import { ResultWithValue } from '../contracts/results/ResultWithValue';
import { Tree } from '../contracts/tree/tree';

export const getAllRequiredItemsForMultiple = async (gameItemService: GameItemService, requiredItems: Array<RequiredItem>): Promise<Array<RequiredItemDetails>> => {
    let rawMaterials = [];
    for (const requiredItem of requiredItems) {
        const tempItems = await getRequiredItems(gameItemService, requiredItem);
        for (let tempItemIndex = 0;
            tempItemIndex < tempItems.length;
            tempItemIndex++) {
            const tempItem = tempItems[tempItemIndex];
            // if (tempItem.id != requiredItem.id) {
            //   tempItem.quantity = tempItem.quantity * requiredItem.quantity;
            // }
            rawMaterials.push(tempItem);
        }
    }

    const rawMaterialMap: Map<String, RequiredItemDetails> = new Map<String, RequiredItemDetails>();
    for (let rawMaterialIndex = 0;
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

export const getRequiredItems = async (gameItemService: GameItemService, requiredItem: RequiredItem): Promise<Array<RequiredItemDetails>> => {
    let tempRawMaterials: Array<RequiredItem> = [];

    const genericResult = await gameItemService.getItemDetails(requiredItem.Id);
    if (!genericResult.isSuccess) {
        console.error(`genericItemResult hasFailed: ${genericResult.errorMessage}`);
        return [];
    }

    tempRawMaterials = [...genericResult.value.RequiredItems];
    let requiredItemDetails: RequiredItemDetails = toRequiredItemDetails(requiredItem, genericResult.value);

    const rawMaterialsResult: Array<RequiredItemDetails> = [];

    if (tempRawMaterials != null &&
        tempRawMaterials.length === 0 &&
        requiredItemDetails != null) {
        rawMaterialsResult.push(requiredItemDetails);
        return rawMaterialsResult;
    }

    for (let requiredIndex = 0;
        requiredIndex < tempRawMaterials.length;
        requiredIndex++) {
        const rawMaterial: RequiredItem = tempRawMaterials[requiredIndex];
        const rawMaterialToPassFurther: RequiredItem = {
            ...rawMaterial,
            Quantity: rawMaterial.Quantity * requiredItem.Quantity
        }
        const requiredItems: Array<RequiredItemDetails> = await getRequiredItems(gameItemService, rawMaterialToPassFurther);
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

export const requiredItemDetailsFromInputs = async (gameItemService: GameItemService, inputs: Array<RequiredItem>): Promise<ResultWithValue<Array<RequiredItemDetails>>> => {
    const details: Array<RequiredItemDetails> = [];

    for (let refInputIndex = 0; refInputIndex < inputs.length; refInputIndex++) {
        const refinerInput = inputs[refInputIndex];

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

export const getRequiredItemsForTreeItem = async (gameItemService: GameItemService, requiredItem: RequiredItem): Promise<Tree<RequiredItemDetails> | null> => {
    const genericResult = await gameItemService.getItemDetails(requiredItem.Id);
    if (!genericResult.isSuccess) {
        console.error(`genericItemResult hasFailed: ${genericResult.errorMessage}`);
        return null;
    }

    const reqItemsDetails: Array<Tree<RequiredItemDetails>> = [];
    for (let reqInput = 0; reqInput < genericResult.value.RequiredItems.length; reqInput++) {
        const reqItem: RequiredItem = genericResult.value.RequiredItems[reqInput];
        const reqItemToPassFurther: RequiredItem = {
            ...reqItem,
            Quantity: reqItem.Quantity * requiredItem.Quantity
        }
        const treeReq = await getRequiredItemsForTreeItem(gameItemService, reqItemToPassFurther);
        if (treeReq != null) reqItemsDetails.push(treeReq);
    }

    let currentItemDetail: RequiredItemDetails = toRequiredItemDetails(requiredItem, genericResult.value);
    const result: Tree<RequiredItemDetails> = {
        item: currentItemDetail,
        children: reqItemsDetails,
    };
    return result;
}

export const getAllRequiredItemsForTree = async (gameItemService: GameItemService, requiredItems: Array<RequiredItem>): Promise<Array<Tree<RequiredItemDetails>>> => {
    const results: Array<Tree<RequiredItemDetails>> = [];

    for (const reqItem of requiredItems) {
        const topLevel = await getRequiredItemsForTreeItem(gameItemService, reqItem);
        if (topLevel != null) results.push(topLevel);
    }
    return results;
}
