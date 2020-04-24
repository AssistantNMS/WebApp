import * as React from 'react';


export const Loading = () => {

    return (
        <>
            <div className="full-page-loader opacity80"></div>
            <div className="full-page-loader">
                <div className="cssload-container">
                    <ul className="cssload-flex-container">
                        <li style={{ listStyleType: 'none' }}>
                            <img src="/assets/images/loader.svg" draggable="false" alt="loading-animation" />
                            <h2 className="largeHeading">Loading</h2>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export const SmallLoading = () => {

    return (
        <div className="container">
            <ul className="row">
                <div className="col-12" style={{ textAlign: 'center' }}>
                    <img src="/assets/images/loader.svg" draggable="false" alt="loading-animation" style={{ maxWidth: '100px' }} />
                    <h2 className="largeHeading">Loading</h2>
                </div>
            </ul>
        </div>
    );
}
