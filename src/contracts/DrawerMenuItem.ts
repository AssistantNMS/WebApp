import { DrawerIconType } from './enum/DrawerIconType';

export interface DrawerMenuItem {
  name: string;
  link: string;
  icon: string;
  iconType: DrawerIconType;
  isActive: boolean;
  isSeparator?: boolean;
}
