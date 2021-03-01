import i18next from 'i18next';
import React, { ReactNode } from 'react';

import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { Error } from '../../components/core/error/error';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { LocaleKey } from '../../localization/LocaleKey';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { WhatIsNewListTile } from '../../components/tilePresenter/whatIsNewListTile';
import { VersionViewModel } from '../../contracts/generated/AssistantApps/ViewModel/Version/versionViewModel';

interface IProps {
    whatIsNewItems: Array<VersionViewModel>;
    whatIsNewStatus: NetworkState;
}

export const WhatIsNewPresenter: React.FC<IProps> = (props: IProps) => {

    const handleLoadingOrError = (displayFunc: (props: IProps) => ReactNode): ReactNode => {
        if (props.whatIsNewStatus === NetworkState.Loading) return SmallLoading();
        if (props.whatIsNewStatus === NetworkState.Error) {
            return (<Error />);
        }
        if (props.whatIsNewItems == null ||
            props.whatIsNewItems.length < 1) {
            return (<h2>{i18next.t(LocaleKey.noItems)}</h2>);
        }
        return displayFunc(props);
    }

    const displayWhatIsNewData = (whatIsNewItems: Array<VersionViewModel>): ReactNode => {
        const customWhatIsNewListTile = (currentItem: VersionViewModel, index: number) =>
            <WhatIsNewListTile
                version={currentItem}
                currentWhatIsNewGuid={window.config.currentWhatIsNewGuid}
            />;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <GenericListPresenter list={whatIsNewItems || []} presenter={customWhatIsNewListTile} />
                    </div>
                </div>
            </>
        );
    }

    const title = i18next.t(LocaleKey.whatIsNew);
    return (
        <>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1 pb5">
                    {handleLoadingOrError((localProps: IProps) => displayWhatIsNewData(localProps.whatIsNewItems))}
                </div>
            </div>
        </>
    );
}
