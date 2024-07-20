import { LocaleKey } from '../../localization/LocaleKey';

export enum BlueprintSource {
  unknown,
  manufacturingFacility,
  manufacturingFacilityOrPolo,
}

export const blueprintToLocalKey = (source: BlueprintSource): LocaleKey => {
  if (source === BlueprintSource.manufacturingFacility) {
    return LocaleKey.manufacturingFacility;
  }
  if (source === BlueprintSource.manufacturingFacilityOrPolo) {
    return LocaleKey.manufacturingFacilityOrPolo;
  }

  return LocaleKey.unknown;
};
