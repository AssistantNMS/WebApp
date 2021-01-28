import classNames from 'classnames';
import i18next from 'i18next';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { HeadComponent } from '../../../components/core/headComponent';
import { NavBar } from '../../../components/core/navbar/navbar';
import { ExternalUrls } from '../../../constants/ExternalUrls';
import * as Routes from '../../../constants/Route';
import { LocaleKey } from '../../../localization/LocaleKey';

import './weekendMissionMenu.scss';

interface IProps {
    history: any;
}

const WeekendMissionMenuPresenterUnconnected: React.FC<IProps> = (props: IProps) => {

    const seasonComingSoon = {
        isDisabled: true,
        // weekendMissionJson: LocaleKey.weekendMissionSeason3Json,
        // season: 'MP_PORTALQUEST',
        // level: 30,
        // maxLevel: 30,
        // minLevel: 1,
    };

    const season2Obj = {
        weekendMissionJson: LocaleKey.weekendMissionSeason2Json,
        season: 'MP_PORTALQUEST',
        level: 45,
        maxLevel: 45,
        minLevel: 31,
    };

    const season1Obj = {
        weekendMissionJson: LocaleKey.weekendMissionSeason1Json,
        season: 'MP_PORTALQUEST',
        level: 30,
        maxLevel: 30,
        minLevel: 1,
    };


    const weekendMissionCard = (title: string, imageName: string, credits: string, state: any, external?: string) => {

        if (external != null) {
            return (
                <a href={external} target="_blank" rel="noopener noreferrer" className={classNames('col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-cs-12 weekend-mission-card')} style={{ backgroundImage: `url(/assets/images/${imageName})` }}>
                    <p className="mt-2 mr-1 noselect">{credits}</p>
                    <h3 className="noselect bottom-text">{title}</h3>
                </a>
            );
        };

        return (
            <div className={classNames('col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-cs-12 weekend-mission-card', { pointer: !state.isDisabled })} style={{ backgroundImage: `url(/assets/images/${imageName})` }}
                onClick={() => {
                    if (state.isDisabled) return;
                    props.history.push({
                        pathname: Routes.weekendMissionDetails,
                        state,
                    })
                }}>
                <p className="mt-2 mr-1 noselect">{credits}</p>
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
                        {weekendMissionCard('Season 3', 'special/underConstruction.svg', '', seasonComingSoon)}
                        {weekendMissionCard('Season 2', 'weekendMission/Season2.jpg', 'stoz0r', season2Obj)}
                        {weekendMissionCard('Season 1', 'weekendMission/Season1.jpg', 'screenshot guy', season1Obj)}
                        {weekendMissionCard('NMS Wiki', 'weekendMission/wiki.jpg', 'cyberpunk2350', {}, ExternalUrls.nmsWeekendMissionWiki)}
                    </div>
                </div>
            </div>
        </>
    );
}

export const WeekendMissionMenuPresenter = withRouter(WeekendMissionMenuPresenterUnconnected);