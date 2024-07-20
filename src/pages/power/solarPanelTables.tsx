import React, { ReactNode } from 'react';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';
import { getTotalPowerConsDay, getTotalPowerConsNight, getTotalPowerConsSunrise, getTotalPowerConsSunsest } from './solarPanelCalcs';
import { PowerTable, SummaryTable } from './solarPanelComponents';

export const totalPowerConsumedTable = (powerKps: number, selectedLanguage: string): ReactNode => {
  const tpcSunrise = getTotalPowerConsSunrise(powerKps);
  const tpcDay = getTotalPowerConsDay(powerKps);
  const tpcSunset = getTotalPowerConsSunsest(powerKps);
  const tpcNight = getTotalPowerConsNight(powerKps);
  const tpcTotal = tpcSunrise + tpcDay + tpcSunset + tpcNight;

  return (
    <>
      <h4>{translate(LocaleKey.totalPowerConsumed)}</h4>
      <PowerTable
        langCode={selectedLanguage}
        totalPowerCons={powerKps}
        sunrise={tpcSunrise}
        day={tpcDay}
        sunset={tpcSunset}
        night={tpcNight}
        total={tpcTotal}
      />
    </>
  );
};

export const totalSolarProducedTable = (
  selectedLanguage: string,
  minSolarPanels: number,
  spSunrise: number,
  spDay: number,
  spSunset: number,
  spNight: number,
  spTotal: number,
): ReactNode => {
  return (
    <>
      <h4>{translate(LocaleKey.totalSolarProduced)}</h4>
      <PowerTable
        langCode={selectedLanguage}
        totalPowerCons={minSolarPanels}
        sunrise={spSunrise}
        day={spDay}
        sunset={spSunset}
        night={spNight}
        total={spTotal}
      />
    </>
  );
};

export const minimumSummaryTable = (
  selectedLanguage: string,
  totalPowerStored: number,
  totalPowerRequired: number,
  totalPowerUnused: number,
  totalPowerLost: number,
): ReactNode => {
  return (
    <>
      <h4>{translate(LocaleKey.minimumSummary)}</h4>
      <SummaryTable
        langCode={selectedLanguage}
        powerStoredForNight={totalPowerStored}
        powerRequiredForNight={totalPowerRequired}
        powerUnused={totalPowerUnused}
        powerLost={totalPowerLost}
      />
    </>
  );
};
export const recommendedSummaryTable = (
  selectedLanguage: string,
  totalPowerStored: number,
  totalPowerRequired: number,
  totalPowerUnused: number,
  totalPowerLost: number,
): ReactNode => {
  return (
    <>
      <h4>{translate(LocaleKey.recommendedSummary)}</h4>
      <SummaryTable
        langCode={selectedLanguage}
        powerStoredForNight={totalPowerStored + totalPowerLost}
        powerRequiredForNight={totalPowerRequired}
        powerUnused={totalPowerUnused + totalPowerLost}
        powerLost={0}
      />
    </>
  );
};
