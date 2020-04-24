import { State } from '../../redux/state';
import { setPlatform } from '../../redux/modules/setting/action';
import { getChosenPlatform } from '../../redux/modules/setting/selector';
import { PlatformType } from '../../contracts/enum/PlatformType';

export const mapStateToProps = (state: State) => {
    console.log('mapStateToProps', getChosenPlatform(state));
    return {
        chosenPlatform: getChosenPlatform(state),
    };
};

export const mapDispatchToProps = (dispatch: any) => {
    let newProps: any = {};
    newProps.setPlatform = (platform: PlatformType) => {
        console.log('setPlatform', platform);
        dispatch(setPlatform(platform));
    };
    return { ...newProps };
}