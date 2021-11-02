import React from 'react';

import { BaseFloatingActionButton } from './baseFloatingActionButton';

export const ApplyFloatingActionButton = (key: string, onclick: any) => {
    return (
        <div style={{ position: 'absolute', bottom: '1em', right: '1em' }}>
            <BaseFloatingActionButton
                key={key}
                keyString={key}
                icon={<i className="material-icons">check</i>}
                onClick={onclick}
            />
        </div>
    );
}