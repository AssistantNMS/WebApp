import { State } from '../../../redux/state';
import { toggleMenu } from '../../../redux/modules/setting/action';

export const mapStateToProps = (state: State) => {
  return {
    selectedLanguage: state.settingReducer.selectedLanguage,
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleMenu: () => {
      dispatch(toggleMenu());
    },
  };
};
