import React from 'react';
import * as routes from '../../constants/Route';
import { ExistingExpeditions, IExistingExpeditions } from '../../constants/Expedition';
import { ProgressBar } from '../../components/common/progressBar/progressBar';
import { Error } from '../../components/core/error/error';
import { LazyLoadImage } from '../../components/core/lazyLoadImage/lazyLoadImage';
import { SmallLoading } from '../../components/core/loading/loading';
import { NetworkState } from '../../constants/NetworkState';
import { ExpeditionSeasonViewModel } from '../../contracts/generated/Model/HelloGames/expeditionSeasonViewModel';
import { guideFormatDate, friendlyTimeLeft, percentageProgress } from '../../helper/dateHelper';
import { useHistory } from 'react-router-dom';
import { ExpeditionSeason } from '../../contracts/helloGames/expeditionSeason';
import { AppImage } from '../../constants/AppImage';
import { PortalGlyphGridDisplay } from '../../components/common/portal/portalGlyphGrid';
import i18next from 'i18next';
import { LocaleKey } from '../../localization/LocaleKey';

interface ICurrentExpeditionSeasonHeaderProps {
    seasonDetails?: ExpeditionSeasonViewModel;
    networkState: NetworkState;
}

export const CurrentExpeditionSeasonHeader: React.FC<ICurrentExpeditionSeasonHeaderProps> = (props: ICurrentExpeditionSeasonHeaderProps) => {

    if (props.networkState === NetworkState.Loading)
        return (<SmallLoading />);

    if (props.networkState === NetworkState.Error || props.seasonDetails == null)
        return (<Error />);

    return (
        <div className="row">
            <div className="col-12 col-lg-2 col-md-2 col-sm-4 col-xs-3 image-container generic-item-image-container">
                <LazyLoadImage src={props.seasonDetails.imageUrl ?? ''} alt={props.seasonDetails.name} style={{ width: '100%', maxWidth: '250px' }} />
            </div>
            <div className="col-12 col-lg-10 col-md-10 col-sm-8 col-xs-9">
                <h2>{props.seasonDetails.name}</h2>
                <ProgressBar
                    percentage={percentageProgress(props.seasonDetails.startDate, props.seasonDetails.endDate)}
                    additionalText={friendlyTimeLeft(new Date(), props.seasonDetails.endDate)}
                />
                <div className="mt-2em">
                    <h4 style={{ display: 'inline-block', float: 'left' }}>{guideFormatDate(props.seasonDetails.startDate)}</h4>
                    <h4 style={{ display: 'inline-block', float: 'right' }}>{guideFormatDate(props.seasonDetails.endDate)}</h4>
                </div>
            </div>
        </div>
    );
}

interface ISeasonExpeditionCardsProps {
}

export const SeasonExpeditionCards: React.FC<ISeasonExpeditionCardsProps> = (props: ISeasonExpeditionCardsProps) => {
    return (
        <div className="row">
            {
                ExistingExpeditions.map((data) => {
                    return <SeasonExpeditionCard details={data} />
                })
            }
        </div>
    );
}

interface ISeasonExpeditionCardProps {
    details: IExistingExpeditions;
}

export const SeasonExpeditionCard: React.FC<ISeasonExpeditionCardProps> = (props: ISeasonExpeditionCardProps) => {
    const history = useHistory();

    const navigateToExpSeason = (seasId: string) => () => {
        history.push(`${routes.seasonExpedition}/${seasId}`);
    }
    return (
        <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="card exp pointer noselect" onClick={navigateToExpSeason(`seas-${props.details.seasonNum}`)} draggable={false}>
                <div className="card-image exp">
                    <img src={`/${props.details.background}`} draggable={false} alt={props.details.name} />
                </div>

                <img src={`/${props.details.icon}`} className="card-image-overlay" draggable={false} alt={props.details.name + ' icon'} />

                <div className="card-top-right-content">
                    <span>Season {props.details.seasonNum}</span>
                </div>

                <div className="card-content row">
                    <div className="col-12">
                        <div className="user-details exp">
                            <div className="user-name">
                                <h3 style={{ width: '100%', textAlign: 'center' }}>{props.details.name}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


interface IExpeditionSeasonHeaderProps {
    seasonDetails?: ExpeditionSeason;
    useAltGlyphs: boolean;
    networkState: NetworkState;
}

export const ExpeditionSeasonHeader: React.FC<IExpeditionSeasonHeaderProps> = (props: IExpeditionSeasonHeaderProps) => {

    if (props.networkState === NetworkState.Loading)
        return (<SmallLoading />);

    if (props.networkState === NetworkState.Error || props.seasonDetails == null)
        return (<Error />);

    return (
        <div className="row expedition-season">
            <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-3">
                <LazyLoadImage src={`/${AppImage.base}${props.seasonDetails.Icon}`} alt={props.seasonDetails.Title} style={{ width: '100%', maxWidth: '250px' }} />
                <h4>{i18next.t(LocaleKey.startDate)}:&nbsp;{guideFormatDate(props.seasonDetails.StartDate)}</h4>
                <h4>{i18next.t(LocaleKey.endDate)}:&nbsp;{guideFormatDate(props.seasonDetails.EndDate)}</h4>
            </div>
            <div className="col-12 col-lg-9 col-md-9 col-sm-12 col-xs-9">
                <h2>{props.seasonDetails.Title}</h2>
                <PortalGlyphGridDisplay
                    codes={props.seasonDetails.PortalCode.split('').map(p => parseInt(p, 16)) || []}
                    columnMultiplier={2}
                    useAltGlyphs={props.useAltGlyphs}
                />
            </div>
        </div>
    );
}