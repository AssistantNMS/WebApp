import { GameItemModel } from "../contracts/GameItemModel";

export const gameItemModelSortByName = (a: GameItemModel, b: GameItemModel) => {
    const nameA = a.Name.toUpperCase();
    const nameB = b.Name.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
        comparison = 1;
    } else if (nameA < nameB) {
        comparison = -1;
    }
    return comparison;
};