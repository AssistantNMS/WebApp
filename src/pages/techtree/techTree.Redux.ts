import { State } from '../../redux/state';
import { getCurrentLanguage } from '../../redux/modules/setting/selector';

export interface IReduxProps {
  selectedLanguage?: string;
}

export const mapStateToProps = (state: State) => {
  return {
    selectedLanguage: getCurrentLanguage(state),
  };
};
