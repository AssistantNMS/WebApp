import classNames from 'classnames';
import React from 'react';
import { CustomTooltip } from '../common/tooltip/tooltip';
import { OnClickEvent } from '../../helper/typescriptHacks';

interface IProps {
  keyString: string;
  icon: JSX.Element;
  tooltipText?: string;
  isDisabled?: boolean;
  onClick: (e: OnClickEvent) => void;
}

export const BaseFloatingActionButton = (props: IProps) => {
  const child = (
    <button
      className={classNames('mdc-fab fab-bg-color fab-margin noselect', {
        'is-disabled': props.isDisabled,
      })}
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );

  if (props.tooltipText != null) {
    return (
      <CustomTooltip tooltipText={props.tooltipText ?? props.icon ?? 'tooltip'} position="bottom-start" theme="light">
        {child}
      </CustomTooltip>
    );
  }
  return child;
};
