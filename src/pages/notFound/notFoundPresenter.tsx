import React from 'react';

import { NavBar } from '../../components/core/navbar/navbar';

export const NotFoundPresenter: React.FC = () => {
    return (
        <>
            <NavBar title="Not Found" />
            <div className="content">
                <div className="container" style={{ paddingTop: '1em', maxWidth: 'unset' }}>
                    <h1>Not Found</h1>
                </div>
            </div>
        </>
    );
}