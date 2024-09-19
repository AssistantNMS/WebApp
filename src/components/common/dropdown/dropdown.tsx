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
    setIsOpen(false);
  }

  return (
    <div className={classNames('dropdown', { 'open': isOpen })}>
      <label className="dropdown-label" onClick={() => setIsOpen(true)}>
        {props.btnPrefix}{selectedValue == undefined ? props.defaultValue : selectedValue}
      </label>
      <div className="backdrop" onClick={() => setIsOpen(false)}></div>
      <ul className="noselect">
        {props.options.map((opt: IDropDownOptionProp, index: number) => (
          <li className="dropdown-item pointer"
            draggable={false}
            onClick={onOptionClick(opt.value)} key={opt.value ?? index}
          >
            {opt.title}
          </li>
        ))}
      </ul>
    </div>
  );
};