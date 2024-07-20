export const getMinimumAmountOfSolarPanels = (powerKps: number): number => Math.ceil(powerKps / 25);

export const getMinimumAmountOfBatteries = (powerKps: number): number => Math.ceil((powerKps * 800) / 45000);

const totalPowerConsSunriseMultiplier = 82.5;
const totalPowerConsDayMultiplier = 835;
const totalPowerConsSunsestMultiplier = 82.5;
const totalPowerConsNightMultiplier = 800;

export const getTotalPowerConsSunrise = (totalPowerCons: number): number => _safeMultiply(totalPowerCons, totalPowerConsSunriseMultiplier);
export const getTotalPowerConsDay = (totalPowerCons: number): number => _safeMultiply(totalPowerCons, totalPowerConsDayMultiplier);
export const getTotalPowerConsSunsest = (totalPowerCons: number): number => _safeMultiply(totalPowerCons, totalPowerConsSunsestMultiplier);
export const getTotalPowerConsNight = (totalPowerCons: number): number => _safeMultiply(totalPowerCons, totalPowerConsNightMultiplier);

const solarPowerSunriseMultiplier = 82.5 * 25;
const solarPowerDayMultiplier = 835.0 * 50;
const solarPowerSunsestMultiplier = 82.5 * 25;
const solarPowerNightMultiplier = 0;

export const getSolarPowerSunrise = (totalPowerCons: number): number => _safeMultiply(totalPowerCons, solarPowerSunriseMultiplier);
export const getSolarPowerDay = (totalPowerCons: number): number => _safeMultiply(totalPowerCons, solarPowerDayMultiplier);
export const getSolarPowerSunsest = (totalPowerCons: number): number => _safeMultiply(totalPowerCons, solarPowerSunsestMultiplier);
export const getSolarPowerNight = (totalPowerCons: number): number => _safeMultiply(totalPowerCons, solarPowerNightMultiplier);

const batteryCapacity = 45000.0;

export const getMaxPowerThatCanBeStored = (batteries: number): number => _safeMultiply(batteries, batteryCapacity);

export const getRecommendedAmountOfBatteries = (numBatteries: number, totalPowerLost: number): number => {
  const addBatteries = Math.ceil(totalPowerLost / batteryCapacity);
  return numBatteries + addBatteries;
};

const _safeMultiply = (a: number, b: number) => {
  if (a == null || b == null) return 0;
  return a * b;
};
