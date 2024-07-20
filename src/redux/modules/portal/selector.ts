import State from '../../state';
import { PortalRecord } from '../../../contracts/portal/portalRecord';

export const getPortals = (state: State): Array<PortalRecord> => state?.portalReducer?.portals || [];
export const getAvailableTags = (state: State): Array<string> => state?.portalReducer?.availableTags || [];
