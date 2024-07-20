import { State } from '../../redux/state';
import { getCurrentLanguage } from '../../redux/modules/setting/selector';

export const mapStateToProps = (state: State) => {
  return {
    selectedLanguage: getCurrentLanguage(state),
  };
};

export const mapDispatchToProps = () => {
  return {};
};
