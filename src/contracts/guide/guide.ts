import { GuideSection } from "./guideSection";

export interface Guide {
    guid: string;
    title: string;
    shortTitle: string;
    image: string;
    author: string;
    folder: string;
    date: Date;
    minutes: number;
    isNew: boolean;
    tags: Array<string>;
    sections: Array<GuideSection>;
}
