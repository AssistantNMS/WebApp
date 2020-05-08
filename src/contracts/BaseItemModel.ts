import { CurrencyType } from './enum/CurrencyType';
import { BlueprintSource } from './enum/BlueprintSource';
import { RequiredItem } from './RequiredItem';

export interface BaseItemModel {
  Id: string;
  Icon: string;
  Power: number;
  Colour: string;
  Craftable: boolean;
  MaxStackSize: number;
  CookingValue: number;
  BaseValueUnits: number;
  CurrencyType: CurrencyType;
  RequiredItems: Array<RequiredItem>;
  BlueprintSource: BlueprintSource;
  BlueprintNaniteCost: number;
  HideBlueprintNaniteCost: boolean;
}
