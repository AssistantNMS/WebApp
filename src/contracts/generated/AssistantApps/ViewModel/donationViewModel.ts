/* Auto Generated */

import { DonationType } from "./../Enum/donationType";

export interface DonationViewModel {
    guid: any;
    userGuid?: any;
    username: string;
    email: string;
    type: DonationType;
    amount?: number;
    currency: string;
    actualAmount?: number;
    isHidden?: boolean;
    date: Date;
}
