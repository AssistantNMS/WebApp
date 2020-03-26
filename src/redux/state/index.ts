import { StateCommonReducer } from './StateCommonReducer';
import { StateSettingReducer } from './StateSettingReducer';
import { StateCartReducer } from './StateCartReducer';

export class State {
    public commonReducer!: StateCommonReducer;
    public settingReducer!: StateSettingReducer;
    public cartReducer!: StateCartReducer;
}

export default State;