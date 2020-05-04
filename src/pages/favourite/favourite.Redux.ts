import { State } from '../../redux/state';

import { removeItemFromFavourite } from '../../redux/modules/favourite/action';
import { getFavouriteItems } from '../../redux/modules/favourite/selector';

export const mapStateToProps = (state: State) => {
    return {
        favourites: getFavouriteItems(state)
    };
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    newProps.removeItemFromFavourites = (itemId: string) => {
        dispatch(removeItemFromFavourite(itemId));
    };
    return { ...newProps };
}