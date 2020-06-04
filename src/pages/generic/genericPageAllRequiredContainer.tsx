import i18next from 'i18next';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { RequiredItemDetailsListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile';
import { RequiredItem } from '../../contracts/RequiredItem';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { getAllRequiredItemsForMultiple } from '../../helper/itemHelper';
import { LocaleKey } from '../../localization/LocaleKey';
import { NetworkState } from '../../constants/NetworkState';

interface IProps {
    location: any;
    match: any;
    history: any;
}

interface IState {
    requiredItems: RequiredItemDetails[];
    status: NetworkState;
}

export class GenericPageAllRequiredContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            requiredItems: [],
            status: NetworkState.Loading,
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const requiredItemIds: RequiredItem[] = this.props.location?.state?.requiredItems || []
        var itemsResult = await getAllRequiredItemsForMultiple(requiredItemIds);
        this.setState(() => {
            return {
                requiredItems: itemsResult,
                status: NetworkState.Success
            }
        });
    }

    render() {
        const title = i18next.t(LocaleKey.allRawMaterialsRequired);
        return (
            <>
                <HeadComponent title={title} />
                <NavBar title={title} />
                <div className="content">
                    <div className="container full pt1">
                        <div className="row">
                            <div className="col-12">
                                {
                                    this.state.requiredItems.length > 0
                                        ? <GenericListPresenter list={this.state.requiredItems} presenter={RequiredItemDetailsListTile} />
                                        : <h2>{i18next.t(LocaleKey.noCartItems)}</h2>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export const GenericPageAllRequiredContainer = withRouter(GenericPageAllRequiredContainerUnconnected);