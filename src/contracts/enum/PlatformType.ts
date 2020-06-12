export enum PlatformType {
    Unknown,
    PC,
    PS4,
    XB1
}

export const ToFriendlyPlatfromString = (plat: PlatformType) => {
    switch (plat) {
        case PlatformType.PC: return 'PC';
        case PlatformType.PS4: return 'PS4';
        case PlatformType.XB1: return 'XB1';

        default: return 'Unknown';
    }
}