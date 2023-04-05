import { CatalogueType } from '../../constants/CatalogueType';
import { CreatureHarvest } from '../../contracts/data/creatureHarvest';
import { GameItemModel } from '../../contracts/GameItemModel';
import { ExpeditionSeason } from '../../contracts/helloGames/expeditionSeason';
import { WeekendMission } from '../../contracts/helloGames/weekendMission';
import { WeekendMissionStage } from '../../contracts/helloGames/weekendMissionStage';
import { Processor } from '../../contracts/Processor';
import { RequiredItem } from '../../contracts/RequiredItem';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { TitleData } from '../../contracts/TitleData';
import { UnlockableTechTree } from '../../contracts/tree/techTree';
import { getHashForObject } from '../../helper/hashHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { LocaleKey } from '../../localization/LocaleKey';
import { getCurrentLang, translate } from '../../localization/Translate';
import { getCatalogueFromItemId, mapToLocale } from '../../mapper/CatalogueMapper';
import { BaseJsonService } from './BaseJsonService';

export class GameItemService extends BaseJsonService {

  private _hashLookup: any;

  constructor() {
    super();
    this._hashLookup = anyObject;
  }

  async _getOrAdd<T>(promise: () => Promise<T>, argsArray: Array<any>) {
    const hash = getHashForObject([argsArray, getCurrentLang()]);

    if (this._hashLookup != null && this._hashLookup[hash] != null) {
      return this._hashLookup[hash];
    }

    const jsonResult = await promise();
    this._hashLookup[hash] = jsonResult;
    return jsonResult;
  }

  async getListfromJson(catalogueType: string): Promise<ResultWithValue<Array<GameItemModel>>> {
    return this._getOrAdd(() => this._getListfromJson(catalogueType), ['_getListfromJson', catalogueType]);
  }
  async _getListfromJson(catalogueType: string): Promise<ResultWithValue<Array<GameItemModel>>> {
    const detailJson: string = mapToLocale(catalogueType);

    if (detailJson == null || detailJson.length < 1) {
      return { isSuccess: false, value: [], errorMessage: 'Locale not found' };
    }

    const langResult = await this.getAsset<Array<GameItemModel>>(`json/${detailJson}.json`);
    if (!langResult.isSuccess) return { isSuccess: false, value: [], errorMessage: langResult.errorMessage };

    return {
      isSuccess: true,
      value: langResult.value.filter(item => item.Name.length > 0),
      errorMessage: ''
    }
  }

  getItemDetails = async (itemId: string): Promise<ResultWithValue<GameItemModel>> => {
    return this._getOrAdd(() => this._getItemDetails(itemId), ['_getItemDetails', itemId]);
  }
  async _getItemDetails(itemId: string): Promise<ResultWithValue<GameItemModel>> {
    if (!itemId) return { isSuccess: false, value: anyObject, errorMessage: 'itemId specified is invallid' };

    const catalogue = getCatalogueFromItemId(itemId);
    const list = await this.getListfromJson(catalogue);
    if (!list.isSuccess) return { isSuccess: false, value: anyObject, errorMessage: list.errorMessage };

    for (const item of list.value) {
      if (item.Id !== itemId) continue;

      return {
        isSuccess: true,
        value: item,
        errorMessage: ''
      }
    }

    return {
      isSuccess: false,
      value: anyObject,
      errorMessage: 'no matching item found',
    };
  }


  async getRequiredItems(itemId: string): Promise<ResultWithValue<Array<RequiredItemDetails>>> {
    return this._getOrAdd(() => this._getRequiredItems(itemId), ['_getRequiredItems', itemId]);
  }
  async _getRequiredItems(itemId: string): Promise<ResultWithValue<Array<RequiredItemDetails>>> {
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
    return this._getOrAdd(() => this._getProcessorListfromJson(catalogueType), ['_getProcessorListfromJson', catalogueType]);
  }
  async _getProcessorListfromJson(catalogueType: string): Promise<ResultWithValue<Array<Processor>>> {
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
    return this._getOrAdd(() => this._getProcessorsByOutput(catalogueType, itemId), ['_getProcessorsByOutput', catalogueType, itemId]);
  }
  async _getProcessorsByOutput(catalogueType: string, itemId: string): Promise<ResultWithValue<Array<Processor>>> {
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
    return this._getOrAdd(() => this._getProcessorsByInput(catalogueType, itemId), ['_getProcessorsByInput', catalogueType, itemId]);
  }
  async _getProcessorsByInput(catalogueType: string, itemId: string): Promise<ResultWithValue<Array<Processor>>> {
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
    return this._getOrAdd(() => this._getProcessorById(catalogueType, itemId), ['_getProcessorById', catalogueType, itemId]);
  }
  async _getProcessorById(catalogueType: string, itemId: string): Promise<ResultWithValue<Processor>> {
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
    return this._getOrAdd(() => this._getRequiredItemDetails(itemId), ['_getRequiredItemDetails', itemId]);
  }
  async _getRequiredItemDetails(itemId: string): Promise<ResultWithValue<Array<RequiredItemDetails>>> {
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
    return this._getOrAdd(() => this._getItemDetailsFromIdList(itemIdsList), ['_getItemDetailsFromIdList', itemIdsList]);
  }
  async _getItemDetailsFromIdList(itemIdsList: Array<string>): Promise<ResultWithValue<Array<GameItemModel>>> {
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
    return this._getOrAdd(() => this._getWeekendMissionStage(weekendMissionJson, seasonId, levelId), ['_getWeekendMissionStage', weekendMissionJson, seasonId, levelId]);
  }
  async _getWeekendMissionStage(weekendMissionJson: LocaleKey, seasonId: string, levelId: number): Promise<ResultWithValue<WeekendMissionStage>> {
    let result: any = {};

    if (!seasonId) return { isSuccess: false, value: result, errorMessage: 'seasonId specified is invallid' };
    if (!levelId) return { isSuccess: false, value: result, errorMessage: 'levelId specified is invallid' };

    const path = translate(weekendMissionJson).toString();
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

  async getAllSeasonExpeditions(): Promise<ResultWithValue<Array<ExpeditionSeason>>> {
    return this._getOrAdd(() => this._getAllSeasonExpeditions(), ['_getAllSeasons']);
  }
  async _getAllSeasonExpeditions(): Promise<ResultWithValue<Array<ExpeditionSeason>>> {
    const path = translate(LocaleKey.seasonalExpeditionJson).toString();
    const seasonExpeditionResult = await this.getAsset<Array<ExpeditionSeason>>(`json/${path}.json`);
    if (!seasonExpeditionResult.isSuccess) return { isSuccess: false, value: anyObject, errorMessage: seasonExpeditionResult.errorMessage };

    return {
      isSuccess: true,
      value: seasonExpeditionResult.value,
      errorMessage: ''
    }
  }

  async getTechTree(): Promise<ResultWithValue<Array<UnlockableTechTree>>> {
    return this._getOrAdd(() => this._getTechTree(), ['_getTechTree']);
  }
  async _getTechTree(): Promise<ResultWithValue<Array<UnlockableTechTree>>> {
    const path = translate(LocaleKey.techTreeJson).toString();
    const jsonResult = await this.getAsset<Array<UnlockableTechTree>>(`json/${path}.json`);
    if (!jsonResult.isSuccess) return { isSuccess: false, value: anyObject, errorMessage: jsonResult.errorMessage };

    return {
      isSuccess: true,
      value: jsonResult.value,
      errorMessage: ''
    }
  }

  async getTitles(): Promise<ResultWithValue<Array<TitleData>>> {
    return this._getOrAdd(() => this._getTitles(), ['_getTitles']);
  }
  async _getTitles(): Promise<ResultWithValue<Array<TitleData>>> {
    const path = translate(LocaleKey.titlesJson).toString();
    const jsonResult = await this.getAsset<Array<TitleData>>(`json/${path}.json`);
    if (!jsonResult.isSuccess) return { isSuccess: false, value: anyObject, errorMessage: jsonResult.errorMessage };

    return {
      isSuccess: true,
      value: jsonResult.value,
      errorMessage: ''
    }
  }


  async getCreatureHarvestForItem(itemId: string): Promise<ResultWithValue<Array<CreatureHarvest>>> {
    return this._getOrAdd(() => this._getCreatureHarvestForItem(itemId), ['_getCreatureHarvestForItem', itemId]);
  }
  async _getCreatureHarvestForItem(itemId: string): Promise<ResultWithValue<Array<CreatureHarvest>>> {
    const path = translate(LocaleKey.creatureHarvestJson).toString();
    const jsonResult = await this.getAsset<Array<CreatureHarvest>>(`json/${path}.json`);

    if (!jsonResult.isSuccess) return { isSuccess: false, value: [], errorMessage: jsonResult.errorMessage };

    const specificToItemId = jsonResult.value.filter((creatureHarvest) => creatureHarvest.ItemId === itemId);
    return {
      isSuccess: true,
      value: specificToItemId,
      errorMessage: ''
    }
  }
}
