import i18next from 'i18next';
import React from 'react';
import { forceCheck } from 'react-lazyload';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GameItemList } from '../../components/common/gameItemList/gameItemList';
import { NavBar } from '../../components/core/navbar/navbar';
import { GameItemModel } from '../../contracts/GameItemModel';
import { setDocumentTitle } from '../../helper/DocumentHelper';
import { LocaleKey } from '../../localization/LocaleKey';
import { State } from '../../redux/state';
import { AllGameItemsService } from '../../services/AllGameItemsService';
import './catalogue.scss';



interface IProps {
    location: any;
    match: any;
    history: any;
    selectedLanguage?: string;
}
interface IState {
    items: Array<GameItemModel>;
    displayItems: Array<GameItemModel>;
    showSearchInput: boolean;
    searchTerm: string;
    types: string;
}

export class CatalogueListPresenterUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            items: new Array<GameItemModel>(),
            displayItems: new Array<GameItemModel>(),
            searchTerm: '',
            showSearchInput: false,
            types: props.match?.params?.types ?? ''
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
        const allGameItemsService = new AllGameItemsService();
        var itemsResult = await allGameItemsService.getSelectedCatalogueItems(newTypes.split('-'));
        if (!itemsResult.isSuccess) {
            // Error
            return;
        }
        forceCheck();
        this.setState(() => {
            return {
                displayItems: itemsResult.value,
                items: itemsResult.value,
                searchTerm: '',
                types: newTypes
            }
        });
    }

    searchBarToggle = () => {
        this.setState((prevState: IState) => {
            return {
                showSearchInput: !prevState.showSearchInput,
                displayItems: prevState.items,
                searchTerm: ''
            }
        });
    }

    onSearchTextChange = (e: any) => {
        e.persist();

        const searchValue = e?.target?.value || '';
        this.search(null, searchValue);
    }

    search = (e: any, searchText: string) => {
        if (e) e.preventDefault();

        if (this.state.searchTerm === searchText) return;

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
        }, () => {
            forceCheck();
        });
    }

    render() {
        const title = i18next.t(LocaleKey.catalogue);
        setDocumentTitle(title);
        return (
            <>
                <NavBar title={title} />
                <div className="content">
                    <form id="searchBar" className="searchbar row" onSubmit={(e) => this.search(e, this.state.searchTerm)}>
                        <input type="text" className="form-control" placeholder="Search" onChange={this.onSearchTextChange} />
                        <button className="icon-container pointer" type="submit">
                            <i className="material-icons">search</i>
                        </button>
                    </form>
                    <GameItemList key={this.state.displayItems.length} items={this.state.displayItems} />
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

export const CatalogueListPresenter = connect(mapStateToProps)(withRouter(CatalogueListPresenterUnconnected));