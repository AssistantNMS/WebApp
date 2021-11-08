import React from 'react';
import { withRouter } from 'react-router-dom';
import { RequiredItem } from '../../contracts/RequiredItem';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { getAllRequiredItemsForMultiple, getAllRequiredItemsForTree } from '../../helper/itemHelper';
import { GenericPageAllRequiredPresenter } from './genericPageAllRequiredPresenter';
import { NetworkState } from '../../constants/NetworkState';
import { GameItemService } from '../../services/json/GameItemService';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { Tree } from '../../contracts/tree/tree';
import { LocaleKey } from '../../localization/LocaleKey';

interface IWithDepInj {
    gameItemService: GameItemService;
}
interface IWithoutDepInj {
}

interface IProps extends IWithDepInj, IWithoutDepInj {
    location: any;
    match: any;
    history: any;
}

interface IState {
    treeRequiredItems: Array<Tree<RequiredItemDetails>>;
    requiredItems: Array<RequiredItemDetails>;
    status: NetworkState;
    selectedOption: LocaleKey;
}

export class GenericPageAllRequiredContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            treeRequiredItems: [],
            requiredItems: [],
            status: NetworkState.Loading,
            selectedOption: LocaleKey.flatList,
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const requiredItemIds: Array<RequiredItem> = this.props.location?.state?.requiredItems || []
        const itemsResult = await getAllRequiredItemsForMultiple(this.props.gameItemService, requiredItemIds);
        const treeItemsResult = await getAllRequiredItemsForTree(this.props.gameItemService, requiredItemIds);
        this.setState(() => {
            return {
                treeRequiredItems: treeItemsResult,
                requiredItems: itemsResult,
                status: NetworkState.Success
            }
        });
    }

    setSelectedOption = (selectedOption: LocaleKey) => {
        this.setState(() => {
            return {
                selectedOption,
            }
        });
    }


    render() {
        return (
            <GenericPageAllRequiredPresenter
                status={this.state.status}
                treeRequiredItems={this.state.treeRequiredItems}
                requiredItems={this.state.requiredItems}
                selectedOption={this.state.selectedOption}
                setSelectedOption={this.setSelectedOption}
            />
        );
    }
}

export const GenericPageAllRequiredContainer = withServices<IWithoutDepInj, IWithDepInj>(
    withRouter(GenericPageAllRequiredContainerUnconnected),
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);
