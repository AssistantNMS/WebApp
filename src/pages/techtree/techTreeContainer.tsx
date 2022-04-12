import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NetworkState } from '../../constants/NetworkState';
import { UnlockableTechTree } from '../../contracts/tree/techTree';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { GameItemService } from '../../services/json/GameItemService';
import { mapStateToProps, IReduxProps } from './techTree.Redux';
import { TechTreePresenter } from './techTreePresenter';

interface IWithDepInj {
    gameItemService: GameItemService;
}
interface IWithoutDepInj { }

interface IProps extends IWithDepInj, IWithoutDepInj, IReduxProps { }

const TechTreeContainerUnconnected: React.FC<IProps> = (props: IProps) => {
    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);
    const [trees, setTrees] = useState<Array<UnlockableTechTree>>([]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        const techTreesResult = await props.gameItemService.getTechTree();
        if (!techTreesResult.isSuccess) {
            setNetworkState(NetworkState.Error);
            return;
        }
        setTrees(techTreesResult.value);
        setNetworkState(NetworkState.Success);
    }

    return (
        <TechTreePresenter
            {...props}
            trees={trees}
            networkState={networkState}
            selectedLanguage={props.selectedLanguage}
        />
    );
}

export const TechTreeContainer = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps)(TechTreeContainerUnconnected),
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);
