import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { getHashForObject } from '../../helper/hashHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { QuicksilverStore } from '../../contracts/data/quicksilver';
import { AlphabetTranslation } from '../../contracts/data/alphabetTranslation';
import { BaseJsonService } from './BaseJsonService';

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
            async () => await this.getAsset<Array<QuicksilverStore>>(`data/${fileName}`),
            [fileName]
        );
    }

    getAlphabetTranslations = async (): Promise<ResultWithValue<Array<AlphabetTranslation>>> =>
        this.getDataJsonBasic('alphabetTranslations.json');
    getssistantAppLinks = async (): Promise<ResultWithValue<Array<QuicksilverStore>>> =>
        this.getDataJsonBasic('assistantAppLinks.json');
    getDeveloperDetails = async (): Promise<ResultWithValue<Array<QuicksilverStore>>> =>
        this.getDataJsonBasic('developerDetails.json');
    getDonationsBackup = async (): Promise<ResultWithValue<Array<QuicksilverStore>>> =>
        this.getDataJsonBasic('donationsBackup.json');
    getEggNeuralTraits = async (): Promise<ResultWithValue<Array<QuicksilverStore>>> =>
        this.getDataJsonBasic('eggNeuralTraits.json');
    getMeta = async (): Promise<ResultWithValue<any>> =>
        this.getDataJsonBasic('meta.json');
    getNewItems = async (): Promise<ResultWithValue<Array<QuicksilverStore>>> =>
        this.getDataJsonBasic('newItems.json');
    getPatronsBackup = async (): Promise<ResultWithValue<Array<QuicksilverStore>>> =>
        this.getDataJsonBasic('patronsBackup.json');
    getQuicksilverStore = async (): Promise<ResultWithValue<Array<QuicksilverStore>>> =>
        this.getDataJsonBasic('quicksilverStore.json');
    getSocial = async (): Promise<ResultWithValue<Array<QuicksilverStore>>> =>
        this.getDataJsonBasic('social.json');
    getUnusedMilestonePatches = async (): Promise<ResultWithValue<Array<QuicksilverStore>>> =>
        this.getDataJsonBasic('unusedMilestonePatches.json');
}
