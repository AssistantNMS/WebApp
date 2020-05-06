import React from 'react';

import { Fab } from '@material/react-fab'

export const AddFloatingActionButton = (key: string, onclick: any) => {
    return (
        <div style={{ position: 'absolute', bottom: '1em', right: '1em' }}>
            <Fab className="fab-bg-color fab-margin"
                key={key}
                icon={<i className="material-icons">add</i>}
                onClick={onclick}
            />
        </div>
    );
}