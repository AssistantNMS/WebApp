import { State } from '../../redux/state';

export interface IReduxProps {
    selectedLanguage?: string;
}

export const mapStateToProps = (state: State) => {
    return {
        selectedLanguage: state.settingReducer.selectedLanguage,
    };
};