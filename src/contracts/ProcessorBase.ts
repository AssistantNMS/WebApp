import { RequiredItem } from './RequiredItem';

export interface ProcessorBase {
    Id: string;
    Output: RequiredItem;
    Inputs: Array<RequiredItem>;
}
