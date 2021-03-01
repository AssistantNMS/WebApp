/* Auto Generated */

import { AdminApprovalStatus } from "./../../Enum/adminApprovalStatus";

export interface GuideContentViewModel {
    guid: any;
    title: string;
    subTitle: string;
    likes: number;
    views: number;
    showCreatedByUser: boolean;
    userGuid: any;
    userName: string;
    languageCode: string;
    minutes: number;
    tags: any[];
    originalGuideGuid: any;
    translatorGuid?: any;
    status: AdminApprovalStatus;
    dateCreated: Date;
    sections: any[];
}
