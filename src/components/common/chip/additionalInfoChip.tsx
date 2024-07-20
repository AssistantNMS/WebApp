import React from 'react';
import classNames from 'classnames';
import { CustomTooltip } from '../tooltip/tooltip';

export interface IChipRowProps {
  additionalData: Array<IChipProps>;
}
export interface IChipProps {
  text: string;
  image?: string;
  icon?: string;
  tooltip?: string;
  onClick?: () => void;
  children?: JSX.Element;
  additionalCss?: string;
}

export const AdditionalInfoChipRow: React.FC<IChipRowProps> = (props: IChipRowProps) => {
  if (props.additionalData == null || props.additionalData.length === 0) return null;

  const getImage = (item: IChipProps): JSX.Element | undefined => {
    if (item.image != null && item.image.length > 0) {
      return <img src={item.image} alt={item.image} style={{ maxHeight: '20px', marginLeft: '5px' }} />;
    }
    if (item.icon != null && item.icon.length > 0) {
      return (
        <i className="material-icons" style={{ verticalAlign: 'middle' }}>
          {item.icon}
        </i>
      );
    }

    return undefined;
  };

  return (
    <div className="row justify mt-1em pb1 noselect">
      {props.additionalData.map((item: IChipProps, index: number) => {
        return (
          <AdditionalInfoChip key={`additional-data-${index}`} {...item}>
            {getImage(item)}
          </AdditionalInfoChip>
        );
      })}
    </div>
  );
};

export const AdditionalInfoChip: React.FC<IChipProps> = (props: IChipProps) => {
  const safeClick = () => {
    if (props.onClick) props.onClick();
  };
  return (
    <div className={classNames('secondary chip noselect extra-padding', props.additionalCss, { pointer: !!props.onClick })} onClick={safeClick}>
      <span>{props.text}</span>
      {props.children && (
        <CustomTooltip tooltipText={props.tooltip} theme="transparent">
          {props.children}
        </CustomTooltip>
      )}
    </div>
  );
};
