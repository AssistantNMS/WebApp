import { ResultWithValue, ResultWithValueAndPagination } from '../contracts/results/ResultWithValue';
import { BaseApiService } from './BaseApiService';
import { PatreonViewModel } from '../contracts/generated/AssistantApps/ViewModel/patreonViewModel';
import { VersionViewModel } from '../contracts/generated/AssistantApps/ViewModel/Version/versionViewModel';
import { VersionSearchViewModel } from '../contracts/generated/AssistantApps/ViewModel/Version/versionSearchViewModel';

declare global {
    interface Window { config: any }
}

export class AssistantAppsApiService extends BaseApiService {
    constructor() {
        console.log(window.config?.assistantAppsUrl);
        super(window.config?.assistantAppsUrl);
    }

    async getPatronsList(): Promise<ResultWithValue<Array<PatreonViewModel>>> {
        return await this.get<Array<PatreonViewModel>>('patreon');
    }

    async getWhatIsNewItems(search: VersionSearchViewModel): Promise<ResultWithValueAndPagination<Array<VersionViewModel>>> {
        const result = await this.post<Array<VersionViewModel>, VersionSearchViewModel>(
            'Version/Search', search,
            (response: any) => {
                return {
                    ...response.data,
                    isSuccess: true,
                    errorMessage: '',
                };
            });

        return result as ResultWithValueAndPagination<Array<VersionViewModel>>;
    }
}
