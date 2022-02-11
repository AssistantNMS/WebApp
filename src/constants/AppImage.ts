export class AppImage {
    static base: string = 'assets/images/';
    static controls: string = AppImage.base + 'buttons/';

    static expeditionSeasonBackground1: string = AppImage.base + 'special/expeditionsCoverUnused.jpg';
    static expeditionSeasonBackground2: string = AppImage.base + 'special/expeditionsCover.jpg';
    static expeditionSeasonBackground3: string = AppImage.base + 'special/expeditionsCover1.jpg';
    static expeditionSeasonBackground4: string = AppImage.base + 'special/expeditionsCover2.jpg';
    static expeditionSeasonBackground5: string = AppImage.base + 'special/expeditionsCover3.jpg';

    static milestonePatches: string = AppImage.base + 'milestonePatches/';
    static expeditionsUnusedPatches: string = AppImage.milestonePatches + 'ENCRYPTED.PATCH.2.png';
    static expeditionSeason1Patch: string = AppImage.milestonePatches + 'PATCH.EXPEDITION.1.png';
    static expeditionSeason2Patch: string = AppImage.milestonePatches + 'PATCH.EXPEDITION.2.ALT.png';
    static expeditionSeason3Patch: string = AppImage.milestonePatches + 'PATCH.EXPEDITION.3.png';
    static expeditionSeason4Patch: string = AppImage.milestonePatches + 'PATCH.EXPEDITION.4.png';

    static platformPc: string = '/' + AppImage.base + 'platformPc.png';
    static platformPsn: string = '/' + AppImage.base + 'platformPs4.png';
    static platformXbx: string = '/' + AppImage.base + 'platformXb1.png';
    static unknownButton: string = 'unknown.png';
}