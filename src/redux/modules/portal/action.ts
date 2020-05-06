import * as type from "./type";
import { PortalRecord } from "../../../contracts/portal/portalRecord";

export const addPortal = (portal: PortalRecord) => {
    return {
        portal,
        type: type.ADDPORTAL,
    }
}

export const editPortal = (portal: PortalRecord) => {
    return {
        portal,
        type: type.EDITPORTAL,
    }
}

export const removePortal = (portalId: string) => {
    return {
        portalId,
        type: type.REMOVEPORTAL,
    }
}

