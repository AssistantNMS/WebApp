import { GameItemModel } from '../contracts/GameItemModel';
import { BaseJsonService } from './BaseJsonService';
import { ResultWithValue } from '../contracts/results/ResultWithValue';
import { BaseItemModel } from '../contracts/BaseItemModel';
import { DetailItemModel } from '../contracts/DetailItemModel';
import { mapGenericPageItems } from '../mapper/GameItemMapper';
import { mapToLocale, getCatalogueFromItemId } from '../mapper/CatalogueMapper';

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

    const catalogue = getCatalogueFromItemId(itemId);
    var list = await this.getListfromJson(catalogue);
    if (!list.isSuccess) return { isSuccess: false, value: result, errorMessage: list.errorMessage };

    for (const item of list.value) {
      if (item.Id !== itemId) continue;

      result = item;
    }

    return {
      isSuccess: true,
      value: result,
      errorMessage: ''
    }
  }
}
