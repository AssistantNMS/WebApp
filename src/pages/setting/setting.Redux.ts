import { State } from '../../redux/state';
import { setLanguage, toggleAltGlyphs, setFont } from '../../redux/modules/setting/action';
import { getUseAltGlyphs, getCurrentLanguage, getSelectedFont } from '../../redux/modules/setting/selector';


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