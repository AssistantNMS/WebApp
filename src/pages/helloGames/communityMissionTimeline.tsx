import i18next from 'i18next';
import React, { ReactNode, useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { PositiveButton } from '../../components/common/button/positiveButton';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { BasicLink } from '../../components/core/link';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { IQuicksilverItemWithoutDepInj, QuicksilverItemListTile } from '../../components/tilePresenter/quicksilverListTile/quicksilverItemListTile';
import { NetworkState } from '../../constants/NetworkState';
import { QuicksilverItem, QuicksilverStore } from '../../contracts/data/quicksilver';
import { CommunityMissionViewModel } from '../../contracts/generated/Model/HelloGames/communityMissionViewModel';
import { anyObject } from '../../helper/typescriptHacks';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { ApiService } from '../../services/api/ApiService';
import { DataJsonService } from '../../services/json/DataJsonService';

interface IWithDepInj {
    apiService: ApiService;
    dataJsonService: DataJsonService;
}
interface IWithoutDepInj {
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

export const CommunityMissionTimelineUnconnected: React.FC<IProps> = (props: IProps) => {
    const [status, setStatus] = useState(NetworkState.Loading);
    const [quicksilverStoreItems, setQuicksilverStoreItems] = useState<Array<QuicksilverStore>>([]);
    const [communityMission, setCommunityMission] = useState<CommunityMissionViewModel>(anyObject);

    useEffect(() => {
        fetchQuicksilverItems();
        // eslint-disable-next-line
    }, []);

    const fetchQuicksilverItems = async () => {
        const communityMissionResult = await props.apiService.getCommunityMission();
        const quickSilverStoreItemResult = await props.dataJsonService.getQuicksilverStore();

        if (communityMissionResult.isSuccess === false || quickSilverStoreItemResult.isSuccess === false) {
            setStatus(NetworkState.Error);
            return;
        }
        const orderedList = quickSilverStoreItemResult.value
            .sort((a: QuicksilverStore, b: QuicksilverStore) =>
                b.MissionId - a.MissionId
            );

        setCommunityMission(communityMissionResult.value);
        setQuicksilverStoreItems(orderedList);
        setStatus(NetworkState.Success);
    }

    const renderQuickSilverContent = (items: Array<QuicksilverItem>): ReactNode => {
        const customQuicksilverItemListTile = (props: QuicksilverItem, index: number) => {
            const customProps: IQuicksilverItemWithoutDepInj = { ...props, isDisabled: false };
            return QuicksilverItemListTile(customProps, index);
        }

        return (
            <div key={items.map(i => i.ItemId).join(',')} className="">
                <GenericListPresenter
                    list={items}
                    bootstrapClasses="col-12"
                    presenter={customQuicksilverItemListTile}
                    isCentered={true}
                />
            </div>
        );
    }

    const renderMainContent = () => {
        if (status === NetworkState.Loading) return <SmallLoading />;
        if (status === NetworkState.Error) return (<Error />);

        return (
            <>
                <VerticalTimeline>
                    {
                        quicksilverStoreItems.map((qs: QuicksilverStore) => {
                            let status = qs.MissionId > communityMission.missionId
                                ? i18next.t(LocaleKey.futureCommunityMission)
                                : i18next.t(LocaleKey.completedCommunityMission);
                            if (qs.MissionId === communityMission.missionId) {
                                status = i18next.t(LocaleKey.inProgressCommunityMission);
                            }
                            return (
                                <VerticalTimelineElement
                                    key={qs.MissionId}
                                    className="vertical-timeline-element"
                                    contentStyle={{ background: 'rgba(0,0,0,0.15)', color: '#fff' }}
                                    contentArrowStyle={{ borderRight: '1px solid rgba(0,0,0,0.15)' }}
                                    date={status}
                                    iconStyle={{ background: '#80cbc4', color: '#000' }}
                                    icon={<p style={{ paddingTop: '1em' }}>{qs.MissionId}</p>}
                                >
                                    {renderQuickSilverContent(qs.Items)}
                                </VerticalTimelineElement>
                            );
                        })
                    }
                </VerticalTimeline>
                <div className="col-12">
                    <PositiveButton additionalClass="customButton noselect">
                        <BasicLink href="https://nomanssky.fandom.com/wiki/Quicksilver_Synthesis_Companion">
                            <span style={{ color: 'black' }}>{i18next.t(LocaleKey.viewMoreOnNmsWiki)}</span>
                        </BasicLink>
                    </PositiveButton>
                </div>
            </>
        );
    }

    const title = i18next.t(LocaleKey.communityMission);
    return (
        <>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1 pb5">
                    <div className="row justify noselect" style={{ overflowX: 'hidden' }}>
                        {renderMainContent()}
                    </div>
                </div>
            </div>
        </>
    );
}

export const CommunityMissionTimeline = withServices<IWithoutDepInj, IWithDepInj>(
    CommunityMissionTimelineUnconnected,
    (services: IDependencyInjection) => ({
        apiService: services.apiService,
        dataJsonService: services.dataJsonService,
    })
);