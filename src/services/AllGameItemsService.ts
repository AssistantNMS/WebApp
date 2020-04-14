import { ResultWithValue } from '../contracts/results/ResultWithValue';
import { GameItemModel } from '../contracts/GameItemModel';
import { GameItemService } from './GameItemService';
import { CatalogueType } from '../constants/CatalogueType';
import { anyObject } from '../helper/TypescriptHacks';

export class AllGameItemsService {
  private typesArray = [
    CatalogueType.rawMaterials.toString(),
    CatalogueType.craftedProducts.toString(),
    CatalogueType.tradeItems.toString(),
    CatalogueType.buildings.toString(),
    CatalogueType.curiosity.toString(),
    CatalogueType.cooking.toString(),
    CatalogueType.technology.toString(),
    CatalogueType.upgradeModules.toString(),
    CatalogueType.constructedTechnology.toString(),
    CatalogueType.others.toString()
  ];

  async getAllItems(): Promise<ResultWithValue<Array<GameItemModel>>> {
    return this.getSelectedCatalogueItems(this.typesArray);
  }

  async getSelectedCatalogueItems(catalogueTypes: Array<string>): Promise<ResultWithValue<Array<GameItemModel>>> {
    const result = new Array<GameItemModel>();
    try {
      const gameItemService = new GameItemService();
      const tasks = Array<Promise<ResultWithValue<GameItemModel[]>>>();

      for (const catType of catalogueTypes) {
        if (!this.typeExist(catType)) continue;
        tasks.push(gameItemService.getListfromJson(catType));
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
        errorMessage: ex.message
      }
    }
  }

  async getByInputsId(itemId: string): Promise<ResultWithValue<Array<GameItemModel>>> {
    var allGenericItemsResult = await this.getAllItems();

    if (!allGenericItemsResult.isSuccess) {
      return {
        isSuccess: false,
        value: [],
        errorMessage: allGenericItemsResult.errorMessage,
      };
    }
    try {
      var craftableItems = allGenericItemsResult.value
        .filter((r: any) => r.RequiredItems.find((ri: any) => ri.Id === itemId) != null);
      return {
        isSuccess: true,
        value: craftableItems,
        errorMessage: '',
      };
    } catch (exception) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: exception.errorMessage,
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
