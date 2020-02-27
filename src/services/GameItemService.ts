import { BaseItemModel } from '../contracts/BaseItemModel';
import { DetailItemModel } from '../contracts/DetailItemModel';
import { GameItemModel } from '../contracts/GameItemModel';
import { ProcessorBase } from '../contracts/ProcessorBase';
import { ProcessorDetails } from '../contracts/ProcessorDetails';
import { RequiredItem } from '../contracts/RequiredItem';
import { RequiredItemDetails } from '../contracts/RequiredItemDetails';
import { ResultWithValue } from '../contracts/results/ResultWithValue';
import { getCatalogueFromItemId, mapToLocale } from '../mapper/CatalogueMapper';
import { mapGenericPageItems } from '../mapper/GameItemMapper';
import { mapProcessorItems } from '../mapper/ProcessorMapper';
import { BaseJsonService } from './BaseJsonService';
import { Processor } from '../contracts/Processor';
import { CatalogueType } from '../constants/CatalogueType';

export class GameItemService extends BaseJsonService {
  async getListfromJson(catalogueType: string): Promise<ResultWithValue<Array<GameItemModel>>> {
    const baseJson: string = catalogueType;
    const detailJson: string = mapToLocale(catalogueType);

    if (detailJson == null || detailJson.length < 1) {
      return { isSuccess: false, value: [], errorMessage: 'Locale not found' };
    }

    const result = await this.getAsset<Array<BaseItemModel>>(`json/${baseJson}.json`);
    if (!result.isSuccess) return { isSuccess: false, value: [], errorMessage: result.errorMessage };

    const langResult = await this.getAsset<Array<DetailItemModel>>(`json/${detailJson}.json`);
    if (!langResult.isSuccess) return { isSuccess: false, value: [], errorMessage: result.errorMessage };

    return {
      isSuccess: true,
      value: mapGenericPageItems(result.value, langResult.value),
      errorMessage: ''
    }
  }

  async getItemDetails(itemId: string): Promise<ResultWithValue<GameItemModel>> {
    let result: any = {};

    if (!itemId) return { isSuccess: false, value: result, errorMessage: 'itemId specified is invallid' };

    const catalogue = getCatalogueFromItemId(itemId);
    var list = await this.getListfromJson(catalogue);
    if (!list.isSuccess) return { isSuccess: false, value: result, errorMessage: list.errorMessage };

    let found = false;
    for (const item of list.value) {
      if (item.Id !== itemId) continue;

      result = item;
      found = true;
    }
    if (!found) {
      return {
        isSuccess: false,
        value: result,
        errorMessage: 'no matching item found',
      };
    }

    return {
      isSuccess: true,
      value: result,
      errorMessage: ''
    }
  }

  async getRequiredItems(itemId: string): Promise<ResultWithValue<Array<RequiredItemDetails>>> {
    const catalogue = getCatalogueFromItemId(itemId);
    var allGenericItemsResult = await this.getListfromJson(catalogue);

    if (!allGenericItemsResult.isSuccess) {
      return {
        isSuccess: false,
        value: [],
        errorMessage: allGenericItemsResult.errorMessage,
      };
    }
    var craftableItems = allGenericItemsResult.value
      .filter((r: any) => r.Id === itemId);
    if (craftableItems.length < 1)
      return {
        isSuccess: false,
        value: [],
        errorMessage: 'required items not found',
      };
    var requiredItemsTasks = craftableItems[0].RequiredItems.map(async (item: RequiredItem) => {
      var itemDetails = await this.getItemDetails(item.Id);
      if (!itemDetails.isSuccess) return null;

      var requiredItemDetails: RequiredItemDetails = {
        Id: itemDetails.value.Id,
        Icon: itemDetails.value.Icon,
        Name: itemDetails.value.Name,
        Colour: itemDetails.value.Colour,
        Quantity: item.Quantity
      }
      return requiredItemDetails;
    });
    var requiredItemsResults = await Promise.all(requiredItemsTasks);
    var requiredItems: any = requiredItemsResults.filter(r => r);

    return {
      isSuccess: true,
      value: requiredItems,
      errorMessage: '',
    };
  }

  async getProcessorListfromJson(catalogueType: string): Promise<ResultWithValue<Array<Processor>>> {
    const baseJson: string = catalogueType;
    const detailJson: string = mapToLocale(catalogueType);

    if (detailJson == null || detailJson.length < 1) {
      return { isSuccess: false, value: [], errorMessage: 'Locale not found' };
    }

    const result = await this.getAsset<Array<ProcessorBase>>(`json/${baseJson}.json`);
    if (!result.isSuccess) return { isSuccess: false, value: [], errorMessage: result.errorMessage };

    const langResult = await this.getAsset<Array<ProcessorDetails>>(`json/${detailJson}.json`);
    if (!langResult.isSuccess) return { isSuccess: false, value: [], errorMessage: result.errorMessage };

    return {
      isSuccess: true,
      value: mapProcessorItems(result.value, langResult.value),
      errorMessage: ''
    }
  }

  async getProcessorsByOutput(catalogueType: string, itemId: string): Promise<ResultWithValue<Array<Processor>>> {
    var allGenericItemsResult = await this.getProcessorListfromJson(catalogueType);

    if (!allGenericItemsResult.isSuccess) {
      return {
        isSuccess: false,
        value: [],
        errorMessage: allGenericItemsResult.errorMessage,
      };
    }

    var refFromOutputs = allGenericItemsResult.value.filter((ref => ref.Output.Id === itemId));
    if (refFromOutputs.length < 1)
      return {
        isSuccess: false,
        value: [],
        errorMessage: 'processor items not found',
      };

    return {
      isSuccess: true,
      value: refFromOutputs,
      errorMessage: '',
    };
  }

  getRefinedByOutput = async (itemId: string): Promise<ResultWithValue<Array<Processor>>> => await this.getProcessorsByOutput(CatalogueType.refinery, itemId);
  getCookingByOutput = async (itemId: string): Promise<ResultWithValue<Array<Processor>>> => await this.getProcessorsByOutput(CatalogueType.nutrientProcessor, itemId);

  async getProcessorsByInput(catalogueType: string, itemId: string): Promise<ResultWithValue<Array<Processor>>> {
    var allGenericItemsResult = await this.getProcessorListfromJson(catalogueType);

    if (!allGenericItemsResult.isSuccess) {
      return {
        isSuccess: false,
        value: [],
        errorMessage: allGenericItemsResult.errorMessage,
      };
    }

    var refFromOutputs = allGenericItemsResult.value.filter((ref => ref.Inputs.find((inp: any) => inp.Id === itemId) != null));
    if (refFromOutputs.length < 1)
      return {
        isSuccess: false,
        value: [],
        errorMessage: 'processor items not found',
      };

    return {
      isSuccess: true,
      value: refFromOutputs,
      errorMessage: '',
    };
  }

  getRefinedByInput = async (itemId: string): Promise<ResultWithValue<Array<Processor>>> => await this.getProcessorsByInput(CatalogueType.refinery, itemId);
  getCookingByInput = async (itemId: string): Promise<ResultWithValue<Array<Processor>>> => await this.getProcessorsByInput(CatalogueType.nutrientProcessor, itemId);

  async getProcessorById(catalogueType: string, itemId: string): Promise<ResultWithValue<Processor>> {
    var allGenericItemsResult = await this.getProcessorListfromJson(catalogueType);

    let result: any = {};
    if (!allGenericItemsResult.isSuccess) {
      return {
        isSuccess: false,
        value: result,
        errorMessage: allGenericItemsResult.errorMessage,
      };
    }

    let found = false;
    for (const item of allGenericItemsResult.value) {
      if (item.Id !== itemId) continue;

      result = item;
      found = true;
    }
    if (!found) {
      return {
        isSuccess: false,
        value: result,
        errorMessage: 'no matching item found',
      };
    }

    return {
      isSuccess: true,
      value: result,
      errorMessage: '',
    };
  }

  getRefinedById = async (itemId: string): Promise<ResultWithValue<Processor>> => await this.getProcessorById(CatalogueType.refinery, itemId);
  getCookingById = async (itemId: string): Promise<ResultWithValue<Processor>> => await this.getProcessorById(CatalogueType.nutrientProcessor, itemId);

  async getRequiredItemDetails(itemId: string): Promise<ResultWithValue<Array<RequiredItemDetails>>> {
    var processorRecipe = await this.getRefinedById(itemId);

    if (!processorRecipe.isSuccess) {
      return {
        isSuccess: false,
        value: [],
        errorMessage: processorRecipe.errorMessage,
      };
    }
    if (processorRecipe.value.Inputs.length < 1)
      return {
        isSuccess: false,
        value: [],
        errorMessage: 'required items not found',
      };
    var requiredItemsTasks = processorRecipe.value.Inputs.map(async (item: RequiredItem) => {
      var itemDetails = await this.getItemDetails(item.Id);
      if (!itemDetails.isSuccess) return null;

      var requiredItemDetails: RequiredItemDetails = {
        Id: itemDetails.value.Id,
        Icon: itemDetails.value.Icon,
        Name: itemDetails.value.Name,
        Colour: itemDetails.value.Colour,
        Quantity: item.Quantity
      }
      return requiredItemDetails;
    });
    var requiredItemsResults = await Promise.all(requiredItemsTasks);
    var requiredItems: any = requiredItemsResults.filter(r => r);

    return {
      isSuccess: true,
      value: requiredItems,
      errorMessage: '',
    };
  }

  async getItemDetailsFromIdList(itemIdsList: Array<string>): Promise<ResultWithValue<Array<GameItemModel>>> {
    var itemDetailsTask = itemIdsList.map(async (itemId: string) => {
      var itemDetails = await this.getItemDetails(itemId);
      if (!itemDetails.isSuccess) return null;

      return itemDetails;
    });
    var itemDetailsResults = await Promise.all(itemDetailsTask);
    var itemDetails: any = itemDetailsResults.filter(r => r);

    return {
      isSuccess: true,
      value: itemDetails,
      errorMessage: '',
    };
  }
}
