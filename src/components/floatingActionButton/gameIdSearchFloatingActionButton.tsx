import React from 'react';
import { translate } from '../../localization/Translate';
import { LocaleKey } from '../../localization/LocaleKey';

import { BaseFloatingActionButton } from './baseFloatingActionButton';

interface IProps {
  onClick: () => void;
}

export const GameIdSearchFloatingActionButton: React.FC<IProps> = (props: IProps) => {
  return (
    <BaseFloatingActionButton
      key="GameIdSearchFloatingActionButton"
      keyString="GameIdSearchFloatingActionButton"
      tooltipText={translate(LocaleKey.advancedSearch)}
      icon={<i className="material-icons">code</i>}
      onClick={props.onClick}
    />
  );
};
