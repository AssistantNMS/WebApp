import i18next from 'i18next';
import React from 'react';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { UnlockableTechTree } from '../../contracts/tree/techTree';
import { LocaleKey } from '../../localization/LocaleKey';
import { UnlockableTreesRenderer } from './techTree.Components';

interface IProps {
    selectedLanguage?: string;
    networkState: NetworkState;

    //state
    trees: Array<UnlockableTechTree>
}

export const TechTreePresenter: React.FC<IProps> = (props: IProps) => {

    const handleLoadingOrError = () => {
        if (props.networkState === NetworkState.Loading) return <div className="pt-5"><SmallLoading /></div>;
        if (props.networkState === NetworkState.Error) {
            return (<h2>{i18next.t(LocaleKey.error)}</h2>);
        }
        return displayDetails();
    }

    const displayDetails = () => {
        return (
            <DefaultAnimation>
                <div className="content">
                    <UnlockableTreesRenderer trees={props.trees} />
                </div>
            </DefaultAnimation>
        )
    }

    return (
        <>
            <HeadComponent
                title={i18next.t(LocaleKey.techTree)}
                description={i18next.t(LocaleKey.techTree)}
                selectedLanguage={props.selectedLanguage}
            />
            <NavBar title={i18next.t(LocaleKey.techTree)} />
            {handleLoadingOrError()}
            <div className="col-12" style={{ marginTop: '8em' }}></div>
        </>
    );
}
