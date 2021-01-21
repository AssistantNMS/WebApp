import { ResultWithValue } from '../contracts/results/ResultWithValue';
import { BaseApiService } from './BaseApiService';
import { PatreonViewModel } from '../contracts/generated/Model/AssistantApps/patreonViewModel';

declare global {
    interface Window { config: any }
}

export class AssistantAppsApiService extends BaseApiService {
    constructor() {
        console.log(window.config.assistantAppsUrl);
        super(window.config.assistantAppsUrl);
    }

    async getPatronsList(): Promise<ResultWithValue<Array<PatreonViewModel>>> {
        return await this.get<Array<PatreonViewModel>>('patreon');
    }
}
