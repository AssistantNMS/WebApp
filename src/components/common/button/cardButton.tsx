import React from 'react';
import classNames from 'classnames';
import { OnClickEvent } from '../../../helper/typescriptHacks';

interface IProps {
  title: string;
  url: string;
  imageUrl?: string;
  className?: string;
  onClick?: () => void;
}

export const CardButton: React.FC<IProps> = (props: IProps) => {
  const localOnClick = (e: OnClickEvent) => {
    if (props.onClick == null) return;

    e.preventDefault?.();
    props.onClick();
  };
  return (
    <a href={props.url} onClick={localOnClick} target="_blank" rel="noopener noreferrer" className="card extraMargin">
      <div className={classNames('card-header', props.className)}>
        {props.imageUrl == null ? null : <img src={props.imageUrl} alt={props.title} className="card-header-image" />}
        <div className="card-social">
          <span>{props.title}</span>
        </div>
      </div>
    </a>
  );
};
