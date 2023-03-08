import { translate } from '../localization/Translate';
import { DrawerIconType } from '../contracts/enum/DrawerIconType';
import { catalogue } from '../constants/Route';
import { CatalogueType } from '../constants/CatalogueType';
import { DrawerMenuItem } from '../contracts/DrawerMenuItem';
import { LocaleKey } from '../localization/LocaleKey';
import { AppImage } from '../constants/AppImage';

export const getCatalogueMenuItems = (): Array<DrawerMenuItem> => {
  const menuItems = [];
  menuItems.push({
    name: translate(LocaleKey.allItems).toString(),
    link: `${catalogue}/${CatalogueType.rawMaterials}-${CatalogueType.craftedProducts}-${CatalogueType.tradeItems}-${CatalogueType.buildings}-${CatalogueType.curiosity}-${CatalogueType.cooking}-${CatalogueType.technology}-${CatalogueType.technologyModule}-${CatalogueType.constructedTechnology}-${CatalogueType.others}-${CatalogueType.proceduralProducts}`,
    icon: `${AppImage.drawer()}/crafted.png`,
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: translate(LocaleKey.rawMaterials).toString(),
    link: `${catalogue}/${CatalogueType.rawMaterials}`,
    icon: `${AppImage.drawer()}/rawmaterials.png`,
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: translate(LocaleKey.products).toString(),
    link: `${catalogue}/${CatalogueType.craftedProducts}`,
    icon: `${AppImage.drawer()}/crafted.png`,
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: translate(LocaleKey.technologies).toString(),
    link: `${catalogue}/${CatalogueType.technology}`,
    icon: `${AppImage.drawer()}/equipment.png`,
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: translate(LocaleKey.constructedTechnologies).toString(),
    link: `${catalogue}/${CatalogueType.constructedTechnology}`,
    icon: `${AppImage.drawer()}/constructedTechnology.png`,
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: translate(LocaleKey.buildings).toString(),
    link: `${catalogue}/${CatalogueType.buildings}`,
    icon: `${AppImage.drawer()}/building.png`,
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: translate(LocaleKey.tradeItems).toString(),
    link: `${catalogue}/${CatalogueType.tradeItems}`,
    icon: `${AppImage.drawer()}/tradeItems.png`,
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: translate(LocaleKey.curiosities).toString(),
    link: `${catalogue}/${CatalogueType.curiosity}`,
    icon: `${AppImage.drawer()}/curiosities.png`,
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: translate(LocaleKey.cooking).toString(),
    link: `${catalogue}/${CatalogueType.cooking}`,
    icon: `${AppImage.drawer()}/cooking.png`,
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: translate(LocaleKey.upgradeModules).toString(),
    link: `${catalogue}/${CatalogueType.technologyModule}`,
    icon: `${AppImage.drawer()}/upgradeModules.png`,
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: translate(LocaleKey.others).toString(),
    link: `${catalogue}/${CatalogueType.others}`,
    icon: `${AppImage.drawer()}/other.png`,
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  return menuItems;
}
