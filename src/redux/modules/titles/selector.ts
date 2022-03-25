import State from "../../state";

export const getOwnedTitles = (state: State): Array<string> => state?.titleReducer?.titles || [];