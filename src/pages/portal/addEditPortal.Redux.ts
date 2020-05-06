import { State } from '../../redux/state';

import { addPortal } from '../../redux/modules/portal/action';
import { PortalRecord } from '../../contracts/portal/portalRecord';
import { getAvailableTags } from '../../redux/modules/portal/selector';
import { getIsDark, getUseAltGlyphs } from '../../redux/modules/setting/selector';
import { toggleAltGlyphs } from '../../redux/modules/setting/action';

export const mapStateToProps = (state: State) => {
    return {
        availableTags: getAvailableTags(state),
        useAltGlyphs: getUseAltGlyphs(state),
        isDark: getIsDark(state),
    };
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    newProps.addPortal = (portalRecord: PortalRecord) => {
        dispatch(addPortal(portalRecord));
    };
    newProps.toggleAltGlyphs = () => {
        dispatch(toggleAltGlyphs());
    };
    return { ...newProps };
}