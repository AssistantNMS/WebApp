import { PortalRecord } from '../../contracts/portal/portalRecord';

export class StatePortalReducer {
  public portals!: Array<PortalRecord>;
  public availableTags!: Array<string>;
}
