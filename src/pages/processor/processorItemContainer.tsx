import React from 'react';
import { connect } from 'react-redux';

import { NetworkState } from '../../constants/NetworkState';
import { GameItemModel } from '../../contracts/GameItemModel';
import { Processor } from '../../contracts/Processor';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { anyObject } from '../../helper/typescriptHacks';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { AllGameItemsService } from '../../services/json/AllGameItemsService';
import { GameItemService } from '../../services/json/GameItemService';
import { mapStateToProps } from './processorItem.Redux';
import { ProcessorItemPresenter } from './processorItemPresenter';

interface IWithDepInj {
    gameItemService: GameItemService;
    allGameItemsService: AllGameItemsService;
}
interface IWithoutDepInj {
    location: any;
    match: any;
    history: any;
    selectedLanguage?: string;
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

interface IState {
    item: Processor;
    outputDetails: GameItemModel;
    inputDetails: Array<RequiredItemDetails>;
    status: NetworkState;
}

export class ProcessorItemContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            item: anyObject,
            outputDetails: anyObject,
            inputDetails: [],
            status: NetworkState.Loading
        }
    }

    componentDidMount() {
        const itemId = this.props.match?.params?.itemId;
        this.fetchData(itemId);
        this.fetchInputDetails(itemId);
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        const prevSelectedLanguage = prevProps.selectedLanguage;
        const prevItemId = prevProps.match?.params?.itemId;
        if (this.props.selectedLanguage !== prevSelectedLanguage || this.props.match?.params?.itemId !== prevItemId) {
            this.clearData();
            const itemId = this.props.match?.params?.itemId;
            this.fetchData(itemId);
            this.fetchInputDetails(itemId);
        }
    }

    clearData = async () => {
        this.setState(() => {
            return {
                item: anyObject,
                outputDetails: anyObject,
            }
        });
    }

    fetchData = async (itemId: string) => {
        const itemResult = itemId.includes("ref")
            ? await this.props.gameItemService.getRefinedById(itemId ?? '')
            : await this.props.gameItemService.getCookingById(itemId ?? '');
        if (!itemResult.isSuccess) {
            this.setState(() => {
                return {
                    status: NetworkState.Error
                }
            });
            console.error(itemResult.errorMessage);
            return;
        }

        this.fetchOutputData(itemResult.value.Output.Id);
        this.setState(() => {
            return {
                item: itemResult.value,
                status: NetworkState.Success
            }
        });
    }

    fetchOutputData = async (itemId: string) => {
        const itemResult = await this.props.gameItemService.getItemDetails(itemId ?? '');
        if (!itemResult.isSuccess) {
            console.error(itemResult.errorMessage);
            return;
        }

        this.setState(() => {
            return {
                outputDetails: itemResult.value
            }
        });
    }

    fetchInputDetails = async (itemId: string) => {
        const inputDetails = await this.props.gameItemService.getRequiredItemDetails(itemId ?? '');
        if (!inputDetails.isSuccess) {
            console.error(inputDetails.errorMessage);
            return;
        }

        this.setState(() => {
            return {
                inputDetails: inputDetails.value
            }
        });
    }

    render() {
        return (
            <ProcessorItemPresenter {...this.state} {...this.props} />
        );
    }
}

export const ProcessorItemContainer = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps)(ProcessorItemContainerUnconnected),
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
        allGameItemsService: services.allGameItemsService,
        rechargeByService: services.rechargeByService,
    })
);