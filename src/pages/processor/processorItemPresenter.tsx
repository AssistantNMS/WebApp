import i18next from 'i18next';
import React from 'react';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { RequiredItemDetailsListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile';
import { GameItemModel } from '../../contracts/GameItemModel';
import { Processor } from '../../contracts/Processor';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { LocaleKey } from '../../localization/LocaleKey';
import { AllGameItemsService } from '../../services/AllGameItemsService';
import { GameItemService } from '../../services/GameItemService';
import { NetworkState } from '../../constants/NetworkState';
import { SmallLoading } from '../../components/core/loading/loading';
import { Error } from '../../components/core/error/error'

interface IProps {
    // Container Props
    location: any;
    match: any;
    history: any;
    selectedLanguage?: string;

    // Container State
    item: Processor;
    outputDetails: GameItemModel;
    inputDetails: Array<RequiredItemDetails>;
    gameItemService: GameItemService;
    allGameItemsService: AllGameItemsService;
    status: NetworkState;
}

export const ProcessorItemPresenter: React.FC<IProps> = (props: IProps) => {
    const handleLoadingOrError = () => {
        if (props.status === NetworkState.Loading) return (<SmallLoading />);
        if (props.status === NetworkState.Error ||
            props.item == null || props.item.Id == null ||
            props.outputDetails == null || props.item == null || props.item.Operation == null) return (<Error />);
        return displayProcessor(props.inputDetails);
    }

    const displayProcessor = (requiredItems: Array<RequiredItemDetails>) => {
        if (requiredItems == null || requiredItems.length < 1) return null;

        return (
            <>
                <div className="col-12 col-lg-2 col-md-2 col-sm-2 col-xs-3 image-container generic-item-image-container"
                    style={{ backgroundColor: `#${props.outputDetails.Colour}` }}>
                    <img src={`/assets/images/${props.outputDetails.Icon}`} alt={props.outputDetails.Name} style={{ maxWidth: '100%' }} />
                </div>
                <div className="col-12 col-lg-10 col-md-10 col-sm-10 col-xs-9">
                    <h2 className="ta-left ta-center-sm" style={{ marginBottom: 0 }}>{props.outputDetails.Name}</h2>
                    {
                        props.item.Operation
                            ? <h3 className="ta-left ta-center-sm" style={{ marginTop: 0 }}>{props.item.Operation}</h3>
                            : null
                    }
                </div>
            </>
        );
    }

    const displayInputs = (requiredItems: Array<RequiredItemDetails>) => {
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

    const outputId = (props?.item?.Id || '');
    const outputName = (props?.outputDetails?.Name || '');
    const operation = (props?.item?.Operation || '');

    const title = `${outputId.includes("ref") ? i18next.t(LocaleKey.refinedUsing) : i18next.t(LocaleKey.cooking)} - ${outputName}`;
    const description = `${outputName} - ${operation}`;
    return (
        <>
            <HeadComponent title={title} description={description} />
            <NavBar title={title} />
            <div className="content">
                <div className="row border-bottom">
                    {handleLoadingOrError()}
                </div>
                {displayInputs(props.inputDetails)}
            </div>
        </>
    );
}
