import { Guide } from '../../contracts/guide/guide';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { anyObject } from '../../helper/typescriptHacks';

export class BaseJsonService {
  protected async getAsset<T>(url: string): Promise<ResultWithValue<T>> {
    try {
      const result = await fetch(`/assets/${url}`);
      const data = await result.json();
      return {
        isSuccess: true,
        value: data,
        errorMessage: '',
      };
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: (ex as Error).message,
      };
    }
  }

  protected async getJsonGuide(guideFolder: string, jsonFileName: string): Promise<Guide> {
    const guideDynamic = await this.getJsonFromAssets<Guide>(`guide/${guideFolder}/${jsonFileName}`);
    guideDynamic.folder = guideFolder;
    return guideDynamic;
  }

  protected async getJsonFromAssets<T>(jsonFileName: string) {
    const result = await fetch(`/assets/${jsonFileName}.json`);
    const data: T = await result.json();
    return data;
  }
}
