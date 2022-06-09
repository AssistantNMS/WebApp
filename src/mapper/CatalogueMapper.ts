import { translate } from '../localization/Translate';
import { CatalogueType } from '../constants/CatalogueType';
import { LocaleKey } from '../localization/LocaleKey';
import { IdPrefix } from '../constants/IdPrefix';

export const mapToLocale = (catalogueType: string): string => {
  switch (catalogueType) {
    case CatalogueType.rawMaterials.toString():
      return translate(LocaleKey.rawMaterialsJson).toString();
    case CatalogueType.craftedProducts.toString():
      return translate(LocaleKey.productsJson).toString();
    case CatalogueType.tradeItems.toString():
      return translate(LocaleKey.tradeItemsJson).toString();
    case CatalogueType.buildings.toString():
      return translate(LocaleKey.buildingsJson).toString();
    case CatalogueType.curiosity.toString():
      return translate(LocaleKey.curiosityJson).toString();
    case CatalogueType.cooking.toString():
      return translate(LocaleKey.cookingJson).toString();
    case CatalogueType.technology.toString():
      return translate(LocaleKey.technologiesJson).toString();
    case CatalogueType.technologyModule.toString():
      return translate(LocaleKey.technologyModulesJson).toString();
    case CatalogueType.constructedTechnology.toString():
      return translate(LocaleKey.constructedTechnologyJson).toString();
    case CatalogueType.others.toString():
      return translate(LocaleKey.otherItemsJson).toString();
    case CatalogueType.refinery.toString():
      return translate(LocaleKey.refineryJson).toString();
    case CatalogueType.nutrientProcessor.toString():
      return translate(LocaleKey.nutrientProcessorJson).toString();
    case CatalogueType.proceduralProducts.toString():
      return translate(LocaleKey.proceduralProductsJson).toString();
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
