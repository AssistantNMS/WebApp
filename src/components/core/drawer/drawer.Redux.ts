import { State } from '../../../redux/state';

export const mapStateToProps = (state: State) => {
    return {
        selectedLanguage: state.settingReducer.selectedLanguage,
    };
};
