import { PlatformType } from '../contracts/generated/AssistantApps/Enum/platformType';

export const platformToString = (platformType: PlatformType) => {
  const plat = PlatformType[platformType];
  return plat[0].toString().toUpperCase() + plat.substring(1, plat.length);
};
