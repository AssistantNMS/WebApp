import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GameItemModel } from '../../contracts/GameItemModel';
import { Processor } from '../../contracts/Processor';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { anyObject } from '../../helper/typescriptHacks';
import { State } from '../../redux/state';
import { AllGameItemsService } from '../../services/AllGameItemsService';
import { GameItemService } from '../../services/GameItemService';
import { ProcessorItemPresenter } from './processorItemPresenter';

interface IProps {
    location: any;
    match: any;
    history: any;
    selectedLanguage?: string;
}
interface IState {
    item: Processor;
    outputDetails: GameItemModel;
    inputDetails: Array<RequiredItemDetails>;
    gameItemService: GameItemService;
    allGameItemsService: AllGameItemsService;
}

export class ProcessorItemContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            item: anyObject,
            outputDetails: anyObject,
            inputDetails: [],
            gameItemService: new GameItemService(),
            allGameItemsService: new AllGameItemsService()
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
        var itemResult = itemId.includes("ref")
            ? await this.state.gameItemService.getRefinedById(itemId ?? '')
            : await this.state.gameItemService.getCookingById(itemId ?? '');
        if (!itemResult.isSuccess) {
            console.error(itemResult.errorMessage);
            return;
        }

        this.fetchOutputData(itemResult.value.Output.Id);
        this.setState(() => {
            return {
                item: itemResult.value
            }
        });
    }

    fetchOutputData = async (itemId: string) => {
        var itemResult = await this.state.gameItemService.getItemDetails(itemId ?? '');
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
        var inputDetails = await this.state.gameItemService.getRequiredItemDetails(itemId ?? '');
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


export const mapStateToProps = (state: State) => {
    return {
        selectedLanguage: state.settingReducer.selectedLanguage,
    };
};

export const ProcessorItemContainer = connect(mapStateToProps)(withRouter(ProcessorItemContainerUnconnected));