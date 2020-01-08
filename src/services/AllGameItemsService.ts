import { ResultWithValue } from '../contracts/results/ResultWithValue';
import { GameItemModel } from '../contracts/GameItemModel';
import { GameItemService } from './GameItemService';
import { CatalogueType } from '../constants/CatalogueType';

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
