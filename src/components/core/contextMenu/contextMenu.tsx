import React, { ReactNode, useEffect, useState } from 'react';
import { OnClickEvent } from '../../../helper/typescriptHacks';

interface ICustomContextMenuItem {
  content: ReactNode | string;
  isDivider?: boolean;
  onClick: () => void;
}

interface ICustomContextMenuProps {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parentRef: any;
  options: Array<ICustomContextMenuItem>;
}

export const CustomContextMenu: React.FC<ICustomContextMenuProps> = (props: ICustomContextMenuProps) => {
  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    const parent = props.parentRef.current;
    if (!parent) {
      return;
    }

    const closeMenu = () => {
      setVisibility(false);
    };

    const showMenu = (event: MouseEvent) => {
      event.preventDefault();

      setVisibility(true);
      window.addEventListener('contextmenu', closeMenu);
    };

    parent.addEventListener('contextmenu', showMenu);
    window.addEventListener('click', closeMenu);

    return () => {
      parent.removeEventListener('contextmenu', showMenu);
      window.removeEventListener('contextmenu', closeMenu);
      window.removeEventListener('click', closeMenu);
    };
  });

  if (!isVisible) return <span></span>;

  const onItemClick = (optClick: () => void) => (e: OnClickEvent) => {
    e.preventDefault?.();
    optClick?.();
  };

  return (
    <div className="context-menu">
      {props.options.map((item, index) => {
        return (
          <div key={`${props.id}-opt-${index}`} onClick={onItemClick(item.onClick)} className="context-menu__item">
            {item.content}
          </div>
        );
      })}
    </div>
  );
};
