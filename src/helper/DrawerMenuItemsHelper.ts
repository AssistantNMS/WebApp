import i18next from 'i18next';
import { about, language, /*settings,*/ donation } from '../constants/Route';
import { DrawerIconType } from '../contracts/enum/DrawerIconType';
import { DrawerMenuItem } from '../contracts/DrawerMenuItem';
import { LocaleKey } from '../localization/LocaleKey';

export const getDrawerMenuItems = (): Array<DrawerMenuItem> => {
  const menuItems = [];
  menuItems.push({
    name: i18next.t(LocaleKey.about).toString(),
    link: about,
    icon: '/assets/images/about.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.language).toString(),
    link: language,
    icon: '/assets/images/language.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.donation).toString(),
    link: donation,
    icon: '/assets/images/donation.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  // menuItems.push({
  //   name: i18next.t(LocaleKey.settings).toString(),
  //   link: settings,
  //   icon: '/assets/images/settings.png',
  //   iconType: DrawerIconType.Custom,
  //   isActive: false
  // });
  menuItems.push(menuItemSeperator);
  menuItems.push({
    name: 'catalogue',
    link: '/catalogue',
    icon: '/assets/images/drawer/catalogue.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push(menuItemSeperator);
  return menuItems;
}

export const menuItemSeperator = {
  name: 'Separator',
  link: '/',
  icon: 'separator',
  iconType: DrawerIconType.Material,
  isSeparator: true,
  isActive: false
};
