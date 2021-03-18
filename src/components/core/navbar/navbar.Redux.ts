import { State } from '../../../redux/state';
import { setLanguage, toggleMenu } from '../../../redux/modules/setting/action';

export const mapStateToProps = (state: State) => {
    return {};
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    newProps.setLanguage = (langCode: string) => {
        dispatch(setLanguage(langCode));
    };
    newProps.toggleMenu = () => {
        dispatch(toggleMenu());
    };
    return { ...newProps };
}