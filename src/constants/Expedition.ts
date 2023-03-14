import { AppImage } from '../constants/AppImage';

export const getBackgroundForExpedition = (seasId: string) => {
    const localSeasId = seasId.replace('-redux', '');
    if (localSeasId.includes('seas-')) {
        return AppImage.expeditionSeasonBackgroundPrefix() + localSeasId + '.jpg';
    }
    return AppImage.expeditionSeasonBackgroundBackup();
}

export const getPatchForExpedition = (icon: string) => {
    // if (seasId.includes('seas-1')) return AppImage.expeditionSeason1Patch();
    // if (seasId.includes('seas-2')) return AppImage.expeditionSeason2Patch();
    // if (seasId.includes('seas-3')) return AppImage.expeditionSeason3Patch();
    // if (seasId.includes('seas-4')) return AppImage.expeditionSeason4Patch();
    return `${AppImage.gameItem()}/${icon}`;
}

export const getExpeditionSeasonNum = (seasId: string): string => seasId.replaceAll('seas-', '').replaceAll('-redux', '');
export const getExistingExpedition = (seasId: string, seasName: string): IExistingExpeditions => {
    return {
        name: seasName,
        seasonId: seasId,
        icon: getPatchForExpedition(seasId),
        seasonNum: getExpeditionSeasonNum(seasId),
        background: getBackgroundForExpedition(seasId),
    };
}

export interface IExistingExpeditions {
    icon: string;
    name: string;
    seasonId: string;
    seasonNum: string;
    background: string;
}

export const ExistingExpeditions: Array<IExistingExpeditions> = [
    getExistingExpedition('seas-4', 'Emergence'),
    getExistingExpedition('seas-3', 'The Cartographers'),
    getExistingExpedition('seas-2', 'Beachhead'),
    getExistingExpedition('seas-1', 'Pioneer'),
];