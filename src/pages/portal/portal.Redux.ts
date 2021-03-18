import { State } from '../../redux/state';

import { getPortals } from '../../redux/modules/portal/selector';
import { removePortal } from '../../redux/modules/portal/action';
import { getUseAltGlyphs } from '../../redux/modules/setting/selector';

export const mapStateToProps = (state: State) => {
    return {
        portals: getPortals(state),
        useAltGlyphs: getUseAltGlyphs(state),
    };
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    newProps.removePortal = (portalId: string) => {
        dispatch(removePortal(portalId));
    };
    return { ...newProps };
}