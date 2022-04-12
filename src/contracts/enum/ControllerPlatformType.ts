import { AppImage } from "../../constants/AppImage";

export enum ControllerPlatformType {
    Unknown,
    WIN,
    PSN,
    XBX
}

export const ToJsonProperty = (plat: ControllerPlatformType) => {
    switch (plat) {
        case ControllerPlatformType.WIN: return 'Win';
        case ControllerPlatformType.PSN: return 'Psn';
        case ControllerPlatformType.XBX: return 'Xbx';

        default: return 'Win';
    }
}

export const ToImgUrl = (useAlt: boolean, plat: ControllerPlatformType) => {
    if (useAlt) {
        switch (plat) {
            case ControllerPlatformType.WIN: return AppImage.platformPcAlt;
            case ControllerPlatformType.PSN: return AppImage.platformPsnAlt;
            case ControllerPlatformType.XBX: return AppImage.platformXbxAlt;

            default: return AppImage.platformPcAlt;
        }
    }

    switch (plat) {
        case ControllerPlatformType.WIN: return AppImage.platformPc;
        case ControllerPlatformType.PSN: return AppImage.platformPsn;
        case ControllerPlatformType.XBX: return AppImage.platformXbx;

        default: return AppImage.platformPc;
    }
}