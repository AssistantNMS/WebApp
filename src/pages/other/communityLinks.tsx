import i18next from 'i18next';
import React, { useEffect, useState } from 'react';

import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { CommunityLinkListTile } from '../../components/tilePresenter/communityLinkListTile';
import { NetworkState } from '../../constants/NetworkState';
import { CommunityLinkViewModel } from '../../contracts/generated/Model/Community/communityLinkViewModel';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { ApiService } from '../../services/api/ApiService';

interface IWithDepInj {
    apiService: ApiService;
}
interface IWithoutDepInj { }
interface IProps extends IWithDepInj, IWithoutDepInj { }


export const CommunityLinksPageUnconnected: React.FC<IProps> = (props: IProps) => {
    const [communityLinks, setCommunityLinks] = useState<Array<CommunityLinkViewModel>>([]);
    const [networkStatus, setStatus] = useState<NetworkState>(NetworkState.Loading);

    useEffect(() => {
        fetchCommunityLinks();
        // eslint-disable-next-line
    }, []);

    const fetchCommunityLinks = async () => {
        const CommunityLinksResult = await props.apiService.getCommunityLinks();
        if (!CommunityLinksResult.isSuccess) {
            setCommunityLinks([]);
            setStatus(NetworkState.Error);
            return;
        }

        setCommunityLinks(CommunityLinksResult.value);
        setStatus(NetworkState.Success);
    }

    const displayComunityLinks = (communityLinks: Array<CommunityLinkViewModel>) => {

        if (networkStatus === NetworkState.Loading) {
            return <SmallLoading />
        }

        if (networkStatus === NetworkState.Error) {
            return <Error />
        }

        if (communityLinks == null || communityLinks.length === 0) return (
            <h2>{i18next.t(LocaleKey.noItems)}</h2>
        );

        return <GenericListPresenter list={communityLinks} presenter={CommunityLinkListTile} identifier={(item: CommunityLinkViewModel) => item.name + item.subtitle} />;
    };

    const title = i18next.t(LocaleKey.communityLinks);
    return (
        <DefaultAnimation>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div data-id="CommunityLinks" className="content">
                <div className="row full pt1 pb5">
                    <div className="col-12">
                        {displayComunityLinks(communityLinks)}
                    </div>
                </div>
            </div>
        </DefaultAnimation>
    );
}

export const CommunityLinksPage = withServices<IWithoutDepInj, IWithDepInj>(
    CommunityLinksPageUnconnected,
    (services: IDependencyInjection) => ({
        apiService: services.apiService,
    })
);
