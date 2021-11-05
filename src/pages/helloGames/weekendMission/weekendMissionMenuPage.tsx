import classNames from 'classnames';
import i18next from 'i18next';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { HeadComponent } from '../../../components/core/headComponent';
import { NavBar } from '../../../components/core/navbar/navbar';
import { ExternalUrls } from '../../../constants/ExternalUrls';
import * as Routes from '../../../constants/Route';
import { WeekendSeason2, WeekendSeason1 } from '../../../constants/WeekendMission';
import { LocaleKey } from '../../../localization/LocaleKey';
import './weekendMissionMenu.scss';

interface IProps {
    history: any;
}

const WeekendMissionMenuPresenterUnconnected: React.FC<IProps> = (props: IProps) => {

    const weekendMissionCard = (title: string, imageName: string, credits: string, state: any, external?: string) => {
        if (external != null) {
            return (
                <a href={external} target="_blank" rel="noopener noreferrer" className={classNames('col-12 col-xl-6 col-lg-12 col-md-12 col-sm-12 col-cs-12 weekend-mission-card')} style={{ backgroundImage: `url(/assets/images/${imageName})` }}>
                    <p className="mt-2 mr-1 noselect">{credits}</p>
                    <h3 className="noselect bottom-text">{title}</h3>
                </a>
            );
        };

        return (
            <div className={classNames('col-12 col-xl-6 col-lg-12 col-md-12 col-sm-12 col-cs-12 weekend-mission-card', { pointer: !state.isDisabled })} style={{ backgroundImage: `url(/assets/images/${imageName})` }}
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
            <div className="content no-spacing">
                <div className="container full">
                    <div className="row weekend-mission">
                        {weekendMissionCard('Season 2', 'weekendMission/Season2.jpg', 'stoz0r', WeekendSeason2)}
                        {weekendMissionCard('Season 1', 'weekendMission/Season1.jpg', 'screenshot guy', WeekendSeason1)}
                        {weekendMissionCard('NMS Wiki', 'weekendMission/wiki.jpg', 'cyberpunk2350', {}, ExternalUrls.nmsWeekendMissionWiki)}
                    </div>
                </div>
            </div>
        </>
    );
}

export const WeekendMissionMenuPresenter = withRouter(WeekendMissionMenuPresenterUnconnected);