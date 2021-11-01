import i18next from 'i18next';
import { LocaleKey } from '../../localization/LocaleKey';

import { GuideListItem } from '../../contracts/guide/guideListItem';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { BaseJsonService } from './BaseJsonService';
import { Guide } from '../../contracts/guide/guide';
import { dateIsBefore } from '../../helper/dateHelper';

export class GuideService extends BaseJsonService {
    async getListOfGuides(): Promise<ResultWithValue<Array<Guide>>> {
        const guidesDir = await this.getAsset<Array<GuideListItem>>(`json/${i18next.t(LocaleKey.guidesJson).toString()}.json`)
        if (!guidesDir.isSuccess) return {
            isSuccess: false,
            value: [],
            errorMessage: guidesDir.errorMessage
        };

        const guideTasks = guidesDir.value.map((guideItem) => this.getJsonGuide(guideItem.folder, guideItem.file));
        const guides = await Promise.all(guideTasks);
        let sortedGuide: any = guides.slice().sort((a: any, b: any) =>
            (dateIsBefore(a.date, b.date) ? 1 : -1));
        return {
            isSuccess: true,
            value: sortedGuide,
            errorMessage: ''
        };
    }

    async getSpecificGuide(guid: string): Promise<ResultWithValue<Guide>> {
        const allGuidesResult = await this.getListOfGuides()
        const anyObj: any = {};
        if (!allGuidesResult.isSuccess) return {
            isSuccess: false,
            value: anyObj,
            errorMessage: allGuidesResult.errorMessage
        };

        let guide: Guide = anyObj;
        for (const guideItem of allGuidesResult.value) {
            if (guideItem.guid !== guid) continue;
            guide = guideItem;
        }
        return {
            isSuccess: true,
            value: guide,
            errorMessage: ''
        };
    }
}