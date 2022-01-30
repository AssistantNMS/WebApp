import React from 'react';

interface IProps { }

export const NavBarFake: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="navbar navbar-bg">
            <div className="container-fluid">
                <div className="navbar-wrapper">
                    <span className="navbar-brand noselect"></span>
                </div>
            </div>
        </div>
    );
}
