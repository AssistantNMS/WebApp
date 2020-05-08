import { CurrencyType } from './enum/CurrencyType';
import { BlueprintSource } from './enum/BlueprintSource';
import { RequiredItem } from './RequiredItem';
import { Processor } from './Processor';

export interface GameItemModel {
  TypeName: string;
  Id: string;
  Icon: string;
  Name: string;
  Power: number;
  Group: string;
  Colour: string;
  Craftable: boolean;
  Additional: string;
  Description: string;
  CookingValue: number;
  MaxStackSize: number;
  BaseValueUnits: number;
  BlueprintNaniteCost: number;
  HideBlueprintNaniteCost: boolean;
  CurrencyType: CurrencyType;
  BlueprintSource: BlueprintSource;
  UsedInRecipes: Array<GameItemModel>;
  RequiredItems: Array<RequiredItem>;
  UsedInRefiners: Array<Processor>;
  Refiners: Array<Processor>;
  UsedInCooking: Array<Processor>;
  Cooking: Array<Processor>;
}
