import i18next from 'i18next';
import { DrawerIconType } from '../contracts/enum/DrawerIconType';
import { catalogue } from '../constants/Route';
import { CatalogueType } from '../constants/CatalogueType';
import { DrawerMenuItem } from '../contracts/DrawerMenuItem';
import { LocaleKey } from '../localization/LocaleKey';

export const getCatalogueMenuItems = (): Array<DrawerMenuItem> => {
  const menuItems = [];
  menuItems.push({
    name: i18next.t(LocaleKey.allItems).toString(),
    link: `${catalogue}/${CatalogueType.rawMaterials}-${CatalogueType.craftedProducts}-${CatalogueType.tradeItems}-${CatalogueType.buildings}-${CatalogueType.curiosity}-${CatalogueType.cooking}-${CatalogueType.technology}-${CatalogueType.technologyModule}-${CatalogueType.constructedTechnology}-${CatalogueType.others}`,
    icon: '/assets/images/drawer/crafted.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.rawMaterials).toString(),
    link: `${catalogue}/${CatalogueType.rawMaterials}`,
    icon: '/assets/images/drawer/rawmaterials.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.products).toString(),
    link: `${catalogue}/${CatalogueType.craftedProducts}`,
    icon: '/assets/images/drawer/crafted.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.technologies).toString(),
    link: `${catalogue}/${CatalogueType.technology}`,
    icon: '/assets/images/drawer/equipment.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.constructedTechnologies).toString(),
    link: `${catalogue}/${CatalogueType.constructedTechnology}`,
    icon: '/assets/images/drawer/constructedTechnology.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.buildings).toString(),
    link: `${catalogue}/${CatalogueType.buildings}`,
    icon: '/assets/images/drawer/building.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.tradeItems).toString(),
    link: `${catalogue}/${CatalogueType.tradeItems}`,
    icon: '/assets/images/drawer/tradeItems.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.curiosities).toString(),
    link: `${catalogue}/${CatalogueType.curiosity}`,
    icon: '/assets/images/drawer/curiosities.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.cooking).toString(),
    link: `${catalogue}/${CatalogueType.cooking}`,
    icon: '/assets/images/drawer/cooking.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.upgradeModule).toString(),
    link: `${catalogue}/${CatalogueType.technologyModule}`,
    icon: '/assets/images/drawer/upgradeModules.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.others).toString(),
    link: `${catalogue}/${CatalogueType.others}`,
    icon: '/assets/images/drawer/other.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  return menuItems;
}
