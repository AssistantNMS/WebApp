import { CommunityMissionViewModel } from '../../contracts/generated/communityMissionViewModel';
import { GuideMetaViewModel } from '../../contracts/generated/guideMetaViewModel';
import { CommunitySpotlightViewModel } from '../../contracts/generated/Model/Community/communitySpotlightViewModel';
import { ContributorViewModel } from '../../contracts/generated/Model/Contributor/contributorViewModel';
import { ExpeditionSeasonViewModel } from '../../contracts/generated/Model/HelloGames/expeditionSeasonViewModel';
import { WeekendMissionViewModel } from '../../contracts/generated/Model/HelloGames/weekendMissionViewModel';
import { NmsfmTrackDataViewModel } from '../../contracts/generated/Model/nmsfmTrackDataViewModel';
import { OnlineMeetup2020SubmissionViewModel } from '../../contracts/generated/onlineMeetup2020SubmissionViewModel';
import { CommunitySearchChipColourViewModel } from '../../contracts/other/communitySearchChipColourViewModel';
import { CommunitySearchViewModel } from '../../contracts/other/communitySearchViewModel';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { getOrAddFunc } from '../../helper/hashHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { BaseApiService } from './BaseApiService';

export class ApiService extends BaseApiService {
  private _hashLookup: Record<string, unknown> = {};

  constructor() {
    super();
    this._hashLookup = anyObject;
  }

  _getOrAdd = getOrAddFunc(this._hashLookup);

  async getCommunityMission(): Promise<ResultWithValue<CommunityMissionViewModel>> {
    return this._getOrAdd(() => this._getCommunityMission(), ['_getCommunityMission', new Date().getMinutes().toString()]);
  }

  async _getCommunityMission(): Promise<ResultWithValue<CommunityMissionViewModel>> {
    return await this.get<CommunityMissionViewModel>('HelloGames/CommunityMission/');
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

  async getNmsfm(): Promise<ResultWithValue<Array<NmsfmTrackDataViewModel>>> {
    return await this.get<Array<NmsfmTrackDataViewModel>>('NMSFM');
  }

  async getCurrentExpedition(): Promise<ResultWithValue<ExpeditionSeasonViewModel>> {
    return await this.get<ExpeditionSeasonViewModel>('HelloGames/Expedition');
  }

  async getContributors(): Promise<ResultWithValue<Array<ContributorViewModel>>> {
    return await this.get<Array<ContributorViewModel>>('Contributor');
  }

  async getCommunityLinks(): Promise<ResultWithValue<Array<CommunitySearchViewModel>>> {
    return await this.get<Array<CommunitySearchViewModel>>('CommunityLink/NMSCD');
  }

  async getCommunityLinksChipColours(): Promise<ResultWithValue<Array<CommunitySearchChipColourViewModel>>> {
    return await this.get<Array<CommunitySearchChipColourViewModel>>('CommunityLink/NMSCD-Chips');
  }

  async getCommunitySpotlight(): Promise<ResultWithValue<Array<CommunitySpotlightViewModel>>> {
    return await this.get<Array<CommunitySpotlightViewModel>>('CommunitySpotlight');
  }
}
