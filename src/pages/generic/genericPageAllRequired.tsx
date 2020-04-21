import i18next from 'i18next';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { RequiredItem } from '../../contracts/RequiredItem';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { setDocumentTitle } from '../../helper/DocumentHelper';
import { LocaleKey } from '../../localization/LocaleKey';

import { NavBar } from '../../components/core/navbar/navbar';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { RequiredItemDetailsListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile';

import { getAllRequiredItemsForMultiple } from '../../helper/itemHelper';

interface IProps {
    location: any;
    match: any;
    history: any;
}

interface IState {
    title: string;
    requiredItems: RequiredItemDetails[];
}

export class GenericPageAllRequiredPresenterUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const title = i18next.t(LocaleKey.allRawMaterialsRequired);
        setDocumentTitle(title);

        this.state = {
            title,
            requiredItems: []
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
                requiredItems: itemsResult
            }
        });
    }

    render() {
        return (
            <>
                <NavBar title={this.state.title} />
                <div className="content">
                    <div className="container full pt1">
                        <div className="row">
                            <div className="col-12">
                                {
                                    this.state.requiredItems.length > 1
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

export const GenericPageAllRequiredPresenter = withRouter(GenericPageAllRequiredPresenterUnconnected);