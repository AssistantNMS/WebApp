import { State } from '../../redux/state';
import { getCurrentLanguage, getPlayerName } from '../../redux/modules/setting/selector';
import { setPlayerName } from '../../redux/modules/setting/action';
import { getOwnedTitles } from '../../redux/modules/titles/selector';
import { addTitle, removeTitle } from '../../redux/modules/titles/actions';
import { anyObject } from '../../helper/typescriptHacks';

export interface IReduxProps {
  selectedLanguage?: string;
  playerName?: string;
  ownedTitles?: Array<string>;
  setPlayerName?: (playerName: string) => void;
  addToOwned?: (itemId: string) => void;
  removeFromOwned?: (itemId: string) => void;
}

export const mapStateToProps = (state: State) => {
  return {
    selectedLanguage: getCurrentLanguage(state),
    playerName: getPlayerName(state),
    ownedTitles: getOwnedTitles(state),
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  const newProps = { ...anyObject };
  newProps.setPlayerName = (playerName: string) => {
    dispatch(setPlayerName(playerName));
  };
  newProps.addToOwned = (itemId: string) => {
    dispatch(addTitle(itemId));
  };
  newProps.removeFromOwned = (itemId: string) => {
    dispatch(removeTitle(itemId));
  };
  return { ...newProps };
};
