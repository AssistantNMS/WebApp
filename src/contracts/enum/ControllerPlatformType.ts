import { AppImage } from '../../constants/AppImage';

export enum ControllerPlatformType {
  Unknown,
  WIN,
  PSN,
  XBX,
  NSW,
}

export const ToJsonProperty = (plat: ControllerPlatformType) => {
  switch (plat) {
    case ControllerPlatformType.WIN:
      return 'Win';
    case ControllerPlatformType.PSN:
      return 'Psn';
    case ControllerPlatformType.XBX:
      return 'Xbx';
    case ControllerPlatformType.NSW:
      return 'Nsw';

    default:
      return 'Win';
  }
};

export const ToFriendlyName = (plat: ControllerPlatformType) => {
  switch (plat) {
    case ControllerPlatformType.WIN:
      return 'PC';
    case ControllerPlatformType.PSN:
      return 'Playstation';
    case ControllerPlatformType.XBX:
      return 'Xbox';
    case ControllerPlatformType.NSW:
      return 'Nintendo Switch';

    default:
      return 'PC';
  }
};

export const ToImgUrl = (useAlt: boolean, plat: ControllerPlatformType) => {
  if (useAlt) {
    switch (plat) {
      case ControllerPlatformType.WIN:
        return AppImage.platformPcAlt;
      case ControllerPlatformType.PSN:
        return AppImage.platformPsnAlt;
      case ControllerPlatformType.XBX:
        return AppImage.platformXbxAlt;
      case ControllerPlatformType.NSW:
        return AppImage.platformNswAlt;

      default:
        return AppImage.platformPcAlt;
    }
  }

  switch (plat) {
    case ControllerPlatformType.WIN:
      return AppImage.platformPc;
    case ControllerPlatformType.PSN:
      return AppImage.platformPsn;
    case ControllerPlatformType.XBX:
      return AppImage.platformXbx;
    case ControllerPlatformType.NSW:
      return AppImage.platformNsw;

    default:
      return AppImage.platformPc;
  }
};
