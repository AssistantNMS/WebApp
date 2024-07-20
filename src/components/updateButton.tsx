import React from 'react';

interface IProps {
  onClick: React.MouseEventHandler<HTMLSpanElement>;
}

export const UpdateButton: React.FC<IProps> = (props: IProps) => {
  return (
    <span className="pointer" onClick={props.onClick}>
      Update available
    </span>
  );
};
