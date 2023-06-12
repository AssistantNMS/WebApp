export interface UpdateItem {
    guid: string;
    title: string;
    icon: string;
    emoji: string;
    gameVersion: string;
    updateType: number;
    releaseDate: Date;
    postUrl: string;
    itemIds: Array<string>;
}