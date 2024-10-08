import { DrawerIconType } from './enum/DrawerIconType';

export interface IDrawerProps {
  history: unknown;
}

export interface DrawerMenuItem {
  name: string;
  link: string;
  icon: string;
  iconType: DrawerIconType;
  isActive: boolean;
  isSeparator?: boolean;
  isPatreon?: boolean;
  subs?: Array<DrawerMenuItem>;
  onClick?: (props: IDrawerProps) => void;
}
