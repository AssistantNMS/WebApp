import i18next from 'i18next';
import React from 'react';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { RequiredItemDetailsListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile';
import { NetworkState } from '../../constants/NetworkState';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { Tree } from '../../contracts/tree/tree';
import { LocaleKey } from '../../localization/LocaleKey';
import { GenericPageAllRequiredTree } from './genericPageAllRequiredTree';
var SegmentedControl = require('segmented-control');

interface IProps {
    status: NetworkState;
    treeRequiredItems: Array<Tree<RequiredItemDetails>>;
    requiredItems: Array<RequiredItemDetails>;
    selectedOption: LocaleKey;
    setSelectedOption: (selectedOption: LocaleKey) => void;
}

export const GenericPageAllRequiredPresenter: React.FC<IProps> = (props: IProps) => {
    const handleLoadingOrError = (treeRequiredItems: Array<Tree<RequiredItemDetails>>, requiredItems: Array<RequiredItemDetails>) => {
        if (props.status === NetworkState.Loading) return;
        if (props.status === NetworkState.Error) return (<Error />);
        if (!props.requiredItems ||
            props.requiredItems.length === 0) {
            return (<h2>{i18next.t(LocaleKey.noItems)}</h2>);
        }
        return (renderRequiredItemsPages(treeRequiredItems, requiredItems));
    }

    const renderRequiredItemsPages = (treeRequiredItems: Array<Tree<RequiredItemDetails>>, requiredItems: Array<RequiredItemDetails>) => {
        if (props.selectedOption === LocaleKey.tree) {
            return (<GenericPageAllRequiredTree list={treeRequiredItems} />);
        }

        return (
            <GenericListPresenter
                list={requiredItems}
                presenter={RequiredItemDetailsListTile}
            />
        );
    }

    const options = [
        LocaleKey.flatList,
        LocaleKey.tree,
    ]

    const title = i18next.t(LocaleKey.allRawMaterialsRequired);
    return (
        <>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row justify mb-1em">
                        <div className="col-12 col-xl-6 col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <SegmentedControl.SegmentedControl
                                name="platformChoice"
                                options={options.map((opt) => ({
                                    label: i18next.t(opt),
                                    value: opt,
                                    default: props.selectedOption === opt,
                                }))}
                                setValue={props.setSelectedOption}
                            />
                        </div>
                    </div>
                    <div className="row mb-2em">
                        <div className="col-12 mb-2em">
                            {handleLoadingOrError(props.treeRequiredItems, props.requiredItems)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
