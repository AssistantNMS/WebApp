import { translate } from '../../localization/Translate';
import { LocaleKey } from '../../localization/LocaleKey';

import { GuideListItem } from '../../contracts/guide/guideListItem';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { BaseJsonService } from './BaseJsonService';
import { Guide } from '../../contracts/guide/guide';
import { dateIsBefore } from '../../helper/dateHelper';
import { anyObject } from '../../helper/typescriptHacks';

export class GuideService extends BaseJsonService {
  async getListOfGuides(): Promise<ResultWithValue<Array<Guide>>> {
    const guidesDir = await this.getAsset<Array<GuideListItem>>(`json/${translate(LocaleKey.guidesJson).toString()}.json`);
    if (!guidesDir.isSuccess)
      return {
        isSuccess: false,
        value: [],
        errorMessage: guidesDir.errorMessage,
      };

    const guideTasks = guidesDir.value.map((guideItem) => this.getJsonGuide(guideItem.folder, guideItem.file));
    const guides = await Promise.all(guideTasks);
    const sortedGuide: Array<Guide> = guides.slice().sort((a: Guide, b: Guide) => (dateIsBefore(a.date, b.date) ? 1 : -1));
    return {
      isSuccess: true,
      value: sortedGuide,
      errorMessage: '',
    };
  }

  async getSpecificGuide(guid: string): Promise<ResultWithValue<Guide>> {
    const allGuidesResult = await this.getListOfGuides();
    if (!allGuidesResult.isSuccess)
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: allGuidesResult.errorMessage,
      };

    let guide: Guide | undefined;
    for (const guideItem of allGuidesResult.value) {
      if (guideItem.guid !== guid) continue;
      guide = guideItem;
    }
    return {
      isSuccess: guide != undefined,
      value: guide as Guide,
      errorMessage: '',
    };
  }
}
