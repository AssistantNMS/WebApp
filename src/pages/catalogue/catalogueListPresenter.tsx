import React from 'react';
import i18next from 'i18next';
import { forceCheck } from 'react-lazyload';
import { withRouter } from 'react-router-dom';

import './catalogue.scss';

import { AllGameItemsService } from '../../services/AllGameItemsService';

import { NavBar } from '../../components/core/navbar/navbar';
import { LocaleKey } from '../../localization/LocaleKey';
import { GameItemModel } from '../../contracts/GameItemModel';
import { GameItemList } from '../../components/common/gameItemList/gameItemList';
import { State } from '../../redux/state';
import { connect } from 'react-redux';

interface IProps {
    location: any;
    match: any;
    history: any;
    selectedLanguage?: string;
}
interface IState {
    items: Array<GameItemModel>;
    types: string;
}

export class CatalogueListPresenterUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            items: new Array<GameItemModel>(),
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
                items: itemsResult.value,
                types: newTypes
            }
        });
    }

    render() {
        return (
            <>
                <NavBar title={i18next.t(LocaleKey.catalogue)} />
                <div className="content">
                    <GameItemList items={this.state.items} />
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