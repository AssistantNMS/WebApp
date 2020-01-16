import { StateCommonReducer } from './StateCommonReducer';
import { StateSettingReducer } from './StateSettingReducer';

export class State {
    public commonReducer!: StateCommonReducer;
    public settingReducer!: StateSettingReducer;
}

export default State;