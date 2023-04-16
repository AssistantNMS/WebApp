import React from 'react';
import { useNavigate } from 'react-router';
import { translate } from '../../localization/Translate';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { ItemHeaderRow } from '../../components/core/itemHeaderRow';
import { TileLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { RequiredItemDetailsListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile';
import { NetworkState } from '../../constants/NetworkState';
import * as Route from '../../constants/Route';
import { GameItemModel } from '../../contracts/GameItemModel';
import { Processor } from '../../contracts/Processor';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { LocaleKey } from '../../localization/LocaleKey';
import { AllGameItemsService } from '../../services/json/AllGameItemsService';
import { GameItemService } from '../../services/json/GameItemService';

interface IProps {
    // Container Props
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
    let navigate = useNavigate();

    const displayInputs = (requiredItems: Array<RequiredItemDetails>) => {
        if (props.status === NetworkState.Loading) return (<TileLoading />);
        if (props.status === NetworkState.Error) return (<Error />);

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>{translate(LocaleKey.inputs)}</h3>
                    </div>
                    <div className="col-12">
                        <GenericListPresenter list={requiredItems} presenter={RequiredItemDetailsListTile} isCentered={true} />
                    </div>
                </div>
                <hr className="mt-3em" />
            </>
        );
    }

    const outputId = (props?.item?.Id || '');
    const outputName = (props?.outputDetails?.Name || '');
    const operation = (props?.item?.Operation || '');
    const timeToMake = translate(LocaleKey.timeToMake);
    const procInSeconds = translate(LocaleKey.seconds).replaceAll('{0}', props?.item?.Time || '');

    const title = `${outputId.includes("ref") ? translate(LocaleKey.refinedUsing) : translate(LocaleKey.cooking)} - ${outputName}`;
    const description = `${outputName} - ${operation}`;
    return (
        <DefaultAnimation>
            <HeadComponent title={title} description={description} />
            <NavBar title={title} />
            <div className="content" data-id="ProcessorItemPresenter">
                <ItemHeaderRow
                    Colour={props.outputDetails.Colour}
                    Icon={props.outputDetails.Icon}
                    Name={props.outputDetails.Name}
                    Group={props.item.Operation}
                    Quantity={props.item?.Output?.Quantity}
                    Link={() => navigate(`${Route.catalogueItem}/${props.outputDetails.Id}`)}
                >
                    <h3>{`${timeToMake} ${procInSeconds}`}</h3>
                </ItemHeaderRow>
                {displayInputs(props.inputDetails)}
            </div>
        </DefaultAnimation>
    );
}
