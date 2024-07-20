import { ControllerPlatformType } from '../../contracts/enum/ControllerPlatformType';
import { setFont, setLanguage, setPlatform, toggleAltGlyphs } from '../../redux/modules/setting/action';
import { getChosenPlatform, getCurrentLanguage, getSelectedFont, getUseAltGlyphs } from '../../redux/modules/setting/selector';
import { State } from '../../redux/state';

export interface IReduxProps {
  useAltGlyphs: boolean;
  selectedLanguage: string;
  selectedFont: string;
  selectedPlatform: ControllerPlatformType;
  toggleAltGlyphs: () => void;
  setLanguage: (selectedLanguage: string) => void;
  setFont: (selectedFont: string) => void;
  setPlatform: (platform: ControllerPlatformType) => void;
}

export const mapStateToProps = (state: State) => {
  return {
    useAltGlyphs: getUseAltGlyphs(state),
    selectedLanguage: getCurrentLanguage(state),
    selectedFont: getSelectedFont(state),
    selectedPlatform: getChosenPlatform(state),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapDispatchToProps = (dispatch: any) => {
  return {
    setLanguage: (selectedLanguage: string) => {
      dispatch(setLanguage(selectedLanguage));
    },
    toggleAltGlyphs: () => {
      dispatch(toggleAltGlyphs());
    },
    setFont: (selectedFont: string) => {
      dispatch(setFont(selectedFont));
    },
    setPlatform: (platform: ControllerPlatformType) => {
      dispatch(setPlatform(platform));
    },
  };
};
