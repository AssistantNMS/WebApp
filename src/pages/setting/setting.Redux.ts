import { State } from '../../redux/state';
import { setLanguage, toggleAltGlyphs, setFont, setPlatform } from '../../redux/modules/setting/action';
import { getUseAltGlyphs, getCurrentLanguage, getSelectedFont, getChosenPlatform } from '../../redux/modules/setting/selector';
import { ControllerPlatformType } from '../../contracts/enum/ControllerPlatformType';

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

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    newProps.setLanguage = (selectedLanguage: string) => {
        dispatch(setLanguage(selectedLanguage));
    };
    newProps.toggleAltGlyphs = () => {
        dispatch(toggleAltGlyphs());
    };
    newProps.setFont = (selectedFont: string) => {
        dispatch(setFont(selectedFont));
    };
    newProps.setPlatform = (platform: ControllerPlatformType) => {
        dispatch(setPlatform(platform));
    };
    return { ...newProps };
}