import { DrawerIconType } from './enum/DrawerIconType';

export interface IDrawerProps {
  history: any;
}

export interface DrawerMenuItem {
  name: string;
  link: string;
  icon: string;
  iconType: DrawerIconType;
  isActive: boolean;
  isSeparator?: boolean;
  subs?: Array<DrawerMenuItem>;
  onClick?: (props: IDrawerProps) => void;
}
