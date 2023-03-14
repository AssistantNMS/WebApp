import axios from 'axios';

import { Guide } from '../../contracts/guide/guide';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { isRunningInOverwolf } from '../../helper/overwolfHelper';
import { anyObject } from '../../helper/typescriptHacks';

export class BaseJsonService {
  protected async getAsset<T>(url: string): Promise<ResultWithValue<T>> {
    const urlPrefix = isRunningInOverwolf() ? 'https://app.nmsassistant.com/assets' : '/assets';
    try {
      const result = await axios.request<T>({
        url: `${urlPrefix}/${url}`
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
        errorMessage: (ex as any).message
      }
    }
  }

  protected async getJsonGuide(guideFolder: string, jsonFileName: string): Promise<Guide> {
    const guideDynamic = await this.getJsonFromAssets<Guide>(`guide/${guideFolder}/${jsonFileName}`);
    guideDynamic.folder = guideFolder;
    return guideDynamic;
  }

  protected async getJsonFromAssets<T>(jsonFileName: string) {
    const urlPrefix = isRunningInOverwolf() ? 'https://app.nmsassistant.com/assets' : '/assets';
    const jsonString = await axios.request<T>({
      url: `${urlPrefix}/${jsonFileName}.json`
    });
    return jsonString.data;
  }
}
