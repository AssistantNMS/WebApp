import * as type from './type';

export const addTitle = (itemId: string) => {
  return {
    itemId,
    type: type.ADDTITLE,
  };
};

export const removeTitle = (itemId: string) => {
  return {
    itemId,
    type: type.REMOVETITLE,
  };
};

export const removeAllTitles = () => {
  return {
    type: type.REMOVEALLTITLE,
  };
};
