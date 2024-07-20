import React from 'react';

import { BaseFloatingActionButton } from './baseFloatingActionButton';
import { OnClickEvent } from '../../helper/typescriptHacks';

export const AddFloatingActionButton = (key: string, onclick: (e: OnClickEvent) => void) => {
  return (
    <div style={{ position: 'absolute', bottom: '1em', right: '1em' }}>
      <BaseFloatingActionButton key="key" keyString={key} icon={<i className="material-icons">add</i>} onClick={onclick} />
    </div>
  );
};
