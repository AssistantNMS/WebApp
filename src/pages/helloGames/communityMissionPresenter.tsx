import i18next from 'i18next';
import React, { ReactNode } from 'react';

import { ProgressBar } from '../../components/common/progressBar/progressBar';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { Error } from '../../components/core/error/error';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { CommunityMissionViewModel } from '../../contracts/generated/communityMissionViewModel';
import { LocaleKey } from '../../localization/LocaleKey';
import { QuicksilverItem, QuicksilverStore } from '../../contracts/data/quicksilver';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { IQuicksilverItemWithoutDepInj, QuicksilverItemListTile } from '../../components/tilePresenter/quicksilverListTile/quicksilverItemListTile';

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
                            {i18next.t(LocaleKey.researchProgress)}<br />
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
                            i18next.t(LocaleKey.communityMissionContent).split('\n').map((text: string, index: number) => (
                                <h3 key={`communityMissionContent-${index}`}>
                                    {text}
                                </h3>
                            ))
                        }
                    </div>
                </div>
                {displayQuicksilverData(communityMission, quicksilverRewards)}
                {displayQuicksilverData({ ...communityMission, missionId: communityMission.missionId + 1, currentTier: 0 }, quicksilverRewards, LocaleKey.nextCommunityMission)}
            </>
        );
    }

    const displayQuicksilverData = (communityMission: CommunityMissionViewModel, quicksilverRewards: Array<QuicksilverStore>, title?: LocaleKey) => {
        const qsRewards = quicksilverRewards.filter(qs => qs.MissionId === communityMission.missionId);
        const qsReward = (qsRewards != null && qsRewards.length > 0) ? qsRewards[0] : null;
        if (qsReward == null) return null;

        const customQuicksilverItemListTile = (communityMission: CommunityMissionViewModel) => (props: QuicksilverItem, index: number) => {
            let isDisabled = props.Tier >= communityMission.currentTier;
            if (props.Tier === communityMission.currentTier && communityMission.percentage > 99) {
                isDisabled = false;
            }
            const customProps: IQuicksilverItemWithoutDepInj = { ...props, isDisabled };
            return QuicksilverItemListTile(customProps, index);
        }

        return (
            <>
                {
                    title &&
                    <>
                        <hr />
                        <h3 className="noselect">{i18next.t(title)}</h3>
                    </>
                }
                <div className="row noselect pt-3">
                    <div className="col-12">
                        <GenericListPresenter
                            list={qsReward.Items}
                            presenter={customQuicksilverItemListTile(communityMission)}
                            isCentered={true}
                        />
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
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
        </>
    );
}
