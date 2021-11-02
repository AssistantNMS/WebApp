import React from 'react';

import { BaseFloatingActionButton } from './baseFloatingActionButton';

export const AddFloatingActionButton = (key: string, onclick: (e: any) => void) => {
    return (
        <div style={{ position: 'absolute', bottom: '1em', right: '1em' }}>
            <BaseFloatingActionButton
                key="key"
                keyString={key}
                icon={<i className="material-icons">add</i>}
                onClick={onclick}
            />
        </div>
    );
}