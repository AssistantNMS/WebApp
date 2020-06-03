import i18next from 'i18next';
import React from 'react';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { RequiredItemDetailsListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { Error } from '../../components/core/error/error';
import { LocaleKey } from '../../localization/LocaleKey';
import { NetworkState } from '../../constants/NetworkState';

interface IProps {
    requiredItems: RequiredItemDetails[];
    status: NetworkState;
}

export const GenericPageAllRequiredPresenter: React.FC<IProps> = (props: IProps) => {
    const handleLoadingOrError = () => {
        if (props.status === NetworkState.Loading) return;
        if (props.status === NetworkState.Error) return (<Error />);
        if (!props.requiredItems ||
            props.requiredItems.length === 0) {
            return (<h2>{i18next.t(LocaleKey.noItems)}</h2>);
        }
        return (<GenericListPresenter list={props.requiredItems} presenter={RequiredItemDetailsListTile} />);
    }

    const title = i18next.t(LocaleKey.allRawMaterialsRequired);
    return (
        <>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row">
                        <div className="col-12">
                            {handleLoadingOrError()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
