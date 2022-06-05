import React, { ReactNode, useEffect, useState } from 'react';
import { translate } from '../../localization/Translate';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { PositiveButton } from '../../components/common/button/positiveButton';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { ImageContainer } from '../../components/common/tile/imageContainer';
import { TextContainer } from '../../components/common/tile/textContainer';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { BasicLink } from '../../components/core/link';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { IQuicksilverItemWithoutDepInj, QuicksilverItemListTile } from '../../components/tilePresenter/quicksilverListTile/quicksilverItemListTile';
import { QuicksilverRequiredItemListTile } from '../../components/tilePresenter/quicksilverListTile/quicksilverItemRequiredListTile';
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

    const renderQuickSilverContent = (qs: QuicksilverStore): ReactNode => {
        const customQuicksilverItemListTile = (props: QuicksilverItem, index: number) => {
            const customProps: IQuicksilverItemWithoutDepInj = { ...props, isDisabled: false, showPrice: true };
            return QuicksilverItemListTile(customProps, index);
        }

        const items: Array<QuicksilverItem> = qs.Items;

        if (qs.Name != null && qs.Icon != null) {
            return (
                <div key={items.map(i => i.ItemId).join(',')} data-id="QS-timepine-item">

                    <div className="generic-item-list row justify">
                        <div className="gen-item col-12">
                            <div data-id="QS-Special" className="gen-item-container qs-special" draggable={false}>
                                <ImageContainer Name={qs.Name} Icon={qs.Icon} />
                                <div className="gen-item-content-container">
                                    <TextContainer text={qs.Name} additionalCss="full" />
                                    <div className="quantity-container">{translate(LocaleKey.communityMission)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="generic-item-list row justify pt-3">
                        <div>{translate(LocaleKey.requiresTheFollowing)}</div>
                    </div>
                    <div className="generic-item-list row justify">
                        {
                            (qs.ItemsRequired ?? []).map((appId: string, index: number) => {
                                return (
                                    <div key={`generic-item ${index} ${appId}`} data-key={appId} className="gen-item col-12">
                                        <QuicksilverRequiredItemListTile
                                            Id={appId}
                                            Quantity={0}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            );
        }
        return (
            <div key={items.map(i => i.ItemId).join(',')} data-id="QS-timepine-item">
                <GenericListPresenter
                    list={items}
                    bootstrapClasses="col-12 qs-timeline"
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
                                ? translate(LocaleKey.futureCommunityMission)
                                : translate(LocaleKey.completedCommunityMission);
                            if (qs.MissionId === communityMission.missionId) {
                                status = translate(LocaleKey.inProgressCommunityMission);
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
                                    {renderQuickSilverContent(qs)}
                                </VerticalTimelineElement>
                            );
                        })
                    }
                </VerticalTimeline>
                <div className="col-12">
                    <PositiveButton additionalClass="customButton noselect">
                        <BasicLink href="https://nomanssky.fandom.com/wiki/Quicksilver_Synthesis_Companion">
                            <span style={{ color: 'black' }}>{translate(LocaleKey.viewMoreOnNmsWiki)}</span>
                        </BasicLink>
                    </PositiveButton>
                </div>
            </>
        );
    }

    const title = translate(LocaleKey.communityMission);
    return (
        <DefaultAnimation>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1 pb5">
                    <div className="row justify noselect" style={{ overflowX: 'hidden' }}>
                        {renderMainContent()}
                    </div>
                </div>
            </div>
        </DefaultAnimation>
    );
}

export const CommunityMissionTimeline = withServices<IWithoutDepInj, IWithDepInj>(
    CommunityMissionTimelineUnconnected,
    (services: IDependencyInjection) => ({
        apiService: services.apiService,
        dataJsonService: services.dataJsonService,
    })
);