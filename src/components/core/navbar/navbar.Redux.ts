import { State } from '../../../redux/state';
import { setDarkMode, setLanguage } from '../../../redux/modules/setting/action';

export const mapStateToProps = (state: State) => {
    return {
        isDark: state.settingReducer.isDark,
    };
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    newProps.setDarkMode = (isDark: boolean) => {
        dispatch(setDarkMode(isDark));
    };
    newProps.setLanguage = (langCode: string) => {
        dispatch(setLanguage(langCode));
    };
    return { ...newProps };
}