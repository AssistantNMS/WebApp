import * as type from './type';

import { StatePortalReducer } from '../../state/StatePortalReducer';
import { PortalRecord } from '../../../contracts/portal/portalRecord';

export const initialPortalState: StatePortalReducer = {
    portals: [],
    availableTags: [],
}

export const settingReducer = (state = initialPortalState, action: any) => {
    switch (action.type) {
        case type.ADDPORTAL:
            return Object.assign({}, state, {
                portals: [...(state.portals || []), action.portal]
            });
        case type.EDITPORTAL:
            const portals = state.portals || [];
            const editIndex = portals.findIndex((p: PortalRecord) => p.Uuid === action.portal.Uuid)
            const newPortals = editIndex > 0 ? [...portals.slice(0, editIndex), action.portal, ...portals.slice(editIndex, portals.length)] : portals;
            return Object.assign({}, state, {
                portals: [...newPortals]
            });
        case type.REMOVEPORTAL:
            const removePortals = state.portals || [];
            const removeIndex = removePortals.findIndex((p: PortalRecord) => p.Uuid === action.portal.Uuid)
            const newRemovePortals = removeIndex > 0 ? [...removePortals.slice(0, removeIndex), ...removePortals.slice(removeIndex, removePortals.length)] : removePortals;
            return Object.assign({}, state, {
                portals: [...newRemovePortals]
            });
        default:
            return state
    }
}
