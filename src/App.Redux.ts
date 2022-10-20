import { State } from './redux/state';
import { toggleMenu } from './redux/modules/setting/action';

export interface IStateProps {
    selectedLanguage: string;
    selectedFont: string;
}

export interface IStateDispatch {
    toggleMenu: () => void;
}

export const mapStateToProps = (state: State): IStateProps => {
    return {
        selectedLanguage: state.settingReducer.selectedLanguage,
        selectedFont: state.settingReducer.selectedFont,
    };
};

export const mapDispatchToProps = (dispatch: any): IStateDispatch => {

    let newProps: any = {};
    newProps.toggleMenu = () => {
        dispatch(toggleMenu());
    };
    return { ...newProps };
}