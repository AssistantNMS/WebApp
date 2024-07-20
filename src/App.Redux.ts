import { State } from './redux/state';
import { toggleMenu } from './redux/modules/setting/action';

export interface IStateProps {
  selectedLanguage: string;
  selectedFont: string;
}

export interface IStateDispatch {
  toggleMenu: () => void;
}

export const mapStateToProps = (state: State): IStateProps => {
  return {
    selectedLanguage: state.settingReducer.selectedLanguage,
    selectedFont: state.settingReducer.selectedFont,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapDispatchToProps = (dispatch: any): IStateDispatch => {
  return {
    toggleMenu: () => {
      dispatch(toggleMenu());
    },
  };
};
