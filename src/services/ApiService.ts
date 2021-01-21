import { PlatformType } from '../contracts/enum/PlatformType';
import { CommunityMissionViewModel } from '../contracts/generated/communityMissionViewModel';
import { GuideMetaViewModel } from '../contracts/generated/guideMetaViewModel';
import { OnlineMeetup2020SubmissionViewModel } from '../contracts/generated/onlineMeetup2020SubmissionViewModel';
import { ResultWithValue } from '../contracts/results/ResultWithValue';
import { BaseApiService } from './BaseApiService';
import { WeekendMissionViewModel } from '../contracts/generated/Model/HelloGames/weekendMissionViewModel';

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

    async getOnlineMeetupSubmissions(): Promise<ResultWithValue<Array<OnlineMeetup2020SubmissionViewModel>>> {
        return await this.get<Array<OnlineMeetup2020SubmissionViewModel>>('OnlineMeetup2020Submission');
    }

    async getWeekendMission(): Promise<ResultWithValue<WeekendMissionViewModel>> {
        return await this.get<WeekendMissionViewModel>('HelloGames/WeekendMission');
    }
}
