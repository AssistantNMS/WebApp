import i18next from 'i18next';
import { CatalogueType } from '../constants/CatalogueType';
import { LocaleKey } from '../localization/LocaleKey';
import { IdPrefix } from '../constants/IdPrefix';

export const mapToLocale = (catalogueType: string): string => {
  switch (catalogueType) {
    case CatalogueType.rawMaterials.toString():
      return i18next.t(LocaleKey.rawMaterialsJson).toString();
    case CatalogueType.craftedProducts.toString():
      return i18next.t(LocaleKey.productsJson).toString();
    case CatalogueType.tradeItems.toString():
      return i18next.t(LocaleKey.tradeItemsJson).toString();
    case CatalogueType.buildings.toString():
      return i18next.t(LocaleKey.buildingsJson).toString();
    case CatalogueType.curiosity.toString():
      return i18next.t(LocaleKey.curiosityJson).toString();
    case CatalogueType.cooking.toString():
      return i18next.t(LocaleKey.cookingJson).toString();
    case CatalogueType.technology.toString():
      return i18next.t(LocaleKey.technologiesJson).toString();
    case CatalogueType.technologyModule.toString():
      return i18next.t(LocaleKey.technologyModulesJson).toString();
    case CatalogueType.constructedTechnology.toString():
      return i18next.t(LocaleKey.constructedTechnologyJson).toString();
    case CatalogueType.others.toString():
      return i18next.t(LocaleKey.otherItemsJson).toString();
    case CatalogueType.refinery.toString():
      return i18next.t(LocaleKey.refineryJson).toString();
    case CatalogueType.nutrientProcessor.toString():
      return i18next.t(LocaleKey.nutrientProcessorJson).toString();
    case CatalogueType.proceduralProducts.toString():
      return i18next.t(LocaleKey.proceduralProductsJson).toString();
  }
  return '';
}

export const getCatalogueFromItemId = (itemId: string): string => {
  if (itemId.includes(IdPrefix.RawMaterial)) return CatalogueType.rawMaterials;
  if (itemId.includes(IdPrefix.ProcProd)) return CatalogueType.proceduralProducts;
  if (itemId.includes(IdPrefix.Product)) return CatalogueType.craftedProducts;
  if (itemId.includes(IdPrefix.Trade)) return CatalogueType.tradeItems;
  if (itemId.includes(IdPrefix.Building)) return CatalogueType.buildings;
  if (itemId.includes(IdPrefix.Curiosity)) return CatalogueType.curiosity;
  if (itemId.includes(IdPrefix.Cooking)) return CatalogueType.cooking;
  if (itemId.includes(IdPrefix.Technology)) return CatalogueType.technology;
  if (itemId.includes(IdPrefix.TechnologyModule)) return CatalogueType.technologyModule;
  // if (itemId.includes(IdPrefix.Upgrade)) return CatalogueType.upgradeModules;
  if (itemId.includes(IdPrefix.ConTech)) return CatalogueType.constructedTechnology;
  if (itemId.includes(IdPrefix.Other)) return CatalogueType.others;
  return '';
}
