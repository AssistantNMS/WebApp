import { State } from '../../redux/state';
import { setPlatform } from '../../redux/modules/setting/action';
import { getChosenPlatform, getCurrentLanguage } from '../../redux/modules/setting/selector';
import { PlatformType } from '../../contracts/enum/PlatformType';

export const mapStateToProps = (state: State) => {
    return {
        chosenPlatform: getChosenPlatform(state),
        selectedLanguage: getCurrentLanguage(state),
    };
};

export const mapDispatchToProps = (dispatch: any) => {
    let newProps: any = {};
    newProps.setPlatform = (platform: PlatformType) => {
        dispatch(setPlatform(platform));
    };
    return { ...newProps };
}