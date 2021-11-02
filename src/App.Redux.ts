import { State } from './redux/state';
import { toggleMenu } from './redux/modules/setting/action';

export const mapStateToProps = (state: State) => {
    return {
        selectedLanguage: state.settingReducer.selectedLanguage,
        selectedFont: state.settingReducer.selectedFont,
    };
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    newProps.toggleMenu = () => {
        dispatch(toggleMenu());
    };
    return { ...newProps };
}