import axios from 'axios';
import { ResultWithValue } from '../contracts/results/ResultWithValue';
import { anyObject } from '../helper/typescriptHacks';
import { Guide } from '../contracts/guide/guide';

export class BaseJsonService {
  protected async getAsset<T>(url: string): Promise<ResultWithValue<T>> {
    try {
      const result = await axios.request<T>({
        url: `/assets/${url}`
      });
      return {
        isSuccess: true,
        value: result.data,
        errorMessage: ''
      }
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex.message
      }
    }
  }

  protected async getJsonGuide(guideFolder: string, jsonFileName: string): Promise<Guide> {
    var guideDynamic = await this.getJsonFromAssets<Guide>(`guide/${guideFolder}/${jsonFileName}`);
    guideDynamic.folder = guideFolder;
    return guideDynamic;
  }

  protected async getJsonFromAssets<T>(jsonFileName: string) {
    var jsonString = await axios.request<T>({
      url: `/assets/${jsonFileName}.json`
    });
    return jsonString.data;
  }
}
