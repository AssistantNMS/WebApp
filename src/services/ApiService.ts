import { PlatformType } from '../contracts/enum/PlatformType';

import { CommunityMissionViewModel } from '../contracts/generated/communityMissionViewModel';
import { GuideMetaViewModel } from '../contracts/generated/guideMetaViewModel';
import { ResultWithValue } from '../contracts/results/ResultWithValue';

import { BaseApiService } from './BaseApiService';


export class ApiService extends BaseApiService {
    async getCommunityMission(platform: PlatformType): Promise<ResultWithValue<CommunityMissionViewModel>> {
        return await this.get<CommunityMissionViewModel>(`HelloGames/CommunityMission/${platform.toString()}`);
    }

    async getGuideMetaData(guid: string): Promise<ResultWithValue<GuideMetaViewModel>> {
        return await this.get<GuideMetaViewModel>(`guide/${guid}`);
    }

    async likeGuide(guid: string): Promise<ResultWithValue<GuideMetaViewModel>> {
        return await this.post(`guide/${guid}`, '{}');
    }
}
