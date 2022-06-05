import { CatalogueType } from '../../constants/CatalogueType';
import { GameItemModel } from '../../contracts/GameItemModel';
import { RequiredItem } from '../../contracts/RequiredItem';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { getHashForObject } from '../../helper/hashHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { getCurrentLang } from '../../localization/Translate';
import { GameItemService } from './GameItemService';

export class AllGameItemsService {
  private typesArray = [
    CatalogueType.rawMaterials.toString(),
    CatalogueType.craftedProducts.toString(),
    CatalogueType.tradeItems.toString(),
    CatalogueType.buildings.toString(),
    CatalogueType.curiosity.toString(),
    CatalogueType.cooking.toString(),
    CatalogueType.technology.toString(),
    CatalogueType.technologyModule.toString(),
    CatalogueType.constructedTechnology.toString(),
    CatalogueType.others.toString(),
    CatalogueType.proceduralProducts.toString(),
  ];

  private _gameItemService: GameItemService;
  private _hashLookup: any;

  constructor(gameItemService: GameItemService) {
    this._gameItemService = gameItemService;
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

  async getAllItems(): Promise<ResultWithValue<Array<GameItemModel>>> {
    return this.getSelectedCatalogueItems(this.typesArray);
  }

  async getSelectedCatalogueItems(catalogueTypes: Array<string>): Promise<ResultWithValue<Array<GameItemModel>>> {
    return this._getOrAdd(() => this._getSelectedCatalogueItems(catalogueTypes), ['getSelectedCatalogueItems', catalogueTypes]);
  }

  async _getSelectedCatalogueItems(catalogueTypes: Array<string>): Promise<ResultWithValue<Array<GameItemModel>>> {
    const result = new Array<GameItemModel>();
    try {
      const tasks = Array<Promise<ResultWithValue<GameItemModel[]>>>();

      for (const catType of catalogueTypes) {
        if (!this.typeExist(catType)) continue;
        tasks.push(this._gameItemService.getListfromJson(catType));
      }

      const allResults = await Promise.all(tasks);
      for (const itemResult of allResults) {
        if (!itemResult.isSuccess) {
          console.error(itemResult.errorMessage);
          continue;
        }

        for (const item of itemResult.value) {
          result.push(item);
        }
      }
      result.sort(this.compare)
      return {
        isSuccess: true,
        value: result,
        errorMessage: ''
      }
    } catch (ex) {
      return {
        isSuccess: false,
        value: result,
        errorMessage: (ex as any).message
      }
    }
  }

  async getByInputsId(itemId: string): Promise<ResultWithValue<Array<GameItemModel>>> {
    return this._getOrAdd(() => this._getByInputsId(itemId), ['_getByInputsId', itemId]);
  }

  async _getByInputsId(itemId: string): Promise<ResultWithValue<Array<GameItemModel>>> {
    const allGenericItemsResult = await this.getAllItems();

    if (!allGenericItemsResult.isSuccess) {
      return {
        isSuccess: false,
        value: [],
        errorMessage: allGenericItemsResult.errorMessage,
      };
    }
    try {
      const craftableItems = allGenericItemsResult.value
        .filter((r: GameItemModel) => (r.RequiredItems ?? []).find((ri: RequiredItem) => ri.Id === itemId) != null);
      return {
        isSuccess: true,
        value: craftableItems,
        errorMessage: '',
      };
    } catch (exception) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: (exception as any).errorMessage,
      };
    }
  }

  compare(a: GameItemModel, b: GameItemModel) {
    const nameA = a.Name.toUpperCase();
    const nameB = b.Name.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  typeExist(possibleType: string) {
    return this.typesArray.includes(possibleType);
  }
}
