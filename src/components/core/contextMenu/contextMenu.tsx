import React, { ReactNode, useEffect, useState } from 'react';

interface ICustomContextMenuItem {
    content: ReactNode | string;
    isDivider?: boolean;
    onClick: () => void;
}

interface ICustomContextMenuProps {
    id: string;
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

        const showMenu = (event: any) => {
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

    if (!isVisible) return (<span></span>);

    const onItemClick = (optClick: () => void) => (e: any) => {
        e.preventDefault();
        optClick?.();
    }

    return (
        <div className='context-menu'>
            {
                props.options.map((item, index) => {
                    return (
                        <div
                            key={`${props.id}-opt-${index}`}
                            onClick={onItemClick(item.onClick)}
                            className='context-menu__item'
                        >
                            {item.content}
                        </div>
                    );
                })
            }
        </div>
    );
};