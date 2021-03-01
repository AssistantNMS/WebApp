/* Auto Generated */

import { AdminApprovalStatus } from "./../../Enum/adminApprovalStatus";

export interface GuideSearchResultViewModel {
    guid: any;
    guideDetailGuid: any;
    title: string;
    subTitle: string;
    showCreatedByUser: boolean;
    userGuid: any;
    userName: string;
    translatorGuid: any;
    translatorName: string;
    minutes: number;
    tags: any[];
    status: AdminApprovalStatus;
    languageCode: string;
    version: number;
    dateCreated: Date;
}
