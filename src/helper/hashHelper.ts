import { formatDate } from './dateHelper';

const hash = require('object-hash');

export const getHashForObject = (object: any) => {
    const dateString = formatDate(new Date(), 'HH:00');
    const hashString = hash([object, dateString]);
    return hashString;
}

export interface GetOrAddResult<T> {
    hashLookup: any;
    result: T;
}
export const getOrAddToHashLookup = async <T>(hashLookup: any, promise: () => Promise<T>, argsArray: Array<any>): Promise<GetOrAddResult<T>> => {
    const hash = getHashForObject(argsArray);

    if (hashLookup != null && hashLookup[hash] != null) {
        return hashLookup[hash];
    }

    const jsonResult = await promise();
    hashLookup[hash] = jsonResult;
    return {
        hashLookup: hashLookup,
        result: jsonResult,
    };
}