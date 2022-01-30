import React from 'react';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';

export const NotFoundPresenter: React.FC = () => {
    return (
        <DefaultAnimation>
            <HeadComponent title={"404 - Not Found"} />
            <NavBar title="404" />
            <div className="content">
                <div className="container full pt1">
                    <h1>Not Found</h1>
                </div>
            </div>
        </DefaultAnimation>
    );
}