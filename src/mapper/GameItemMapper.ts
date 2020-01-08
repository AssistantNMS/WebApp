import { GameItemModel } from '../contracts/GameItemModel'
import { DetailItemModel } from '../contracts/DetailItemModel';
import { BaseItemModel } from '../contracts/BaseItemModel';
import { Processor } from '../contracts/Processor';

export const mapGenericPageItems = (baseItems: Array<BaseItemModel>, detailItems: Array<DetailItemModel>): Array<GameItemModel> => {
  const result = Array<GameItemModel>();
  for (const base of baseItems) {
    for (const detail of detailItems) {
      if (result.length > 400) return result;
      if (base.Id === detail.Id) {
        result.push({
          Id: base.Id,
          Icon: base.Icon,
          Name: detail.Name,
          Colour: base.Colour,
          Group: detail.Group,
          Craftable: base.Craftable,
          Additional: detail.Additional,
          Description: detail.Description,
          CurrencyType: base.CurrencyType,
          CookingValue: base.CookingValue,
          MaxStackSize: base.MaxStackSize,
          BaseValueUnits: base.BaseValueUnits,
          BlueprintNaniteCost: base.BlueprintNaniteCost,
          HideBlueprintNaniteCost: base.HideBlueprintNaniteCost,
          BlueprintSource: base.BlueprintSource,
          RequiredItems: base.RequiredItems,

          Cooking: Array<Processor>(),
          Refiners: Array<Processor>(),
          UsedInCooking: Array<Processor>(),
          UsedInRefiners: Array<Processor>(),
          UsedInRecipes: Array<GameItemModel>(),

          TypeName: getTypeName(base.Id)
        });
      }
    }
  }
  return result;
};

export const getTypeName = (id: string): string => {
  // LocaleKey key = LocaleKey.unknown;

  // if (id.contains(IdPrefix.building)) {
  //   key = LocaleKey.building;
  // }
  // if (id.contains(IdPrefix.cooking)) {
  //   key = LocaleKey.cooking;
  // }
  // if (id.contains(IdPrefix.curiosity)) {
  //   key = LocaleKey.curiosity;
  // }
  // if (id.contains(IdPrefix.other)) {
  //   key = LocaleKey.other;
  // }
  // if (id.contains(IdPrefix.product)) {
  //   key = LocaleKey.product;
  // }
  // if (id.contains(IdPrefix.rawMaterial)) {
  //   key = LocaleKey.rawMaterial;
  // }
  // if (id.contains(IdPrefix.technology)) {
  //   key = LocaleKey.technology;
  // }
  // if (id.contains(IdPrefix.trade)) {
  //   key = LocaleKey.tradeItem;
  // }
  // if (id.contains(IdPrefix.upgrade)) {
  //   key = LocaleKey.upgradeModule;
  // }

  // return Translations.get(context, key);
  return id;
}
