import React from 'react';
import { translate } from '../../localization/Translate';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { GuideCardListTile } from '../../components/tilePresenter/guideItemListTile/guideCardListTile';
import { NetworkState } from '../../constants/NetworkState';
import { Guide } from '../../contracts/guide/guide';
import { LocaleKey } from '../../localization/LocaleKey';

interface IProps {
    // Container State
    title: string;
    guideItems: Guide[];
    status: NetworkState;
}

export const GuidePagePresenter: React.FC<IProps> = (props: IProps) => {
    const displayGuides = () => {
        if (props.status === NetworkState.Loading) return;
        if (props.status === NetworkState.Error ||
            !props.guideItems ||
            props.guideItems.length < 1) {
            return (<h2>{translate(LocaleKey.noItems)}</h2>);
        }
        return (<GenericListPresenter list={props.guideItems} presenter={GuideCardListTile} />);
    }

    return (
        <DefaultAnimation>
            <HeadComponent title={props.title} />
            <NavBar title={props.title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row">
                        <div className="col-12">
                            {displayGuides()}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultAnimation>
    );
}
