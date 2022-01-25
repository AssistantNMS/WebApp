import { ResultWithValueAndPagination } from '../../contracts/results/ResultWithValue';
import { BaseApiService } from './BaseApiService';
import { VersionViewModel } from '../../contracts/generated/AssistantApps/ViewModel/Version/versionViewModel';
import { VersionSearchViewModel } from '../../contracts/generated/AssistantApps/ViewModel/Version/versionSearchViewModel';

declare global {
    interface Window { config: any }
}

export class AssistantAppsApiService extends BaseApiService {
    constructor() {
        super(window.config?.assistantAppsUrl);
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
