import { getCurrentLanguage } from '../../../redux/modules/setting/selector';
import { State } from '../../../redux/state';

export interface IFromRedux {
  selectedLanguage: string;
}

export const mapStateToProps = (state: State) => {
  return {
    selectedLanguage: getCurrentLanguage(state),
  };
};
