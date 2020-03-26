import { RequiredItem } from '../RequiredItem';

export interface CartItem {
    TypeName: string;
    Id: string;
    Icon: string;
    RequiredItems: Array<RequiredItem>;
    Quantity: number;
}