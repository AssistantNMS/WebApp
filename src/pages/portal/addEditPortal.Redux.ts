import { State } from '../../redux/state';

import { addPortal, editPortal } from '../../redux/modules/portal/action';
import { PortalRecord } from '../../contracts/portal/portalRecord';
import { getAvailableTags } from '../../redux/modules/portal/selector';
import { getUseAltGlyphs } from '../../redux/modules/setting/selector';
import { toggleAltGlyphs } from '../../redux/modules/setting/action';

export interface IReduxProps {
    useAltGlyphs: boolean;
    tags: Array<string>;
    availableTags: Array<string>;
    addPortal?: (portalRecord: PortalRecord) => void;
    editPortal?: (portalRecord: PortalRecord) => void;
    toggleAltGlyphs?: () => void;
}

export const mapStateToProps = (state: State) => {
    return {
        availableTags: getAvailableTags(state),
        useAltGlyphs: getUseAltGlyphs(state),
    };
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    newProps.addPortal = (portalRecord: PortalRecord) => {
        dispatch(addPortal(portalRecord));
    };
    newProps.editPortal = (portalRecord: PortalRecord) => {
        dispatch(editPortal(portalRecord));
    };
    newProps.toggleAltGlyphs = () => {
        dispatch(toggleAltGlyphs());
    };
    return { ...newProps };
}