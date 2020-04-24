import { PlatformType } from '../contracts/enum/PlatformType';
import { CommunityMissionViewModel } from '../contracts/generated/communityMissionViewModel';
import { ResultWithValue } from '../contracts/results/ResultWithValue';

import { BaseApiService } from './BaseApiService';


export class ApiService extends BaseApiService {
    async getCommunityMission(platform: PlatformType): Promise<ResultWithValue<CommunityMissionViewModel>> {
        return await this.get<CommunityMissionViewModel>(`HelloGames/CommunityMission/${platform.toString()}`);
    }
}