/* Auto Generated */

import { AppType } from "./../Enum/appType";
import { AppRatingType } from "./../Enum/appRatingType";

export interface AppRatingViewModel {
    app: AppType;
    type: AppRatingType;
    numberOfReviews: number;
    allScore: number;
    version: string;
}
