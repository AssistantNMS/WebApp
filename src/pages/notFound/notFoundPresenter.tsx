import React from 'react';

import { NavBar } from '../../components/core/navbar/navbar';

export const NotFoundPresenter: React.FC = () => {
    return (
        <>
            <NavBar title="404" />
            <div className="content">
                <div className="container full pt1">
                    <h1>Not Found</h1>
                </div>
            </div>
        </>
    );
}