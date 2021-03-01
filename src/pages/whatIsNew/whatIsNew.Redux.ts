import { State } from '../../redux/state';

import { getCurrentLanguage } from '../../redux/modules/setting/selector';

export interface IReduxProps {
    language: string;
}

export const mapStateToProps = (state: State): IReduxProps => {
    return {
        language: getCurrentLanguage(state),
    };
};

export interface IReduxDispatchProps {
    language: string;
}

export const mapDispatchToProps = (dispatch: any): IReduxDispatchProps => {

    let newProps: any = {};
    return { ...newProps };
}