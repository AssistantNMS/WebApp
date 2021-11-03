import { AppImage } from '../constants/AppImage';

export interface IExistingExpeditions {
    icon: string;
    name: string;
    seasonNum: number;
    background: string;
}

export const ExistingExpeditions: Array<IExistingExpeditions> = [
    {
        seasonNum: 4,
        name: 'Emergence',
        icon: AppImage.expeditionSeason4Patch,
        background: AppImage.expeditionSeasonBackground5,
    },
    {
        seasonNum: 3,
        name: 'The Cartographers',
        icon: AppImage.expeditionSeason3Patch,
        background: AppImage.expeditionSeasonBackground4,
    },
    {
        seasonNum: 2,
        name: 'Beachhead',
        icon: AppImage.expeditionSeason2Patch,
        background: AppImage.expeditionSeasonBackground3,
    },
    {
        seasonNum: 1,
        name: 'Pioneer',
        icon: AppImage.expeditionSeason1Patch,
        background: AppImage.expeditionSeasonBackground2,
    }
];