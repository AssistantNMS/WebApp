import { ControllerPlatformType, ToImgUrl } from '../contracts/enum/ControllerPlatformType';

export interface IControlPlatformsOptions {
    imgUrl: string;
    value: ControllerPlatformType;
}

export const availableControlPlatforms = (): Array<IControlPlatformsOptions> => [
    {
        imgUrl: ToImgUrl(ControllerPlatformType.WIN),
        value: ControllerPlatformType.WIN,
    },
    {
        imgUrl: ToImgUrl(ControllerPlatformType.PSN),
        value: ControllerPlatformType.PSN,
    },
    {
        imgUrl: ToImgUrl(ControllerPlatformType.XBX),
        value: ControllerPlatformType.XBX,
    }
];