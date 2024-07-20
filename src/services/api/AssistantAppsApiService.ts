import { ResultWithValueAndPagination } from '../../contracts/results/ResultWithValue';
import { BaseApiService } from './BaseApiService';
import { VersionViewModel } from '../../contracts/generated/AssistantApps/ViewModel/Version/versionViewModel';
import { VersionSearchViewModel } from '../../contracts/generated/AssistantApps/ViewModel/Version/versionSearchViewModel';
import { DonationViewModel } from '../../contracts/generated/AssistantApps/ViewModel/donationViewModel';

export class AssistantAppsApiService extends BaseApiService {
  constructor() {
    super(window.config?.assistantAppsUrl);
  }

  async getWhatIsNewItems(search: VersionSearchViewModel): Promise<ResultWithValueAndPagination<Array<VersionViewModel>>> {
    const result = await this.post<Array<VersionViewModel>, VersionSearchViewModel>(
      'Version/Search',
      search,
      undefined,
      async (response: Response) => {
        const data = await response.json();
        return {
          ...data,
          isSuccess: true,
          errorMessage: '',
        } as ResultWithValueAndPagination<Array<VersionViewModel>>;
      },
    );

    return result as ResultWithValueAndPagination<Array<VersionViewModel>>;
  }

  async getDonators(page: number): Promise<ResultWithValueAndPagination<Array<DonationViewModel>>> {
    const apiResult = await this.get<ResultWithValueAndPagination<Array<DonationViewModel>>>(`Donation?page=${page}`);
    return apiResult.value;
  }
}
