import { RequiredItem } from '../RequiredItem';

export interface CartItem {
  Id: string;
  Icon: string;
  RequiredItems: Array<RequiredItem>;
  Quantity: number;
}
