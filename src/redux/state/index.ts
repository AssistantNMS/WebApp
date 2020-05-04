import { StateCommonReducer } from './StateCommonReducer';
import { StateSettingReducer } from './StateSettingReducer';
import { StateCartReducer } from './StateCartReducer';
import { StateFavouriteReducer } from './StateFavouriteReducer';

export class State {
    public commonReducer!: StateCommonReducer;
    public settingReducer!: StateSettingReducer;
    public cartReducer!: StateCartReducer;
    public favouriteReducer!: StateFavouriteReducer;
}

export default State;