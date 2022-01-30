import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { NetworkState } from '../../constants/NetworkState';
import { GameItemModel } from '../../contracts/GameItemModel';
import { Processor } from '../../contracts/Processor';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { anyObject } from '../../helper/typescriptHacks';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { AllGameItemsService } from '../../services/json/AllGameItemsService';
import { GameItemService } from '../../services/json/GameItemService';
import { mapStateToProps, IReduxProps } from './processorItem.Redux';
import { ProcessorItemPresenter } from './processorItemPresenter';

interface IWithDepInj {
    gameItemService: GameItemService;
    allGameItemsService: AllGameItemsService;
}
interface IWithoutDepInj { }

interface IProps extends IWithDepInj, IWithoutDepInj, IReduxProps { }

export const ProcessorItemContainerUnconnected: React.FC<IProps> = (props: IProps) => {
    let { itemId } = useParams();

    const [item, setItem] = useState<Processor>(anyObject);
    const [outputDetails, setOutputDetails] = useState<GameItemModel>(anyObject);
    const [inputDetails, setInputDetails] = useState<Array<RequiredItemDetails>>([]);
    const [status, setStatus] = useState<NetworkState>(NetworkState.Loading);

    useEffect(() => {
        clearData();
        if (itemId == null || itemId.length < 1) return;
        fetchData(itemId);
        fetchInputDetails(itemId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selectedLanguage, itemId]);

    const clearData = async () => {
        setItem(anyObject);
        setInputDetails([]);
        setOutputDetails(anyObject);
    }

    const fetchData = async (itemId: string) => {
        const itemResult = itemId.includes("ref")
            ? await props.gameItemService.getRefinedById(itemId)
            : await props.gameItemService.getCookingById(itemId);
        if (!itemResult.isSuccess) {
            setStatus(NetworkState.Error);
            console.error(itemResult.errorMessage);
            return;
        }

        fetchOutputData(itemResult.value.Output.Id);
        setItem(itemResult.value);
        setStatus(NetworkState.Success);
    }

    const fetchOutputData = async (itemId: string) => {
        const itemResult = await props.gameItemService.getItemDetails(itemId);
        if (!itemResult.isSuccess) {
            console.error(itemResult.errorMessage);
            return;
        }

        setOutputDetails(itemResult.value);
    }

    const fetchInputDetails = async (itemId: string) => {
        const inputDetails = await props.gameItemService.getRequiredItemDetails(itemId ?? '');
        if (!inputDetails.isSuccess) {
            console.error(inputDetails.errorMessage);
            return;
        }

        setInputDetails(inputDetails.value);
    }

    return (
        <ProcessorItemPresenter
            {...props}
            item={item}
            outputDetails={outputDetails}
            inputDetails={inputDetails}
            status={status}
        />
    );
}

export const ProcessorItemContainer = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps)(ProcessorItemContainerUnconnected),
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
        allGameItemsService: services.allGameItemsService,
        rechargeByService: services.rechargeByService,
    })
);