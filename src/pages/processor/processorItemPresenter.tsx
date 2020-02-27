import React from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { State } from '../../redux/state';
import { LocaleKey } from '../../localization/LocaleKey';
import { anyObject } from '../../helper/TypescriptHacks';
import { setDocumentTitle } from '../../helper/DocumentHelper';

import { NavBar } from '../../components/core/navbar/navbar';
import { RequiredItemDetailsListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { Processor } from '../../contracts/Processor';
import { GameItemModel } from '../../contracts/GameItemModel';

import { GameItemService } from '../../services/GameItemService';
import { AllGameItemsService } from '../../services/AllGameItemsService';

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

export class ProcessorItemPresenterUnconnected extends React.Component<IProps, IState> {
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
        var itemResult = await this.state.gameItemService.getRefinedById(itemId ?? '');
        if (!itemResult.isSuccess) {
            console.error(itemResult.errorMessage);
            return;
        }

        setDocumentTitle(itemResult.value.Operation);
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

    displayInputs = (requiredItems: Array<RequiredItemDetails>) => {
        if (requiredItems == null || requiredItems.length < 1) return null;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>{i18next.t(LocaleKey.inputs)}</h3>
                    </div>
                    <div className="col-12">
                        <GenericListPresenter list={requiredItems} presenter={RequiredItemDetailsListTile} />
                    </div>
                </div>
                <hr className="mt-3em" />
            </>
        );
    }

    render() {
        return (
            <>
                <NavBar title={this.state.item.Operation} />
                <div className="content">
                    <div className="row border-bottom">
                        <div className="col-12 col-lg-2 col-md-2 col-sm-2 col-xs-3 image-container generic-item-image-container"
                            style={{ backgroundColor: `#${this.state.outputDetails.Colour}` }}>
                            <img src={`/assets/images/${this.state.outputDetails.Icon}`} alt={this.state.outputDetails.Name} style={{ maxWidth: '100%' }} />
                        </div>
                        <div className="col-12 col-lg-10 col-md-10 col-sm-10 col-xs-9">
                            <h2 className="ta-left ta-center-sm" style={{ marginBottom: 0 }}>{this.state.outputDetails.Name}</h2>
                            {
                                this.state.item.Operation
                                    ? <h3 className="ta-left ta-center-sm" style={{ marginTop: 0 }}>{this.state.item.Operation}</h3>
                                    : null
                            }
                        </div>
                    </div>
                    {this.displayInputs(this.state.inputDetails)}
                </div>
            </>
        );
    }
}


export const mapStateToProps = (state: State) => {
    return {
        selectedLanguage: state.settingReducer.selectedLanguage,
    };
};

export const ProcessorItemPresenter = connect(mapStateToProps)(withRouter(ProcessorItemPresenterUnconnected));