import classNames from 'classnames';
import i18next from 'i18next';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { HeadComponent } from '../../../components/core/headComponent';
import { NavBar } from '../../../components/core/navbar/navbar';
import * as Routes from '../../../constants/Route';
import { LocaleKey } from '../../../localization/LocaleKey';

import './weekendMissionMenu.scss';

interface IProps {
    history: any;
}

const WeekendMissionMenuPresenterUnconnected: React.FC<IProps> = (props: IProps) => {

    const weekendMissionCard = (title: string, imageName: string, credits: string, route?: string, external?: string) => {

        return (
            <div className={classNames('col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-cs-12 weekend-mission-card', { pointer: route != null })} style={{ backgroundImage: `url(/assets/images/${imageName})` }}
                onClick={() => {
                    if (route == null) return;
                    props.history.push({
                        pathname: route,
                        state: {
                            weekendMissionJson: LocaleKey.weekendMissionSeason1Json,
                            season: 'MP_PORTALQUEST',
                            level: 30,
                            maxLevel: 30,
                            minLevel: 1,
                        }
                    })
                }}>
                <p className="mt-2 mr-3 noselect">{credits}</p>
                <h3 className="noselect bottom-text">{title}</h3>
            </div>
        );
    }

    return (
        <>
            <HeadComponent title={i18next.t(LocaleKey.weekendMission)} />
            <NavBar title={i18next.t(LocaleKey.weekendMission)} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row weekend-mission">
                        {weekendMissionCard('Season 3', 'special/underConstruction.svg', '', Routes.weekendMissionDetails)}
                        {weekendMissionCard('Season 2', 'weekendMission/Season2.jpg', 'stoz0r')}
                        {weekendMissionCard('Season 1', 'weekendMission/Season1.jpg', 'screenshot guy')}
                        {weekendMissionCard('NMS Wiki', 'weekendMission/wiki.jpg', 'cyberpunk2350')}
                    </div>
                </div>
            </div>
        </>
    );
}

export const WeekendMissionMenuPresenter = withRouter(WeekendMissionMenuPresenterUnconnected);