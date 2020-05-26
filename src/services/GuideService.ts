import i18next from 'i18next';
import { LocaleKey } from '../localization/LocaleKey';

import { GuideListItem } from '../contracts/guide/guideListItem';
import { ResultWithValue } from '../contracts/results/ResultWithValue';
import { BaseJsonService } from './BaseJsonService';
import { Guide } from '../contracts/guide/guide';

var moment = require('moment');

export class GuideService extends BaseJsonService {
    async getListOfGuides(): Promise<ResultWithValue<Array<Guide>>> {
        var guidesDir = await this.getAsset<Array<GuideListItem>>(`json/${i18next.t(LocaleKey.guidesJson).toString()}.json`)
        if (!guidesDir.isSuccess) return {
            isSuccess: false,
            value: [],
            errorMessage: guidesDir.errorMessage
        };

        var guides = Array<Guide>();
        for (const guideItem of guidesDir.value) {
            var guideDynamic = await this.getJsonGuide(guideItem.folder, guideItem.file);
            guideDynamic.folder = guideItem.folder;
            guides.push(guideDynamic);
        }
        let sortedGuide = guides.slice().sort((a: Guide, b: Guide) =>
            (moment(a.date).isBefore(b.date) ? 1 : -1));
        return {
            isSuccess: true,
            value: sortedGuide,
            errorMessage: ''
        };
    }

    async getSpecificGuide(guid: string): Promise<ResultWithValue<Guide>> {
        var allGuidesResult = await this.getListOfGuides()
        const anyObj: any = {};
        if (!allGuidesResult.isSuccess) return {
            isSuccess: false,
            value: anyObj,
            errorMessage: allGuidesResult.errorMessage
        };

        var guide: Guide = anyObj;
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