import { GuideType } from "./guideType";

export interface GuideSectionItem {
    type: GuideType;
    name: string;
    content: string;
    image: string;
    imageUrl: string;
    columns: Array<string>;
    rows: Array<Array<string>>;
}