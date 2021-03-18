import { State } from '../../redux/state';
import { setLanguage, toggleAltGlyphs } from '../../redux/modules/setting/action';
import { getUseAltGlyphs, getCurrentLanguage } from '../../redux/modules/setting/selector';

export const mapStateToProps = (state: State) => {
    return {
        useAltGlyphs: getUseAltGlyphs(state),
        selectedLanguage: getCurrentLanguage(state),
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
    return { ...newProps };
}