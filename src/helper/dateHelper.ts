/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { LocaleKey } from '../localization/LocaleKey';
import { translate } from '../localization/Translate';

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

export const formatDate = (date: Date, format: string = 'YYYY/MM/DD'): string => {
  try {
    return dayjs(date).format(format);
  } catch {
    return '';
  }
};

export const guideFormatDate = (date: Date | string): string => {
  return formatDate(date as any, 'DD MMM YYYY');
};

export const twitchDate = (date: Date | string): string => {
  return formatDate(date as any, 'YYYY-MM-DD');
};

export const dateIsBefore = (firstDate: Date, secondDate: Date): boolean => {
  try {
    return dayjs(firstDate).isBefore(secondDate);
  } catch {
    return false;
  }
};

export const dateAdd = (date: Date, numberOfDays: number): Date => {
  try {
    return dayjs(date).add(numberOfDays, 'day');
  } catch {
    return date;
  }
};

export const percentageProgress = (startDate: Date, endDate: Date): number => {
  const startDateMilli = dayjs(startDate).valueOf();
  const currDateMilli = dayjs(new Date()).valueOf();
  const endDateMilli = dayjs(endDate).valueOf();

  if (currDateMilli > endDateMilli) {
    return 100;
  }

  // if (startDateMilli < endDateMilli) {
  //     return 0;
  // }

  const progressMilli = currDateMilli - startDateMilli;
  const goalMilli = endDateMilli - startDateMilli;
  const percentage = (progressMilli / goalMilli) * 100;

  return Math.round(percentage);
};

export const friendlyTimeLeft = (startDate: Date, endDate: Date): string => {
  if (startDate > new Date()) {
    return translate(LocaleKey.notStarted);
  }
  if (endDate < new Date()) {
    return translate(LocaleKey.completed);
  }

  dayjs.extend(relativeTime);
  return dayjs(new Date()).to(endDate, true);
};
