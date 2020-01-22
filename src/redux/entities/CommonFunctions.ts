import { ICommonFunctions } from './interface/ICommonFunctions';

export class CommonFunctions implements ICommonFunctions {
    public setLoadingStatus!: (isLoading: boolean, text?: string) => void;
}