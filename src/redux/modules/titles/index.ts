/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateTitleReducer } from '../../state/StateTitleReducer';
import * as type from './type';

export const initialTitleState: StateTitleReducer = {
  titles: [],
};

export const titleReducer = (state = initialTitleState, action: any) => {
  switch (action.type) {
    case type.ADDTITLE:
      return Object.assign({}, state, {
        titles: [...(state.titles || []), action.itemId],
      });
    case type.REMOVETITLE: {
      const removeTitles = state.titles || [];
      const removeTitleIndex = removeTitles.findIndex((p: string) => p === action.itemId);
      const newTitles =
        removeTitleIndex >= 0
          ? [...removeTitles.slice(0, removeTitleIndex), ...removeTitles.slice(removeTitleIndex + 1, removeTitles.length)]
          : removeTitles;
      return Object.assign({}, state, {
        titles: [...newTitles],
      });
    }
    case type.REMOVEALLTITLE:
      return Object.assign({}, state, {
        titles: [],
      });
    default:
      return state;
  }
};
