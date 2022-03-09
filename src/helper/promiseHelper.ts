import { anyObject } from './typescriptHacks';

export function optionalTask<T>(usages: Array<string>, key: string, actualPromise: () => Promise<T>): Promise<T> {
    const shouldDoActualCall = usages.includes(key);
    if (shouldDoActualCall !== true) return new Promise((resolve, reject) => resolve(anyObject));

    return actualPromise();
};

export function optionalListTask<T>(usages: Array<string>, key: string, actualPromise: () => Promise<Array<T>>): Promise<Array<T>> {
    const shouldDoActualCall = usages.includes(key);
    if (shouldDoActualCall !== true) return new Promise((resolve, reject) => resolve([]));

    return actualPromise();
};
