import React from 'react';
import { forceCheck } from 'react-lazyload';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { NetworkState } from '../../constants/NetworkState';
import { GameItemModel } from '../../contracts/GameItemModel';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { State } from '../../redux/state';
import { AllGameItemsService } from '../../services/json/AllGameItemsService';
import { ToastService } from '../../services/toastService';
import { CatalogueListPresenter } from './catalogueListPresenter';

import './catalogue.scss';

interface IWithDepInj {
    allGameItemsService: AllGameItemsService;
    toastService: ToastService;
}
interface IWithoutDepInj {
    location: any;
    match: any;
    history: any;
    selectedLanguage?: string;
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

interface IState {
    items: Array<GameItemModel>;
    displayItems: Array<GameItemModel>;
    searchTerm: string;
    types: string;
    networkState: NetworkState;
}

export class CatalogueListContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            items: new Array<GameItemModel>(),
            displayItems: new Array<GameItemModel>(),
            searchTerm: '',
            types: props.match?.params?.types ?? '',
            networkState: NetworkState.Loading,
        }
    }

    componentDidMount() {
        this.fetchData(this.state.types);
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        const newTypes = this.props.match?.params?.types ?? '';
        const prevSelectedLanguage = prevProps.selectedLanguage;
        if (this.state.types !== newTypes || this.props.selectedLanguage !== prevSelectedLanguage) {
            this.fetchData(newTypes);
        }
    }

    fetchData = async (newTypes: string) => {
        const itemsResult = await this.props.allGameItemsService.getSelectedCatalogueItems(newTypes.split('-'));
        if (!itemsResult.isSuccess) {
            // Error
            return;
        }
        forceCheck();
        this.setState(() => {
            return {
                displayItems: itemsResult.value,
                items: itemsResult.value,
                types: newTypes,
                networkState: NetworkState.Success,
            }
        }, () => this.search(null, this.state.searchTerm));
    }

    onSearchTextChange = (e: any) => {
        e?.persist?.();

        const searchValue = e?.target?.value || '';
        if (this.state.searchTerm === searchValue) return;

        this.search(null, searchValue);
    }

    search = (e: any, searchText: string) => {
        e?.preventDefault?.();

        const newDisplayItems = new Array<GameItemModel>();
        for (const itemIndex in this.state.items) {
            if (this.state.items.hasOwnProperty(itemIndex)) {
                const item = this.state.items[itemIndex];
                if (!item.Name.toLowerCase().includes(searchText.toLowerCase())) continue;
                newDisplayItems.push(item);
            }
        }
        this.setState(() => {
            return {
                displayItems: newDisplayItems,
                searchTerm: searchText
            };
        }, () => forceCheck());
    }

    render() {
        return (
            <CatalogueListPresenter {...this.state} {...this.props}
                onSearchTextChange={this.onSearchTextChange}
                search={this.search}
            />
        );
    }
}


export const mapStateToProps = (state: State) => {
    return {
        selectedLanguage: state.settingReducer.selectedLanguage,
    };
};

export const CatalogueListContainer = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps)(withRouter(CatalogueListContainerUnconnected)),
    (services: IDependencyInjection) => ({
        allGameItemsService: services.allGameItemsService,
        toastService: services.toastService,
    })
);