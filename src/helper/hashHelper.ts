import { formatDate } from './dateHelper';

const hash = require('object-hash');

export const getHashForObjectFor1Min = (object: any) => {
    const dateString = formatDate(new Date(), 'HH:mm')
    const hashString = hash([object, dateString]);
    return hashString;
}