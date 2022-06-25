import React from 'react';
import { translate } from '../../localization/Translate';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { RequiredItemDetailsListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile';
import { NetworkState } from '../../constants/NetworkState';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { Tree } from '../../contracts/tree/tree';
import { shouldListBeCentered } from '../../helper/mathHelper';
import { LocaleKey } from '../../localization/LocaleKey';
import { GenericPageAllRequiredTree } from './genericPageAllRequiredTree';
const SegmentedControl = require('segmented-control');

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
            return (<h2>{translate(LocaleKey.noItems)}</h2>);
        }
        return (renderRequiredItemsPages(treeRequiredItems, requiredItems));
    }

    const renderRequiredItemsPages = (treeRequiredItems: Array<Tree<RequiredItemDetails>>, requiredItems: Array<RequiredItemDetails>) => {
        if (props.selectedOption === LocaleKey.tree) {
            return (<GenericPageAllRequiredTree list={treeRequiredItems} />);
        }

        return (
            <GenericListPresenter
                key={Date.now().toString()}
                list={requiredItems}
                presenter={RequiredItemDetailsListTile}
                isCentered={shouldListBeCentered(requiredItems.length)}
            />
        );
    }

    const options = [
        LocaleKey.flatList,
        LocaleKey.tree,
    ];

    const title = translate(LocaleKey.allRawMaterialsRequired);
    return (
        <DefaultAnimation>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content" data-id="GenericPageAllRequiredPresenter">
                <div className="container full pt1">
                    <div className="row justify mb-1em">
                        <div className="col-12 col-xl-6 col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <SegmentedControl.SegmentedControl
                                name="allMaterialRequired"
                                options={options.map((opt) => ({
                                    label: translate(opt),
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
        </DefaultAnimation>
    );
}
