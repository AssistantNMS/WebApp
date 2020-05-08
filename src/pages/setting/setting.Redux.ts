import { State } from '../../redux/state';
import { setDarkMode, setLanguage, toggleAltGlyphs } from '../../redux/modules/setting/action';
import { getIsDark, getUseAltGlyphs, getCurrentLanguage } from '../../redux/modules/setting/selector';

export const mapStateToProps = (state: State) => {
    return {
        isDark: getIsDark(state),
        useAltGlyphs: getUseAltGlyphs(state),
        selectedLanguage: getCurrentLanguage(state),
    };
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    newProps.setDarkMode = (isDark: boolean) => {
        dispatch(setDarkMode(isDark));
    };
    newProps.setLanguage = (selectedLanguage: string) => {
        dispatch(setLanguage(selectedLanguage));
    };
    newProps.toggleAltGlyphs = () => {
        dispatch(toggleAltGlyphs());
    };
    return { ...newProps };
}