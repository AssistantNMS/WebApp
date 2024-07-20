import { StateCommonReducer } from './StateCommonReducer';
import { StateSettingReducer } from './StateSettingReducer';
import { StateCartReducer } from './StateCartReducer';
import { StateFavouriteReducer } from './StateFavouriteReducer';
import { StatePortalReducer } from './StatePortalReducer';
import { StateTitleReducer } from './StateTitleReducer';

export class State {
  public commonReducer!: StateCommonReducer;
  public settingReducer!: StateSettingReducer;
  public cartReducer!: StateCartReducer;
  public portalReducer!: StatePortalReducer;
  public favouriteReducer!: StateFavouriteReducer;
  public titleReducer!: StateTitleReducer;
}

export default State;
