import { setLanguage, toggleMenu } from '../../../redux/modules/setting/action';

export interface IReduxProps {
  setLanguage: (langCode: string) => void;
  toggleMenu: () => void;
}

export const mapStateToProps = () => {
  return {};
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapDispatchToProps = (dispatch: any) => {
  return {
    setLanguage: (langCode: string) => {
      dispatch(setLanguage(langCode));
    },
    toggleMenu: () => {
      dispatch(toggleMenu());
    },
  };
};
