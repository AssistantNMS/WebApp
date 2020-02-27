import { RequiredItem } from './RequiredItem';

export interface Processor {
  Id: string;
  Time: string;
  Operation: string;
  Output: RequiredItem;
  Inputs: Array<RequiredItem>;
}
