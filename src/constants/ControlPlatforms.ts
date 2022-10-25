import { ControllerPlatformType, ToImgUrl } from '../contracts/enum/ControllerPlatformType';

export interface IControlPlatformsOptions {
    imgUrl: string;
    value: ControllerPlatformType;
}

export const availableControlPlatforms = (useAlt: boolean): Array<IControlPlatformsOptions> => [
    {
        imgUrl: ToImgUrl(useAlt, ControllerPlatformType.WIN),
        value: ControllerPlatformType.WIN,
    },
    {
        imgUrl: ToImgUrl(useAlt, ControllerPlatformType.PSN),
        value: ControllerPlatformType.PSN,
    },
    {
        imgUrl: ToImgUrl(useAlt, ControllerPlatformType.XBX),
        value: ControllerPlatformType.XBX,
    },
    {
        imgUrl: ToImgUrl(useAlt, ControllerPlatformType.NSW),
        value: ControllerPlatformType.NSW,
    }
];