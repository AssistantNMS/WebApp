import React, { ReactNode } from 'react';

import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { Error } from '../../components/core/error/error';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { patronListTile } from '../../components/tilePresenter/patronListTile';
import { PatreonViewModel } from '../../contracts/generated/AssistantApps/ViewModel/patreonViewModel';


interface IProps {
    title: string;
    patreonItems: Array<PatreonViewModel>;
    status: NetworkState;
}

export const PatreonPresenter: React.FC<IProps> = (props: IProps) => {
    const handleLoadingOrError = (displayFunc: (props: IProps) => ReactNode) => {
        if (props.status === NetworkState.Loading) return SmallLoading();
        if (props.status === NetworkState.Error ||
            props.patreonItems == null ||
            props.patreonItems.length < 1) {
            return (<Error />);
        }
        return displayFunc(props);
    }

    const displayPatreonList = (patreonItems: Array<PatreonViewModel>) => {
        return (
            <GenericListPresenter
                list={patreonItems}
                presenter={patronListTile}
            />
        );
    }

    return (
        <>
            <HeadComponent title={props.title} />
            <NavBar title={props.title} />
            <div className="content">
                <div className="container full pt1">
                    {handleLoadingOrError((localProps: IProps) => displayPatreonList(localProps.patreonItems))}
                </div>
            </div>
        </>
    );
}
