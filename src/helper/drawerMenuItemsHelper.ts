import i18next from 'i18next';
import * as routes from '../constants/Route';
import { DrawerIconType } from '../contracts/enum/DrawerIconType';
import { DrawerMenuItem } from '../contracts/DrawerMenuItem';
import { LocaleKey } from '../localization/LocaleKey';
import { getCatalogueMenuItems } from './catalogueMenuItemsHelper';

export const getDrawerMenuItems = (): Array<DrawerMenuItem> => {
  const menuItems = [];
  menuItems.push({
    name: i18next.t(LocaleKey.whatIsNew).toString(),
    link: routes.whatIsNew,
    icon: '/assets/images/drawer/whatIsNew.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.language).toString(),
    link: routes.language,
    icon: '/assets/images/drawer/language.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.patrons).toString(),
    link: routes.patreon,
    icon: '/assets/images/patreon.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.donation).toString(),
    link: routes.donation,
    icon: '/assets/images/drawer/donation.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push(menuItemSeperator);
  menuItems.push({
    name: i18next.t(LocaleKey.favourites).toString(),
    link: routes.favourites,
    icon: 'star',
    iconType: DrawerIconType.Material,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.catalogue).toString(),
    link: routes.catalogue,
    icon: '/assets/images/drawer/catalogue.png',
    iconType: DrawerIconType.Custom,
    isActive: false,
    subs: getCatalogueMenuItems()
  });
  menuItems.push({
    name: i18next.t(LocaleKey.nmsfm).toString(),
    link: routes.nmsfm,
    icon: 'radio',
    iconType: DrawerIconType.Material,
    isActive: false
  });
  // menuItems.push({
  //   name: 'Online Meetup 2020',
  //   link: routes.onlineMeetup2020,
  //   icon: 'public',
  //   iconType: DrawerIconType.Material,
  //   isActive: false
  // });
  menuItems.push(menuItemSeperator);
  menuItems.push({
    name: i18next.t(LocaleKey.cart).toString(),
    link: routes.cart,
    icon: '/assets/images/drawer/cart.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.guides).toString(),
    link: routes.guides,
    icon: '/assets/images/drawer/guide.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.portalLibrary).toString(),
    link: routes.portal,
    icon: '/assets/images/drawer/portal.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.communityMission).toString(),
    link: routes.communityMission,
    icon: '/assets/images/drawer/communityMission.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.weekendMission).toString(),
    link: routes.weekendMission,
    icon: '/assets/images/drawer/weekendMission.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push(menuItemSeperator);
  // menuItems.push({
  //   name: i18next.t(LocaleKey.synchronize).toString(),
  //   link: routes.sync,
  //   icon: 'sync',
  //   iconType: DrawerIconType.Material,
  //   isActive: false
  // });
  menuItems.push({
    name: i18next.t(LocaleKey.about).toString(),
    link: routes.about,
    icon: '/assets/images/drawer/about.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.feedback).toString(),
    link: "https://tools.nmsassistant.com/feedback",
    icon: 'feedback',
    iconType: DrawerIconType.Material,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.social).toString(),
    link: routes.social,
    icon: '/assets/images/twitter.png',
    iconType: DrawerIconType.Custom,
    isActive: false
  });
  menuItems.push({
    name: i18next.t(LocaleKey.settings).toString(),
    link: routes.setting,
    icon: 'settings',
    iconType: DrawerIconType.Material,
    isActive: false
  });
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
