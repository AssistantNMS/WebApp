import React from 'react';

import { NavBar } from '../../components/core/navbar/navbar';

export const HomePresenter: React.FC = () => {
    return (
        <>
            <NavBar title="Home" />
            <div className="content">
                <div className="container" style={{ paddingTop: '1em', maxWidth: 'unset' }}>
                    <h1>Welcome!</h1>
                    <h2>This site is currently in development</h2>
                    <h3>This will be the Web version of the <b>Assistant for No Man's Sky</b> Apps.<br />A lot of features are
                    missing and a lot of things are probably broken</h3>
                </div>
            </div>
        </>
    );
}