import React, { useEffect, useState } from 'react';

import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { CommunitySpotlightListTile } from '../../components/tilePresenter/communitySpotlightListTile';
import { NetworkState } from '../../constants/NetworkState';
import { CommunityLinkViewModel } from '../../contracts/generated/Model/Community/communityLinkViewModel';
import { CommunitySpotlightViewModel } from '../../contracts/generated/Model/Community/communitySpotlightViewModel';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';
import { ApiService } from '../../services/api/ApiService';

interface IWithDepInj {
    apiService: ApiService;
}
interface IWithoutDepInj { }
interface IProps extends IWithDepInj, IWithoutDepInj { }


export const CommunitySpotlightPageUnconnected: React.FC<IProps> = (props: IProps) => {
    const [communityLinks, setCommunityLinks] = useState<Array<CommunitySpotlightViewModel>>([]);
    const [networkStatus, setStatus] = useState<NetworkState>(NetworkState.Loading);

    useEffect(() => {
        fetchCommunityLinks();
        // eslint-disable-next-line
    }, []);

    const fetchCommunityLinks = async () => {
        const communitySpotlightResult = await props.apiService.getCommunitySpotlight();
        if (!communitySpotlightResult.isSuccess) {
            setCommunityLinks([]);
            setStatus(NetworkState.Error);
            return;
        }

        setCommunityLinks(communitySpotlightResult.value);
        setStatus(NetworkState.Success);
    }

    const displayCommunitySpotlights = (communityLinks: Array<CommunitySpotlightViewModel>) => {

        if (networkStatus === NetworkState.Loading) {
            return <SmallLoading />
        }

        if (networkStatus === NetworkState.Error) {
            return <Error />
        }

        if (communityLinks == null || communityLinks.length === 0) return (
            <h2>{translate(LocaleKey.noItems)}</h2>
        );

        return (
            <GenericListPresenter
                list={communityLinks}
                bootstrapClasses="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12"
                presenter={CommunitySpotlightListTile}
                identifier={(item: CommunitySpotlightViewModel) => item.title + item.subtitle}
            />
        );
    };

    const title = translate(LocaleKey.communitySpotlight);
    return (
        <DefaultAnimation>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div data-id="CommunityLinks" className="content">
                <div className="row full pt1 pb5">
                    <div className="col-12">
                        {displayCommunitySpotlights(communityLinks)}
                    </div>
                </div>
            </div>
        </DefaultAnimation>
    );
}

export const CommunitySpotlightPage = withServices<IWithoutDepInj, IWithDepInj>(
    CommunitySpotlightPageUnconnected,
    (services: IDependencyInjection) => ({
        apiService: services.apiService,
    })
);
