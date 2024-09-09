import classNames from 'classnames';
import React, { useState } from 'react';

interface IDropDownOptionProp {
    title: string;
    value: string;
  }
  
  interface IDropDown {
    defaultValue?: string;
    btnPrefix?: string;
    options: Array<IDropDownOptionProp>;
    onClick: (newValue: string) => void;
  }
  
  export const DropDown: React.FC<IDropDown> = (props: IDropDown) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string>(props.defaultValue ?? props.options[0]?.title ?? '');
    
    const onOptionClick = (value: string) => () => {
        setSelectedValue(value);
        props.onClick(value);
    }

    return (
        <div className={classNames("dropdown nms-drop", {'is-open': isOpen})}  onClick={() => setIsOpen(prev => !prev)}>
            <a href="#" className={classNames("btn bg-gradient-dark dropdown-toggle", {'show': isOpen})}>
                {props.btnPrefix}{selectedValue}
            </a>
            <ul className={classNames("dropdown-menu", {'show': isOpen})}>
                {props.options.map((opt: IDropDownOptionProp, index: number) => (
                    <li onClick={onOptionClick(opt.value)} key={opt.value ?? index} className="dropdown-item pointer">
                    {opt.title}
                    </li>
                ))}
            </ul>
      </div>
    );
  };