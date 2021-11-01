import React from 'react';

import { BaseFloatingActionButton } from './baseFloatingActionButton';

export const ShareFloatingActionButton = (openShareDialog: () => void) => {
    return (
        <BaseFloatingActionButton
            key="ShareFloatingActionButton"
            icon={<i className="material-icons">share</i>}
            onClick={openShareDialog}
        />
    );
}