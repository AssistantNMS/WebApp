import { State } from '../../redux/state';

import { getCurrentLanguage } from '../../redux/modules/setting/selector';
import { anyObject } from '../../helper/typescriptHacks';

export interface IReduxProps {
  language: string;
}

export const mapStateToProps = (state: State): IReduxProps => {
  return {
    language: getCurrentLanguage(state),
  };
};

export interface IReduxDispatchProps {
  language: string;
}

export const mapDispatchToProps = (): IReduxDispatchProps => {
  return { ...anyObject };
};
