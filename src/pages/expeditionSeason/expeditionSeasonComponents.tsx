import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { translate } from '../../localization/Translate';
import { PositiveButton } from '../../components/common/button/positiveButton';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { PortalGlyphGridDisplay } from '../../components/common/portal/portalGlyphGrid';
import { ProgressBar } from '../../components/common/progressBar/progressBar';
import { ImageContainer } from '../../components/common/tile/imageContainer';
import { Error } from '../../components/core/error/error';
import { LazyLoadImage } from '../../components/core/lazyLoadImage/lazyLoadImage';
import { SmallLoading } from '../../components/core/loading/loading';
import { ExpeditionSeasonRewardsOnlyTile } from '../../components/tilePresenter/rewardTile/expeditionSeasonRewardsOnlyTile';
import { ExpeditionSeasonRewardTile } from '../../components/tilePresenter/rewardTile/expeditionSeasonRewardTile';
import { AppImage } from '../../constants/AppImage';
import { NetworkState } from '../../constants/NetworkState';
import { ExpeditionSeasonViewModel } from '../../contracts/generated/Model/HelloGames/expeditionSeasonViewModel';
import { ExpeditionSeason, ExpeditionSeasonPhase, ExpeditionSeasonMilestone, ExpeditionSeasonReward, MilestoneType } from '../../contracts/helloGames/expeditionSeason';
import { friendlyTimeLeft, formatDate, percentageProgress } from '../../helper/dateHelper';
import { shouldListBeCentered } from '../../helper/mathHelper';
import { LocaleKey } from '../../localization/LocaleKey';

interface ICurrentExpeditionSeasonHeaderProps {
    seasonDetails?: ExpeditionSeasonViewModel;
    networkState: NetworkState;
}

export const CurrentExpeditionSeasonHeader: React.FC<ICurrentExpeditionSeasonHeaderProps> = (props: ICurrentExpeditionSeasonHeaderProps) => {

    if (props.networkState === NetworkState.Loading)
        return (<><SmallLoading maxWidth="50px" hideText={true} /><hr /></>);

    if (props.networkState === NetworkState.Error || props.seasonDetails == null)
        return (<span></span>);

    return (
        <>
            <div data-id="CurrentExpeditionSeasonHeader" className="row noselect">
                <div className="col-12 col-lg-2 col-md-2 col-sm-4 col-xs-3 image-container generic-item-image-container">
                    <LazyLoadImage src={props.seasonDetails.imageUrl ?? ''} alt={props.seasonDetails.name} style={{ width: '100%', maxWidth: '200px' }} />
                </div>
                <div className="col-12 col-lg-10 col-md-10 col-sm-8 col-xs-9">
                    <h2>{props.seasonDetails.name}</h2>
                    <ProgressBar
                        percentage={percentageProgress(props.seasonDetails.startDate, props.seasonDetails.endDate)}
                        additionalText={friendlyTimeLeft(new Date(props.seasonDetails.startDate), new Date(props.seasonDetails.endDate))}
                    />
                    <div className="mt-2em">
                        <h4 style={{ display: 'inline-block', float: 'left' }}>{formatDate(props.seasonDetails.startDate, 'YYYY-MM-DD')}</h4>
                        <h4 style={{ display: 'inline-block', float: 'right' }}>{formatDate(props.seasonDetails.endDate, 'YYYY-MM-DD')}</h4>
                    </div>
                </div>
            </div>
            <hr />
        </>
    );
}

interface IExpeditionSeasonHeaderProps {
    seasonDetails?: ExpeditionSeason;
    useAltGlyphs: boolean;
    networkState: NetworkState;
    setDetailPane: (newNode: ReactNode, snapPoint: number) => void;
}

export const ExpeditionSeasonHeader: React.FC<IExpeditionSeasonHeaderProps> = (props: IExpeditionSeasonHeaderProps) => {

    if (props.networkState === NetworkState.Loading)
        return (<SmallLoading />);

    if (props.networkState === NetworkState.Error || props.seasonDetails == null)
        return (<Error />);

    return (
        <div data-id="ExpeditionSeasonHeader" className="row expedition-season-header noselect">
            <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-3">
                <LazyLoadImage src={`/${AppImage.base}${props.seasonDetails.Icon}`} alt={props.seasonDetails.Title} style={{ width: '100%', maxWidth: '250px' }} />
                <h4><b>{translate(LocaleKey.startDate)}:</b>&nbsp;{formatDate(props.seasonDetails.StartDate, 'YYYY-MM-DD')}</h4>
                <h4><b>{translate(LocaleKey.endDate)}:</b>&nbsp;{formatDate(props.seasonDetails.EndDate, 'YYYY-MM-DD')}</h4>
            </div>
            <div className="col-12 col-lg-9 col-md-9 col-sm-12 col-xs-9">
                <h2>{props.seasonDetails.Title}</h2>
                <PortalGlyphGridDisplay
                    codes={(props.seasonDetails?.PortalCode ?? []).split('').map(p => parseInt(p, 16)) || []}
                    columnMultiplier={2}
                    useAltGlyphs={props.useAltGlyphs}
                />
            </div>
            {
                (props.seasonDetails?.Rewards != null && props.seasonDetails?.Rewards?.length > 0) &&
                (
                    <>
                        <div className="col-12">
                            <hr className="mt-2em" />
                        </div>
                        <div className="col-12">
                            <h3 style={{ margin: 0 }}>{translate(LocaleKey.rewards)}</h3>
                        </div>
                        <div className="col-12 mt-1em mb-1em">
                            <GenericListPresenter
                                isCentered={shouldListBeCentered(props.seasonDetails.Rewards.length)}
                                list={props.seasonDetails.Rewards}
                                presenter={ExpeditionSeasonRewardTile}
                                identifier={(item: ExpeditionSeasonReward) => item.Id}
                            />
                        </div>
                    </>
                )
            }
        </div>
    );
}


interface IExpeditionSeasonPhaseProps {
    networkState: NetworkState;
    phases?: Array<ExpeditionSeasonPhase>;
    setDetailPane: (newNode: ReactNode, snapPoint: number) => void;
}

export const ExpeditionSeasonPhases: React.FC<IExpeditionSeasonPhaseProps> = (props: IExpeditionSeasonPhaseProps) => {

    if (props.networkState === NetworkState.Loading)
        return (<SmallLoading />);

    if (props.networkState === NetworkState.Error || props.phases == null)
        return (<Error />);

    return (
        <div data-id="ExpeditionSeasonPhases" className="row expedition-season-phases">
            <div className="col-12">
                {
                    props.phases.map((phase: ExpeditionSeasonPhase, index: number) => (
                        <ExpeditionSeasonPhaseWithMilestones
                            key={`${phase?.Id}-${index}`}
                            phase={phase}
                            setDetailPane={props.setDetailPane}
                        />
                    ))
                }
            </div>
        </div>
    );
}

interface IExpeditionSeasonPhaseWithMilestonesProps {
    phase: ExpeditionSeasonPhase;
    setDetailPane: (newNode: ReactNode, snapPoint: number) => void;
}

export const ExpeditionSeasonPhaseWithMilestones: React.FC<IExpeditionSeasonPhaseWithMilestonesProps> = (props: IExpeditionSeasonPhaseWithMilestonesProps) => {
    if (props.phase == null) return (<span></span>);

    const disabled = (props.phase.Rewards.length < 1);

    const openDetailPane = () => {
        if (disabled) return;
        if (props.phase == null) return;

        props.setDetailPane(
            <GenericListPresenter
                isCentered={shouldListBeCentered(props.phase.Rewards.length)}
                list={props.phase.Rewards}
                presenter={ExpeditionSeasonRewardTile}
                identifier={(item: ExpeditionSeasonReward) => item.Id}
            />,
            props.phase.Rewards.length > 6 ? 600 : 400,
        );
    }

    return (
        <div data-id="ExpeditionSeasonPhaseWithMilestones" className="row expedition-season-phase noselect">
            <div className="col-12 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                <LazyLoadImage src={`/${AppImage.base}${props.phase.Icon}`} alt={props.phase.Title} className="phase-icon" style={{ width: '100%', maxWidth: '250px' }} />
                <h3 className="phase-title">{props.phase.Title}</h3>
                <PositiveButton
                    icon="info"
                    iconPosition="left"
                    additionalClass="mt-2em mb-2em"
                    disabled={disabled}
                    onClick={openDetailPane}
                >
                    <span>{translate(LocaleKey.rewards).toString()}</span>
                </PositiveButton>
            </div>
            <div className="col-12 col-lg-9 col-md-12 col-sm-12 col-xs-12">
                {
                    (props.phase.Milestones ?? []).map((milestone: ExpeditionSeasonMilestone, index: number) => (
                        <ExpeditionSeasonPhaseMilestone
                            key={`${milestone?.Id}-${index}`}
                            milestone={milestone}
                            setDetailPane={props.setDetailPane}
                        />
                    ))
                }
            </div>
        </div>
    );
}

interface IExpeditionSeasonPhaseMilestonesProps {
    milestone?: ExpeditionSeasonMilestone;
    setDetailPane: (newNode: ReactNode, snapPoint: number) => void;
}

export const ExpeditionSeasonPhaseMilestone: React.FC<IExpeditionSeasonPhaseMilestonesProps> = (props: IExpeditionSeasonPhaseMilestonesProps) => {
    if (props.milestone == null) return (<span></span>);

    const disabled = (props.milestone.Rewards.length < 1);

    const openDetailPane = () => {
        if (disabled) return;
        if (props.milestone == null) return;

        props.setDetailPane(
            <div className="milestone-reward-content">
                <GenericListPresenter
                    isCentered={shouldListBeCentered(props.milestone.Rewards.length)}
                    list={props.milestone.Rewards}
                    presenter={ExpeditionSeasonRewardTile}
                    identifier={(item: ExpeditionSeasonReward) => item.Id}
                />
                {/* <h3 className="hidden-in-mobile milestone-reward-title">{props.milestone.Title}</h3> */}
                <img
                    src={`/assets/images/${props.milestone.Icon}`}
                    className="hidden-in-mobile milestone-patch"
                    alt={props.milestone.Title}
                    draggable={false}
                />
            </div>,
            props.milestone.Rewards.length > 6 ? 600 : 400,
        );
    }

    const isEncrypted = props.milestone?.Encryption != null;
    const classes = classNames(
        'expedition-season-milestone noselect',
        {
            'encrypted': isEncrypted,
            'pointer': !disabled
        }
    );
    // const encDescrip = props.milestone?.Encryption?.Description ?? '';

    return (
        <div data-id="ExpeditionSeasonPhaseMilestone" className={classes}>
            <div className="milestone-content" onClick={openDetailPane}>
                <ImageContainer
                    Icon={props.milestone.Icon}
                    Name={props.milestone.Title}
                />
                <div className="text-container">
                    <h3>{props.milestone.Title}</h3>
                    <p>{props.milestone.Description}</p>
                </div>
                <div className="text-container rewards hidden-in-mobile">
                    <ExpeditionSeasonRewardsOnlyTile rewards={props.milestone.Rewards} />
                </div>
                {
                    (disabled === false) &&
                    <div className="rewards-container">
                        <i className="material-icons x2 pointer">info</i>
                    </div>
                }
                {
                    (props.milestone.Type === MilestoneType.Optional) &&
                    <div className="middle-ribbon">Optional</div>
                }
            </div>
            {
                isEncrypted && (
                    <div className="milestone-encr-content noselect ">
                        <ImageContainer
                            Icon={props.milestone.Encryption.Icon}
                            Name={props.milestone?.Encryption?.Title ?? 'encrypted'}
                        />
                        <div className="text-container full">
                            <h3>{props.milestone?.Encryption?.Title}</h3>
                            {/* <DecriptionRegexHighlightText
                                orig={encDescrip.replace('%DESC%', '')}
                            /> */}
                        </div>
                    </div>
                )
            }
        </div>
    );
}