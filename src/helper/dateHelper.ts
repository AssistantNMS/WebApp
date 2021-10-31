const dayjs = require('dayjs');

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