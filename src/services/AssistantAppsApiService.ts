import { OnlineMeetup2020SubmissionViewModel } from '../contracts/generated/onlineMeetup2020SubmissionViewModel';
import { ResultWithValue } from '../contracts/results/ResultWithValue';
import { BaseApiService } from './BaseApiService';



declare global {
    interface Window { config: any }
}

export class AssistantAppsApiService extends BaseApiService {
    constructor() {
        console.log(window.config.assistantAppsUrl);
        super(window.config.assistantAppsUrl);
    }
    async getOnlineMeetupSubmissions(): Promise<ResultWithValue<Array<OnlineMeetup2020SubmissionViewModel>>> {
        return await this.get<Array<OnlineMeetup2020SubmissionViewModel>>('OnlineMeetup2020Submission');
    }
}
