const dayjs = require('dayjs');

export const formatDate = (date: Date) => {
    return dayjs(date).format('YYYY/MM/DD');
}