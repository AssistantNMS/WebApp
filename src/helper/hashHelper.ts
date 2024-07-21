import { getCurrentLang } from '../localization/Translate';
import { formatDate } from './dateHelper';
import hash from 'object-hash';

export const getHashForObject = (object: hash.NotUndefined) => {
  const dateString = formatDate(new Date(), 'HH:00');
  const hashString = hash([object, dateString, getCurrentLang()]);
  return hashString;
};

export const getOrAddFunc =
  (hashLookup: Record<string, unknown>) =>
  async <T>(promise: () => Promise<T>, argsArray: Array<string>): Promise<T> => {
    const hash = getHashForObject(argsArray);

    if (hashLookup != null && hashLookup[hash] != null) {
      return hashLookup[hash] as T;
    }

    const jsonResult = await promise();
    hashLookup[hash] = jsonResult;
    return jsonResult;
  };
