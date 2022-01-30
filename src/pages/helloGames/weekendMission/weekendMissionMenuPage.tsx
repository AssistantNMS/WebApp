import classNames from 'classnames';
import i18next from 'i18next';
import React from 'react';
import { Link } from 'react-router-dom';
import { DefaultAnimation } from '../../../components/common/animation/defaultAnim';
import { HeadComponent } from '../../../components/core/headComponent';
import { NavBar } from '../../../components/core/navbar/navbar';
import { ExternalUrls } from '../../../constants/ExternalUrls';
import * as Routes from '../../../constants/Route';
import { WeekendMissions } from '../../../constants/WeekendMission';
import { LocaleKey } from '../../../localization/LocaleKey';

interface IProps { }

export const WeekendMissionMenuPresenter: React.FC<IProps> = (props: IProps) => {

    const weekendMissionCard = (title: string, imageName: string, credits: string, seasonId: any, external?: string) => {
        if (external != null) {
            return (
                <a href={external} target="_blank" rel="noopener noreferrer" className={classNames('col-12 col-xl-6 col-lg-12 col-md-12 col-sm-12 col-cs-12 weekend-mission-card')} style={{ backgroundImage: `url(/assets/images/${imageName})` }}>
                    <p className="mt-2 mr-1 noselect">{credits}</p>
                    <h3 className="noselect bottom-text">{title}</h3>
                </a>
            );
        };

        return (
            <Link
                to={Routes.weekendMissionDetails.replace(Routes.weekendMissionParam, seasonId)}
                className={classNames('col-12 col-xl-6 col-lg-12 col-md-12 col-sm-12 col-cs-12 weekend-mission-card pointer')}
                style={{ backgroundImage: `url(/assets/images/${imageName})` }}
            >
                <p className="mt-2 mr-1 noselect">{credits}</p>
                <h3 className="noselect bottom-text">{title}</h3>
            </Link>
        );
    }

    return (
        <DefaultAnimation>
            <HeadComponent title={i18next.t(LocaleKey.weekendMission)} />
            <NavBar title={i18next.t(LocaleKey.weekendMission)} />
            <div className="content no-spacing">
                <div className="container full">
                    <div className="row weekend-mission">
                        {weekendMissionCard('Season 2', 'weekendMission/Season2.jpg', 'stoz0r', WeekendMissions[0].id)}
                        {weekendMissionCard('Season 1', 'weekendMission/Season1.jpg', 'screenshot guy', WeekendMissions[1].id)}
                        {weekendMissionCard('NMS Wiki', 'weekendMission/wiki.jpg', 'cyberpunk2350', '', ExternalUrls.nmsWeekendMissionWiki)}
                    </div>
                </div>
            </div>
        </DefaultAnimation>
    );
}
