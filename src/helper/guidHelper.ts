// tslint:disable-next-line:no-bitwise
export const guidBlock = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

export const newGuid = () => (
    guidBlock() + guidBlock() + '-' +
    guidBlock() + '-' +
    guidBlock() + '-' +
    guidBlock() + '-' +
    guidBlock() + guidBlock() + guidBlock()
).toLowerCase();
