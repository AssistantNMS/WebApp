import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { translate } from '../../localization/Translate';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { ProgressBar } from '../../components/common/progressBar/progressBar';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { IQuicksilverItemWithoutDepInj, QuicksilverItemListTile } from '../../components/tilePresenter/quicksilverListTile/quicksilverItemListTile';
import { RequiredItemListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemListTile';
import { AppImage } from '../../constants/AppImage';
import { NetworkState } from '../../constants/NetworkState';
import { communityMissionTimeline } from '../../constants/Route';
import { QuicksilverItem, QuicksilverStore } from '../../contracts/data/quicksilver';
import { CommunityMissionViewModel } from '../../contracts/generated/communityMissionViewModel';
import { RequiredItem } from '../../contracts/RequiredItem';
import { LocaleKey } from '../../localization/LocaleKey';
import { CommunityMissionProgressListTile } from '../../components/tilePresenter/community/communityLinkListTile';

interface IProps {
    // Container State
    title: string;
    communityMission: CommunityMissionViewModel;
    quicksilverStoreItems: Array<QuicksilverStore>;
    status: NetworkState;
}

export const CommunityMissionPresenter: React.FC<IProps> = (props: IProps) => {
    const handleLoadingOrError = (displayFunc: (props: IProps) => ReactNode): ReactNode => {
        if (props.status === NetworkState.Loading) return <SmallLoading />;
        if (props.status === NetworkState.Error ||
            !props.communityMission ||
            !props.communityMission.missionId) {
            return (<Error />);
        }
        return displayFunc(props);
    }

    const displayCommunityMissionData = (communityMission: CommunityMissionViewModel, quicksilverRewards: Array<QuicksilverStore>): ReactNode => {
        return (
            <>
                <div className="row noselect">
                    <div className="col-12">
                        <h3>
                            {translate(LocaleKey.researchProgress)}<br />
                            {communityMission.currentTier} / {communityMission.totalTiers}
                        </h3>
                    </div>
                    <div className="col-12">
                        <ProgressBar percentage={communityMission.percentage} />
                    </div>
                </div>
                <div className="row noselect">
                    <div className="col-12">
                        {
                            translate(LocaleKey.communityMissionContent).split('\n').map((text: string, index: number) => (
                                <h3 key={`communityMissionContent-${index}`}>
                                    {text}
                                </h3>
                            ))
                        }
                    </div>
                </div>
                <div className="generic-item-list row justify noselect">
                    <div key="community-mission-progress" className="gen-item col-xl-5 col-lg-7 col-md-8 col-sm-12 col-xs-12">
                        <CommunityMissionProgressListTile />
                    </div>
                </div>
                {displayQuicksilverData(communityMission, quicksilverRewards)}
                {displayQuicksilverData({ ...communityMission, missionId: communityMission.missionId + 1, currentTier: 0 }, quicksilverRewards, LocaleKey.nextCommunityMission)}

                <div className="row justify noselect">
                    <Link to={communityMissionTimeline} draggable={false}
                        className="customButton center full mt-3em mh-1em noselect">
                        <span style={{ color: 'black' }}>{translate(LocaleKey.prevCommunityMission)}</span>
                    </Link>
                </div>
            </>
        );
    }

    const displayQuicksilverData = (communityMission: CommunityMissionViewModel, quicksilverRewards: Array<QuicksilverStore>, title?: LocaleKey) => {
        const qsRewards = quicksilverRewards.filter(qs => qs.MissionId === communityMission.missionId);
        const qsReward = (qsRewards != null && qsRewards.length > 0) ? qsRewards[0] : null;

        const customQuicksilverItemListTile = (communityMission: CommunityMissionViewModel) => (props: QuicksilverItem, index: number) => {
            let isDisabled = props.Tier >= communityMission.currentTier;
            if (props.Tier === communityMission.currentTier && communityMission.percentage > 99) {
                isDisabled = false;
            }
            const customProps: IQuicksilverItemWithoutDepInj = { ...props, isDisabled };
            return QuicksilverItemListTile(customProps, index);
        }

        const customRequiredItemListTile = (communityMission: CommunityMissionViewModel) => (appId: string, index: number) => {
            const customProps: RequiredItem = {
                Id: appId,
                Quantity: 0,
            };
            return RequiredItemListTile(customProps);
        }

        let localTitle: string | undefined = title !== null
            ? translate(title!)
            : title;
        if (qsReward?.Name != null) {
            localTitle = qsReward?.Name;
        }

        return (
            <>
                {
                    localTitle &&
                    <>
                        <hr />
                        <h3 className="noselect">
                            {
                                (qsReward?.Icon != null) &&
                                <span>
                                    <img src={'/' + AppImage.base() + qsReward.Icon} alt="special community mission" height="50px" />
                                    &nbsp;&nbsp;
                                </span>
                            }
                            {localTitle}
                        </h3>
                    </>
                }
                <div className="row noselect pt-3">
                    <div className="col-12">
                        <GenericListPresenter
                            list={qsReward?.Items ?? []}
                            presenter={customQuicksilverItemListTile(communityMission)}
                            identifier={(comM: QuicksilverItem) => comM.ItemId}
                            isCentered={true}
                        />
                    </div>
                </div>
                {
                    ((qsReward?.ItemsRequired ?? []).length > 0) &&
                    <div className="row noselect">
                        <div className="col-12 pb-2">{translate(LocaleKey.requiresTheFollowing)}</div>
                        <div className="col-12 pb-3">
                            <GenericListPresenter
                                list={qsReward?.ItemsRequired ?? []}
                                presenter={customRequiredItemListTile(communityMission)}
                                identifier={(appId: string) => appId}
                                isCentered={true}
                            />
                        </div>
                    </div>
                }
            </>
        );
    }

    return (
        <DefaultAnimation>
            <HeadComponent title={props.title} />
            <NavBar title={props.title} />
            <div className="content">
                <div className="container full pt1 pb5">
                    {
                        handleLoadingOrError((localProps: IProps) =>
                            displayCommunityMissionData(localProps.communityMission, localProps.quicksilverStoreItems)
                        )
                    }
                </div>
            </div>
        </DefaultAnimation>
    );
}
