import React, { useEffect, useRef, useState } from 'react';

import { translate } from '../../localization/Translate';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { CommunitySearchViewModel } from '../../contracts/other/communitySearchViewModel';
import { CommunitySearchChipColourViewModel } from '../../contracts/other/communitySearchChipColourViewModel';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { ApiService } from '../../services/api/ApiService';
import { CommunitySearchListTile } from '../../components/tilePresenter/community/communitySearchListTile';
import { SearchBar } from '../../components/common/searchBar';
import { CommunitySearchBottomModalSheet } from '../../components/tilePresenter/community/communitySearchBottomModalSheet';
import { SegmentedControl } from '../../components/common/segmentedControl';
import { ContributorComponent } from './contributorComponents';
import { ContributorListTile, DonatorListTile } from '../../components/tilePresenter/contributorListTile';
import { AssistantAppsApiService } from '../../services/api/AssistantAppsApiService';

interface IWithDepInj {
    apiService: ApiService;
    assistantAppsApiService: AssistantAppsApiService;
}
interface IWithoutDepInj { }
interface IProps extends IWithDepInj, IWithoutDepInj { }


export const ContributorsPageUnconnected: React.FC<IProps> = (props: IProps) => {
    const options: any = [
        {
            title: LocaleKey.contributors,
            ref: useRef(),
        },
        {
            title: LocaleKey.translators,
            ref: useRef(),
        },
        {
            title: LocaleKey.donation,
            ref: useRef(),
        },
    ];

    const [selectedOption, setSelectedOption] = useState<string>(options[0].title);

    const title = translate(LocaleKey.contributors);
    return (
        <DefaultAnimation>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div data-id="CommunityLinks" className="content">
                <div className="container full pt1">
                    <div className="row justify mb-1em">
                        <div className="col-12 col-xl-6 col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <SegmentedControl
                                name="typeOfContributors"
                                controlRef={useRef()}
                                defaultIndex={options.findIndex((opt: any) => opt.title === selectedOption)}
                                options={options.map((opt: any) => ({
                                    label: translate(opt.title),
                                    value: opt.title,
                                    ref: opt.ref,
                                }))}
                                callback={(newValue: string) => setSelectedOption(newValue)}
                            />
                        </div>
                    </div>
                    <div className="row full pb5">
                        {
                            (selectedOption == options[0].title) &&
                            <div className="col-12">
                                <ContributorComponent
                                    apiCall={() => props.apiService.getContributors()}
                                    renderer={ContributorListTile}
                                    identifier={(c) => `${c.sortRank}-${c.name}`}
                                />
                            </div>
                        }
                        {
                            (selectedOption == options[1].title) &&
                            <div className="col-12">
                                <assistant-apps-translation-leaderboard>
                                    <span slot="loading">
                                        <SmallLoading />
                                    </span>
                                    <span slot="error">
                                        <Error />
                                    </span>
                                </assistant-apps-translation-leaderboard>
                            </div>
                        }
                        {
                            (selectedOption == options[2].title) &&
                            <div className="col-12">
                                <ContributorComponent
                                    apiCall={async () => {
                                        let allDonations = [];
                                        const firstCall = await props.assistantAppsApiService.getDonators(1);
                                        if (firstCall.isSuccess == false) return firstCall;

                                        allDonations = [...firstCall.value];
                                        for (let donationIndex = 2; donationIndex < firstCall.totalPages; donationIndex++) {
                                            const pageCall = await props.assistantAppsApiService.getDonators(donationIndex);
                                            if (pageCall.isSuccess == false) continue;
                                            allDonations = [...allDonations, ...pageCall.value];
                                        }

                                        return { ...firstCall, value: allDonations };
                                    }}
                                    renderer={DonatorListTile}
                                    identifier={(c) => `${c.type}-${c.username}`}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </DefaultAnimation>
    );
}

export const ContributorsPage = withServices<IWithoutDepInj, IWithDepInj>(
    ContributorsPageUnconnected,
    (services: IDependencyInjection) => ({
        apiService: services.apiService,
        assistantAppsApiService: services.assistantAppsApiService,
    })
);
