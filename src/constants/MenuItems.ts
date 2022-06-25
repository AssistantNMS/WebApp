import { DrawerMenuItem } from "../contracts/DrawerMenuItem";
import { DrawerIconType } from "../contracts/enum/DrawerIconType";
import { LocaleKey } from "../localization/LocaleKey";
import { translate } from "../localization/Translate";
import { CatalogueType } from "./CatalogueType";
import { catalogue, communityMission, favourites, nmsfm, patreon, seasonExpedition, whatIsNew } from "./Route";

export const allItemsMenuItem = (): DrawerMenuItem => ({
    name: translate(LocaleKey.allItems).toString(),
    link: `${catalogue}/${CatalogueType.rawMaterials}-${CatalogueType.craftedProducts}-${CatalogueType.tradeItems}-${CatalogueType.buildings}-${CatalogueType.curiosity}-${CatalogueType.cooking}-${CatalogueType.technology}-${CatalogueType.technologyModule}-${CatalogueType.constructedTechnology}-${CatalogueType.others}-${CatalogueType.proceduralProducts}`,
    icon: '/assets/images/drawer/crafted.png',
    iconType: DrawerIconType.Custom,
    isActive: false
});

export const whatIsNewMenuItem = (): DrawerMenuItem => ({
    name: translate(LocaleKey.whatIsNew).toString(),
    link: whatIsNew,
    icon: '/assets/images/drawer/whatIsNew.png',
    iconType: DrawerIconType.Custom,
    isActive: false
});

export const patreonMenuItem = (): DrawerMenuItem => ({
    name: translate(LocaleKey.patrons).toString(),
    link: patreon,
    icon: '/assets/images/patreon.png',
    iconType: DrawerIconType.Custom,
    isActive: false
});

export const communityMissionMenuItem = (): DrawerMenuItem => ({
    name: translate(LocaleKey.communityMission).toString(),
    link: communityMission,
    icon: '/assets/images/drawer/communityMission.png',
    iconType: DrawerIconType.Custom,
    isActive: false
});

export const catalogueMenuItem = (): DrawerMenuItem => ({
    name: translate(LocaleKey.catalogue).toString(),
    link: catalogue,
    icon: '/assets/images/drawer/catalogue.png',
    iconType: DrawerIconType.Custom,
    isActive: false,
});

export const favouritesMenuItem = (): DrawerMenuItem => ({
    name: translate(LocaleKey.favourites).toString(),
    link: favourites,
    icon: 'star',
    iconType: DrawerIconType.Material,
    isActive: false
});

export const nmsfmMenuItem = (): DrawerMenuItem => ({
    name: translate(LocaleKey.nmsfm).toString(),
    link: nmsfm,
    icon: 'radio',
    iconType: DrawerIconType.Material,
    isActive: false
});

export const expeditionMenuItem = (): DrawerMenuItem => ({
    name: translate(LocaleKey.seasonalExpeditionSeasons).toString(),
    link: seasonExpedition,
    icon: 'map',
    iconType: DrawerIconType.Material,
    isActive: false
});