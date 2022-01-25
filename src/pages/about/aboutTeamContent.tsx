import React from 'react';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { DataJsonService } from '../../services/json/DataJsonService';

interface IWithDepInj {
    dataJsonService: DataJsonService;
}

interface IWithoutDepInj {
}

interface IProps extends IWithDepInj, IWithoutDepInj {
}

const AboutTeamContentUnconnected: React.FC<IProps> = (props: IProps) => {
    return (
        <>
            <div className="generic-item-list row justify ta-left mb-2em">
                <div className="col-12">
                    <br />
                </div>
                <div className="col-12 col-xl-5 col-lg-8 col-md-10 col-sm-10 col-xs-12 mb-2em">
                    <assistant-apps-team-list />
                </div>
            </div>
        </>
    );
}

export const AboutTeamContent = withServices<IWithoutDepInj, IWithDepInj>(
    AboutTeamContentUnconnected,
    (services: IDependencyInjection) => ({
        dataJsonService: services.dataJsonService,
    })
);
