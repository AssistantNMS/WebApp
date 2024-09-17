import { translate } from '../localization/Translate';
import { AppImage } from '../constants/AppImage';
import { ExistingExpeditions, IExistingExpeditions } from '../constants/Expedition';
import * as routes from '../constants/Route';
import { IWeekendMission, WeekendMissions } from '../constants/WeekendMission';
import { DrawerMenuItem } from '../contracts/DrawerMenuItem';
import { DrawerIconType } from '../contracts/enum/DrawerIconType';
import { ExpeditionSeason } from '../contracts/helloGames/expeditionSeason';
import { LocaleKey } from '../localization/LocaleKey';
import { GameItemService } from '../services/json/GameItemService';
import { getCatalogueMenuItems } from './catalogueMenuItemsHelper';
import {
  catalogueMenuItem,
  communityMissionMenuItem,
  expeditionMenuItem,
  favouritesMenuItem,
  nmsfmMenuItem,
  patreonMenuItem,
  whatIsNewMenuItem,
} from '../constants/MenuItems';
import { dateIsBefore } from './dateHelper';
import { patreonUnlockDate } from '../constants/Patreon';

export const menuItemSeperator = {
  name: 'Separator',
  link: '/',
  icon: 'separator',
  iconType: DrawerIconType.Material,
  isSeparator: true,
  isActive: false,
};

export const getMenuSection1 = () => {
  const menuItems: Array<DrawerMenuItem> = [];
  menuItems.push(whatIsNewMenuItem());
  menuItems.push({
    name: translate(LocaleKey.language).toString(),
    link: routes.language,
    icon: '/assets/images/drawer/language.png',
    iconType: DrawerIconType.Custom,
    isActive: false,
  });
  menuItems.push({
    name: translate(LocaleKey.contributors).toString(),
    link: routes.contributors,
    icon: '/assets/images/drawer/contributors.png',
    iconType: DrawerIconType.Custom,
    isActive: false,
  });
  menuItems.push(patreonMenuItem());
  menuItems.push({
    name: translate(LocaleKey.donation).toString(),
    link: routes.donation,
    icon: '/assets/images/drawer/donation.png',
    iconType: DrawerIconType.Custom,
    isActive: false,
  });
  menuItems.push(menuItemSeperator);
  return menuItems;
};

export const getMenuSection2 = () => {
  const menuItems: Array<DrawerMenuItem> = [];
  menuItems.push(favouritesMenuItem());
  menuItems.push({
    ...catalogueMenuItem(),
    subs: getCatalogueMenuItems(),
  });
  menuItems.push(nmsfmMenuItem());
  // menuItems.push({
  //   name: 'Online Meetup 2020',
  //   link: routes.onlineMeetup2020,
  //   icon: 'public',
  //   iconType: DrawerIconType.Material,
  //   isActive: false
  // });
  menuItems.push(menuItemSeperator);
  return menuItems;
};

export const getMenuSection3 = () => {
  const menuItems: Array<DrawerMenuItem> = [];
  menuItems.push({
    name: translate(LocaleKey.cart).toString(),
    link: routes.cart,
    icon: '/assets/images/drawer/cart.png',
    iconType: DrawerIconType.Custom,
    isActive: false,
  });
  menuItems.push({
    name: translate(LocaleKey.guides).toString(),
    link: routes.guides,
    icon: '/assets/images/drawer/guide.png',
    iconType: DrawerIconType.Custom,
    isActive: false,
  });
  menuItems.push({
    name: translate(LocaleKey.portalLibrary).toString(),
    link: routes.portal,
    icon: '/assets/images/drawer/portal.png',
    iconType: DrawerIconType.Custom,
    isActive: false,
  });
  menuItems.push({
    name: translate(LocaleKey.randomPortal).toString(),
    link: routes.randomPortal,
    icon: '/assets/images/drawer/randomPortal.png',
    iconType: DrawerIconType.Custom,
    isActive: false,
  });
  menuItems.push(communityMissionMenuItem());
  menuItems.push({
    name: translate(LocaleKey.newItemsAdded).toString(),
    link: routes.newItemsAdded,
    icon: 'new_releases_sharp',
    iconType: DrawerIconType.Material,
    isActive: false,
  });
  menuItems.push({
    name: translate(LocaleKey.titles).toString(),
    link: routes.titles,
    icon: 'edit_attributes_sharp',
    iconType: DrawerIconType.Material,
    isActive: false,
  });
  menuItems.push({
    name: translate(LocaleKey.techTree).toString(),
    link: routes.techTree,
    icon: '/assets/images/drawer/techTree.png',
    iconType: DrawerIconType.Custom,
    isActive: false,
  });
  menuItems.push({
    name: translate(LocaleKey.communityLinks).toString(),
    link: routes.communityLinks,
    icon: '/assets/images/drawer/communityLinks.png',
    iconType: DrawerIconType.Custom,
    isActive: false,
  });
  menuItems.push({
    name: translate(LocaleKey.communitySpotlight).toString(),
    link: routes.communitySpotlight,
    icon: 'military_tech_rounded',
    iconType: DrawerIconType.Material,
    isActive: false,
  });
  menuItems.push({
    name: translate(LocaleKey.solarPanelBatteryCalculator).toString(),
    link: routes.solarPanel,
    icon: 'offline_bolt',
    iconType: DrawerIconType.Material,
    isActive: false,
  });
  menuItems.push({
    name: 'Fishing',
    link: routes.fishing,
    icon: 'phishing',
    iconType: DrawerIconType.Material,
    isActive: false,
    isPatreon: (dateIsBefore(new Date(), patreonUnlockDate.fishing)),
  });
  menuItems.push(menuItemSeperator);
  return menuItems;
};

export const getMenuSection4 = (): Array<DrawerMenuItem> => {
  const menuItems: Array<DrawerMenuItem> = [];
  menuItems.push({
    ...expeditionMenuItem(),
    subs: ExistingExpeditions.map((ee: IExistingExpeditions) => {
      return {
        name: ee.name,
        link: routes.seasonExpedition + '/' + ee.seasonId,
        icon: `/${ee.icon}`,
        iconType: DrawerIconType.Custom,
        isActive: false,
      };
    }),
  });
  menuItems.push({
    name: translate(LocaleKey.weekendMission).toString(),
    link: routes.weekendMission,
    icon: '/assets/images/drawer/weekendMission.png',
    iconType: DrawerIconType.Custom,
    subs: WeekendMissions.map((wm: IWeekendMission) => {
      return {
        name: wm.name,
        link: routes.weekendMissionDetails.replace(routes.weekendMissionParam, wm.id),
        icon: '/assets/images/drawer/weekendMission.png',
        iconType: DrawerIconType.Custom,
        isActive: false,
      };
    }),
    isActive: false,
  });
  menuItems.push(menuItemSeperator);
  return menuItems;
};

export const getMenuSection4Async = async (gameItemService: GameItemService): Promise<Array<DrawerMenuItem>> => {
  const expeditionsTask = gameItemService.getAllSeasonExpeditions();

  const menuItems: Array<DrawerMenuItem> = [];
  let subs = ExistingExpeditions.map((ee: IExistingExpeditions) => {
    return {
      name: ee.name,
      link: routes.seasonExpedition + '/' + ee.seasonId,
      icon: `/${ee.icon}`,
      iconType: DrawerIconType.Custom,
      isActive: false,
    };
  });
  const expeditionsResult = await expeditionsTask;
  if (expeditionsResult.isSuccess) {
    subs = (expeditionsResult.value ?? [])
      .filter((es: ExpeditionSeason) => !es.Id.includes('-redux'))
      .map((es: ExpeditionSeason) => {
        return {
          name: es.Title,
          link: routes.seasonExpedition + '/' + es.Id,
          icon: `/${AppImage.base}${es.Icon}`,
          iconType: DrawerIconType.Custom,
          isActive: false,
        };
      });
  }

  menuItems.push({
    name: translate(LocaleKey.seasonalExpeditionSeasons).toString(),
    link: routes.seasonExpedition,
    icon: 'map',
    iconType: DrawerIconType.Material,
    subs: subs,
    isActive: false,
  });
  menuItems.push({
    name: translate(LocaleKey.weekendMission).toString(),
    link: routes.weekendMission,
    icon: '/assets/images/drawer/weekendMission.png',
    iconType: DrawerIconType.Custom,
    subs: WeekendMissions.map((wm: IWeekendMission) => {
      return {
        name: wm.name,
        link: routes.weekendMissionDetails.replace(routes.weekendMissionParam, wm.id),
        icon: '/assets/images/drawer/weekendMission.png',
        iconType: DrawerIconType.Custom,
        isActive: false,
      };
    }),
    isActive: false,
  });
  menuItems.push(menuItemSeperator);
  return menuItems;
};

export const getMenuSection5 = (): Array<DrawerMenuItem> => {
  const menuItems: Array<DrawerMenuItem> = [];
  // menuItems.push({
  //   name: translate(LocaleKey.synchronize).toString(),
  //   link: routes.sync,
  //   icon: 'sync',
  //   iconType: DrawerIconType.Material,
  //   isActive: false
  // });
  menuItems.push({
    name: translate(LocaleKey.about).toString(),
    link: routes.about,
    icon: '/assets/images/drawer/about.png',
    iconType: DrawerIconType.Custom,
    isActive: false,
  });
  menuItems.push({
    name: translate(LocaleKey.feedback).toString(),
    link: 'https://tools.nmsassistant.com/feedback',
    icon: 'feedback',
    iconType: DrawerIconType.Material,
    isActive: false,
  });
  menuItems.push({
    name: translate(LocaleKey.social).toString(),
    link: routes.social,
    icon: '/assets/images/twitter.png',
    iconType: DrawerIconType.Custom,
    isActive: false,
  });
  menuItems.push({
    name: translate(LocaleKey.settings).toString(),
    link: routes.setting,
    icon: 'settings',
    iconType: DrawerIconType.Material,
    isActive: false,
  });
  return menuItems;
};
