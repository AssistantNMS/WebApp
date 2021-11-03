const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

export const formatDate = (date: Date, format: string = 'YYYY/MM/DD'): string => {
    try {
        return dayjs(date).format(format);
    }
    catch {
        return '';
    }
}

export const guideFormatDate = (date: Date | string): string => {
    return formatDate(date as any, 'DD MMM YYYY');
}

export const dateIsBefore = (firstDate: Date, secondDate: Date): boolean => {
    try {
        return dayjs(firstDate).isBefore(secondDate);
    }
    catch {
        return false;
    }
}

export const percentageProgress = (startDate: Date, endDate: Date): number => {
    const startDateMilli = dayjs(startDate).valueOf();
    const currDateMilli = dayjs(new Date()).valueOf();
    const endDateMilli = dayjs(endDate).valueOf();

    const progressMilli = currDateMilli - startDateMilli;
    const goalMilli = endDateMilli - startDateMilli;
    console.log(goalMilli)

    const percentage = (progressMilli / goalMilli) * 100;

    return Math.round(percentage);
}

export const friendlyTimeLeft = (startDate: Date, endDate: Date): string => {
    dayjs.extend(relativeTime);
    return dayjs(startDate).to(endDate, true);
}