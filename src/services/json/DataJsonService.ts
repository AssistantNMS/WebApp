import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { getHashForObject } from '../../helper/hashHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { QuicksilverStore } from '../../contracts/data/quicksilver';
import { DevDetail } from '../../contracts/data/devDetail';
import { EggNeuralTrait } from '../../contracts/data/eggNeuralTrait';
import { AlphabetTranslation } from '../../contracts/data/alphabetTranslation';
import { MetaData } from '../../contracts/data/metaData';
import { AssistantAppLinks } from '../../contracts/data/assistantAppLinks';
import { ControlMappingList, PlatformControlMapping } from '../../contracts/data/controlMapping';
import { ControllerPlatformType, ToJsonProperty } from '../../contracts/enum/ControllerPlatformType';
import { BaseJsonService } from './BaseJsonService';
import { StarshipScrap } from '../../contracts/data/starshipScrap';
import { TwitchDrop } from '../../contracts/data/twitchDrop';

export class DataJsonService extends BaseJsonService {

    private _hashLookup: any;

    constructor() {
        super();
        this._hashLookup = anyObject;
    }

    async _getOrAdd<T>(promise: () => Promise<T>, argsArray: Array<any>) {
        const hash = getHashForObject(argsArray);

        if (this._hashLookup != null && this._hashLookup[hash] != null) {
            return this._hashLookup[hash];
        }

        const jsonResult = await promise();
        this._hashLookup[hash] = jsonResult;
        return jsonResult;
    }

    getDataJsonBasic = async <T>(fileName: string): Promise<ResultWithValue<T>> => {
        return this._getOrAdd(
            async () => await this.getAsset<Array<T>>(`data/${fileName}`),
            [fileName]
        );
    }


    async getAllControls(): Promise<ResultWithValue<ControlMappingList>> {
        return this._getOrAdd(() => this._getAllControls(), ['_getAllControls']);
    }
    async _getAllControls(): Promise<ResultWithValue<ControlMappingList>> {
        const result = await this.getAsset<ControlMappingList>(`data/controllerLookup.json`);
        if (!result.isSuccess) return { isSuccess: false, value: anyObject, errorMessage: result.errorMessage };

        return result;
    }

    async getControlMapping(platform: ControllerPlatformType): Promise<ResultWithValue<Array<PlatformControlMapping>>> {
        return this._getOrAdd(() => this._getControlMapping(platform), ['_getControlMapping', platform]);
    }
    async _getControlMapping(platform: ControllerPlatformType): Promise<ResultWithValue<Array<PlatformControlMapping>>> {
        let result: any = {};

        const jsonProp = ToJsonProperty(platform);
        const getAllResult = await this.getAllControls();
        if (!getAllResult.isSuccess) return { isSuccess: false, value: result, errorMessage: getAllResult.errorMessage };

        const controlItem = getAllResult.value?.[jsonProp] ?? [];
        return {
            isSuccess: true,
            value: controlItem,
            errorMessage: ''
        }
    }

    async getStarshipScrapData(): Promise<ResultWithValue<Array<StarshipScrap>>> {
        return this._getOrAdd(() => this._getStarshipScrapData(), ['_getStarshipScrapData']);
    }
    async _getStarshipScrapData(): Promise<ResultWithValue<Array<StarshipScrap>>> {
        return this.getDataJsonBasic<Array<StarshipScrap>>('starshipScrap.json');
    }

    async getStarshipScrapDataForItem(itemId: string): Promise<ResultWithValue<Array<StarshipScrap>>> {
        return this._getOrAdd(() => this._getStarshipScrapDataForItem(itemId), ['_getStarshipScrapDataForItem', itemId]);
    }
    async _getStarshipScrapDataForItem(itemId: string): Promise<ResultWithValue<Array<StarshipScrap>>> {
        const allItemsresult = await this.getDataJsonBasic<Array<StarshipScrap>>('starshipScrap.json');

        if (!allItemsresult.isSuccess) return { isSuccess: false, value: [], errorMessage: allItemsresult.errorMessage };

        const specificToItemId = allItemsresult.value.filter(sc =>
            ((sc.ItemDetails ?? []).filter((itemD) => itemD.Id === itemId)?.length > 0)
        );
        return {
            isSuccess: true,
            value: specificToItemId,
            errorMessage: ''
        }
    }

    getAlphabetTranslations = () => this.getDataJsonBasic<Array<AlphabetTranslation>>('alphabetTranslations.json');
    getAssistantAppLinks = () => this.getDataJsonBasic<Array<AssistantAppLinks>>('assistantAppLinks.json');
    getDeveloperDetails = () => this.getDataJsonBasic<Array<DevDetail>>('developerDetails.json');
    getDonationsBackup = () => this.getDataJsonBasic<Array<QuicksilverStore>>('donationsBackup.json');
    getEggNeuralTraits = () => this.getDataJsonBasic<Array<EggNeuralTrait>>('eggNeuralTraits.json');
    getMeta = () => this.getDataJsonBasic<MetaData>('meta.json');
    getNewItems = () => this.getDataJsonBasic<Array<QuicksilverStore>>('newItems.json');
    getPatronsBackup = () => this.getDataJsonBasic<Array<QuicksilverStore>>('patronsBackup.json');
    getQuicksilverStore = () => this.getDataJsonBasic<Array<QuicksilverStore>>('quicksilverStore.json');
    getSocial = () => this.getDataJsonBasic<Array<QuicksilverStore>>('social.json');
    getUnusedMilestonePatches = () => this.getDataJsonBasic<Array<QuicksilverStore>>('unusedMilestonePatches.json');
    getTwitchDrops = () => this.getDataJsonBasic<Array<TwitchDrop>>('twitchDrops.json');
}
