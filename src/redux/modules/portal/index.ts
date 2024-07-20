import { PortalRecord } from '../../../contracts/portal/portalRecord';
import { StatePortalReducer } from '../../state/StatePortalReducer';
import * as type from './type';

export const initialPortalState: StatePortalReducer = {
  portals: [],
  availableTags: [],
};

export const portalReducer = (state = initialPortalState, action: any) => {
  switch (action.type) {
    case type.ADDPORTAL:
      return Object.assign({}, state, {
        portals: [...(state.portals || []), action.portal],
      });
    case type.EDITPORTAL: {
      const portals = state.portals || [];
      const editIndex = portals.findIndex((p: PortalRecord) => p.Uuid === action.portal.Uuid);
      const newPortals = editIndex >= 0 ? [...portals.slice(0, editIndex), action.portal, ...portals.slice(editIndex + 1, portals.length)] : portals;
      return Object.assign({}, state, {
        portals: [...newPortals],
      });
    }
    case type.REMOVEPORTAL: {
      const removePortals = state.portals || [];
      const removeIndex = removePortals.findIndex((p: PortalRecord) => p.Uuid === action.portalId);
      const newRemovePortals =
        removeIndex >= 0 ? [...removePortals.slice(0, removeIndex), ...removePortals.slice(removeIndex + 1, removePortals.length)] : removePortals;
      return Object.assign({}, state, {
        portals: [...newRemovePortals],
      });
    }
    default:
      return state;
  }
};
