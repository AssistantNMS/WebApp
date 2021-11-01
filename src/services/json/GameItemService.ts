import i18next from 'i18next';
import { CatalogueType } from '../../constants/CatalogueType';
import { GameItemModel } from '../../contracts/GameItemModel';
import { WeekendMission } from '../../contracts/helloGames/weekendMission';
import { WeekendMissionStage } from '../../contracts/helloGames/weekendMissionStage';
import { Processor } from '../../contracts/Processor';
import { RequiredItem } from '../../contracts/RequiredItem';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { anyObject } from '../../helper/typescriptHacks';
import { LocaleKey } from '../../localization/LocaleKey';
import { getCatalogueFromItemId, mapToLocale } from '../../mapper/CatalogueMapper';
import { BaseJsonService } from './BaseJsonService';

export class GameItemService extends BaseJsonService {
  async getListfromJson(catalogueType: string): Promise<ResultWithValue<Array<GameItemModel>>> {
    const detailJson: string = mapToLocale(catalogueType);

    if (detailJson == null || detailJson.length < 1) {
      return { isSuccess: false, value: [], errorMessage: 'Locale not found' };
    }

    const langResult = await this.getAsset<Array<GameItemModel>>(`json/${detailJson}.json`);
    if (!langResult.isSuccess) return { isSuccess: false, value: [], errorMessage: langResult.errorMessage };

    return {
      isSuccess: true,
      value: langResult.value,
      errorMessage: ''
    }
  }

  async getItemDetails(itemId: string): Promise<ResultWithValue<GameItemModel>> {
    let result: any = {};

    if (!itemId) return { isSuccess: false, value: result, errorMessage: 'itemId specified is invallid' };

    const catalogue = getCatalogueFromItemId(itemId);
    const list = await this.getListfromJson(catalogue);
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
    const allGenericItemsResult = await this.getListfromJson(catalogue);

    if (!allGenericItemsResult.isSuccess) {
      return {
        isSuccess: false,
        value: [],
        errorMessage: allGenericItemsResult.errorMessage,
      };
    }
    const craftableItems = allGenericItemsResult.value
      .filter((r: any) => r.Id === itemId);
    if (craftableItems.length < 1)
      return {
        isSuccess: false,
        value: [],
        errorMessage: 'required items not found',
      };
    const requiredItemsTasks = (craftableItems[0].RequiredItems ?? []).map(async (item: RequiredItem) => {
      const itemDetails = await this.getItemDetails(item.Id);
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
    const requiredItems: any = requiredItemsResults.filter(r => r);

    return {
      isSuccess: true,
      value: requiredItems,
      errorMessage: '',
    };
  }

  async getProcessorListfromJson(catalogueType: string): Promise<ResultWithValue<Array<Processor>>> {
    const detailJson: string = mapToLocale(catalogueType);

    if (detailJson == null || detailJson.length < 1) {
      return { isSuccess: false, value: [], errorMessage: 'Locale not found' };
    }

    const langResult = await this.getAsset<Array<Processor>>(`json/${detailJson}.json`);
    if (!langResult.isSuccess) return { isSuccess: false, value: [], errorMessage: langResult.errorMessage };

    return {
      isSuccess: true,
      value: langResult.value,
      errorMessage: ''
    }
  }

  async getProcessorsByOutput(catalogueType: string, itemId: string): Promise<ResultWithValue<Array<Processor>>> {
    const allGenericItemsResult = await this.getProcessorListfromJson(catalogueType);

    if (!allGenericItemsResult.isSuccess) {
      return {
        isSuccess: false,
        value: [],
        errorMessage: allGenericItemsResult.errorMessage,
      };
    }

    const refFromOutputs = allGenericItemsResult.value.filter((ref => ref.Output.Id === itemId));
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
    const allGenericItemsResult = await this.getProcessorListfromJson(catalogueType);

    if (!allGenericItemsResult.isSuccess) {
      return {
        isSuccess: false,
        value: [],
        errorMessage: allGenericItemsResult.errorMessage,
      };
    }

    const refFromOutputs = allGenericItemsResult.value.filter((ref => ref.Inputs.find((inp: any) => inp.Id === itemId) != null));
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
    const allGenericItemsResult = await this.getProcessorListfromJson(catalogueType);

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
    let processorRecipe = (itemId.includes('ref'))
      ? await this.getRefinedById(itemId)
      : await this.getCookingById(itemId);

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
    const requiredItemsTasks = processorRecipe.value.Inputs.map(async (item: RequiredItem) => {
      const itemDetails = await this.getItemDetails(item.Id);
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
    const requiredItems: any = requiredItemsResults.filter(r => r);

    return {
      isSuccess: true,
      value: requiredItems,
      errorMessage: '',
    };
  }

  async getItemDetailsFromIdList(itemIdsList: Array<string>): Promise<ResultWithValue<Array<GameItemModel>>> {
    const itemDetailsTask = itemIdsList.map(async (itemId: string) => {
      const itemDetails = await this.getItemDetails(itemId);
      if (!itemDetails.isSuccess) return null;

      return itemDetails;
    });
    const itemDetailsResults = await Promise.all(itemDetailsTask);
    const itemDetails: any = itemDetailsResults.filter(r => r);

    return {
      isSuccess: true,
      value: itemDetails,
      errorMessage: '',
    };
  }

  async getWeekendMissionStage(weekendMissionJson: LocaleKey, seasonId: string, levelId: number): Promise<ResultWithValue<WeekendMissionStage>> {
    let result: any = {};

    if (!seasonId) return { isSuccess: false, value: result, errorMessage: 'seasonId specified is invallid' };
    if (!levelId) return { isSuccess: false, value: result, errorMessage: 'levelId specified is invallid' };

    const path = i18next.t(weekendMissionJson).toString();
    const weekendMissionsResult = await this.getAsset<Array<WeekendMission>>(`json/${path}.json`);
    if (!weekendMissionsResult.isSuccess) return { isSuccess: false, value: anyObject, errorMessage: result.errorMessage };

    let found = false;
    for (const item of weekendMissionsResult.value) {
      if (item.Id !== seasonId) continue;

      for (const stage of item.Stages) {
        if (stage.Level !== levelId) continue;

        result = stage;
        found = true;
      }
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
}
