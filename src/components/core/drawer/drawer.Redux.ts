import { State } from '../../../redux/state';
import { toggleMenu } from '../../../redux/modules/setting/action';

export const mapStateToProps = (state: State) => {
    return {};
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    newProps.toggleMenu = () => {
        dispatch(toggleMenu());
    };
    return { ...newProps };
}
