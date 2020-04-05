import { GuideType } from "./guideType";

export interface GuideSectionItem {
    type: GuideType;
    name: String;
    content: String;
    image: String;
    imageUrl: String;
    columns: Array<String>;
    rows: Array<Array<String>>;
}