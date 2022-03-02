import { anyObject } from './typescriptHacks';

export function optionalTask<T>(shouldDoActualCall: boolean, actualPromise: () => Promise<T>): Promise<T> {
    if (shouldDoActualCall !== true) return new Promise((resolve, reject) => resolve(anyObject));

    return actualPromise();
};

export function optionalListTask<T>(shouldDoActualCall: boolean, actualPromise: () => Promise<Array<T>>): Promise<Array<T>> {
    if (shouldDoActualCall !== true) return new Promise((resolve, reject) => resolve([]));

    return actualPromise();
};
