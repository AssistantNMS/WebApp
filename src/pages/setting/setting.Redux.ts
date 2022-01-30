import { State } from '../../redux/state';
import { setLanguage, toggleAltGlyphs, setFont } from '../../redux/modules/setting/action';
import { getUseAltGlyphs, getCurrentLanguage, getSelectedFont } from '../../redux/modules/setting/selector';

export interface IReduxProps {
    useAltGlyphs: boolean;
    selectedLanguage: string;
    selectedFont: string;
    toggleAltGlyphs: () => void;
    setLanguage: (selectedLanguage: string) => void;
    setFont: (selectedFont: string) => void;
}

export const mapStateToProps = (state: State) => {
    return {
        useAltGlyphs: getUseAltGlyphs(state),
        selectedLanguage: getCurrentLanguage(state),
        selectedFont: getSelectedFont(state),
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
    return { ...newProps };
}