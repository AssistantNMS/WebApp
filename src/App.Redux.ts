import { State } from './redux/state';
import { setDarkMode, toggleMenu } from './redux/modules/setting/action';

export const mapStateToProps = (state: State) => {
    return {
        isDark: state.settingReducer.isDark,
        selectedLanguage: state.settingReducer.selectedLanguage,
    };
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    newProps.setDarkMode = (isDark: boolean) => {
        dispatch(setDarkMode(isDark));
    };
    newProps.toggleMenu = () => {
        dispatch(toggleMenu());
    };
    return { ...newProps };
}