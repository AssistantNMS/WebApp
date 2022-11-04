import React, { useEffect, useState } from 'react';

import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { Error } from '../../components/core/error/error';
import { SmallLoading } from '../../components/core/loading/loading';
import { NetworkState } from '../../constants/NetworkState';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';

interface IProps<T> {
    apiCall: () => Promise<ResultWithValue<Array<T>>>;
    renderer: (item: T, index: number) => JSX.Element;
    identifier: (item: T) => string;
}

export function ContributorComponent<T>(props: IProps<T>) {
    const [contributors, setContributors] = useState<Array<T>>([]);
    const [networkStatus, setStatus] = useState<NetworkState>(NetworkState.Loading);

    useEffect(() => {
        fetchContributors();
        // eslint-disable-next-line
    }, []);

    const fetchContributors = async () => {
        const communityLinksResult = await props.apiCall();
        if (!communityLinksResult.isSuccess) {
            setContributors([]);
            setStatus(NetworkState.Error);
            return;
        }

        setContributors(communityLinksResult.value);
        setStatus(NetworkState.Success);
    }

    const displayContributors = (communityLinks: Array<T>) => {

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
            <GenericListPresenter list={communityLinks} presenter={props.renderer} identifier={props.identifier} />
        );
    };

    return (
        <DefaultAnimation>
            <div className="row full pb5">
                <div className="col-12 community-search-list">
                    {displayContributors(contributors)}
                </div>
            </div>
        </DefaultAnimation>
    );
}
