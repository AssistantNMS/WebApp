import { RequiredItem } from './RequiredItem';

export interface Processor {
  id: string;
  time: string;
  operation: string;
  output: RequiredItem;
  inputs: Array<RequiredItem>;
}
