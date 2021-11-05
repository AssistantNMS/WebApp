import i18next from 'i18next';
import React from 'react';

import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { GenericItemWithRequirementsListTile } from '../../components/tilePresenter/genericItemListTile/genericItemWithRequirementsListTile';
import { ProcessorItemListTile } from '../../components/tilePresenter/processorItemListTile/processorItemListTile';
import { ChargeByItemListTile } from '../../components/tilePresenter/recharge/chargeByItemListTile';
import { RechargeItemListTile } from '../../components/tilePresenter/recharge/rechargeItemListTile';
import { RequiredItemDetailsListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile';
import { ProceduralStatBonusItemListTile, StatBonusItemListTile } from '../../components/tilePresenter/statBonusTile/statBonusItemListTile';
import { GameItemModel } from '../../contracts/GameItemModel';
import { ProceduralStatBonus } from '../../contracts/ProceduralStatBonus';
import { Processor } from '../../contracts/Processor';
import { ChargeBy } from '../../contracts/recharge/chargeBy';
import { Recharge } from '../../contracts/recharge/recharge';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { StatBonus } from '../../contracts/StatBonus';
import { shouldListBeCentered } from '../../helper/mathHelper';
import { LocaleKey } from '../../localization/LocaleKey';

export const displayRequiredItems = (resArray: Array<RequiredItemDetails>) => {
    if (resArray == null || resArray.length < 1) return null;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.craftedUsing)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter
                        list={resArray}
                        presenter={RequiredItemDetailsListTile}
                        isCentered={shouldListBeCentered(resArray.length)}
                    />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayUsedToCreateItems = (usedToCreateArray: Array<GameItemModel>) => {
    if (usedToCreateArray == null || usedToCreateArray.length < 1) return null;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.usedToCreate)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter
                        list={usedToCreateArray}
                        presenter={GenericItemWithRequirementsListTile}
                        isCentered={shouldListBeCentered(usedToCreateArray.length)}
                    />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayRechargedByItems = (rechargedBy: Recharge) => {
    if (rechargedBy == null || rechargedBy.ChargeBy == null || rechargedBy.ChargeBy.length < 1) return null;
    const orderedChargeBy = rechargedBy.ChargeBy.sort((a: ChargeBy, b: ChargeBy) => b.Value - a.Value);

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.rechargeThisUsing)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter
                        list={orderedChargeBy}
                        presenter={(item: ChargeBy) => <ChargeByItemListTile {...item} totalChargeAmount={rechargedBy.TotalChargeAmount} />}
                        isCentered={shouldListBeCentered(orderedChargeBy.length)}
                    />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayUsedToRechargeItems = (id: string, name: string, usedToRechargeArray: Array<Recharge>) => {
    if (usedToRechargeArray == null || usedToRechargeArray.length < 1) return null;
    const orderedUsedToRechargeArray = usedToRechargeArray.sort((a: Recharge, b: Recharge) => b.TotalChargeAmount - a.TotalChargeAmount);

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.useXToRecharge).replace('{0}', name)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter
                        list={orderedUsedToRechargeArray}
                        presenter={(item: Recharge) => <RechargeItemListTile {...item} currentItemId={id} />}
                        isCentered={shouldListBeCentered(orderedUsedToRechargeArray.length)}
                    />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayRefItems = (refRecipesArray: Array<Processor>) => {
    if (refRecipesArray == null || refRecipesArray.length < 1) return null;
    const orderedRefRecipesArray = refRecipesArray.sort((a: Processor, b: Processor) => b.Output.Quantity - a.Output.Quantity);
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.refinedUsing)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter
                        list={orderedRefRecipesArray}
                        presenter={ProcessorItemListTile}
                        isCentered={shouldListBeCentered(orderedRefRecipesArray.length)}
                    />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayUsedToRefItems = (name: string, usedToRefArray: Array<Processor>) => {
    if (usedToRefArray == null || usedToRefArray.length < 1) return null;
    const orderedUsedToRefArray = usedToRefArray.sort((a: Processor, b: Processor) => b.Output.Quantity - a.Output.Quantity);

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.refineToCreate).replace('{0}', name)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter
                        list={orderedUsedToRefArray}
                        presenter={ProcessorItemListTile}
                        isCentered={shouldListBeCentered(orderedUsedToRefArray.length)}
                    />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayCookItems = (cookRecipesArray: Array<Processor>) => {
    if (cookRecipesArray == null || cookRecipesArray.length < 1) return null;
    const orderedCookRecipesArray = cookRecipesArray.sort((a: Processor, b: Processor) => b.Output.Quantity - a.Output.Quantity);

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.cookingRecipe)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter
                        list={orderedCookRecipesArray}
                        presenter={ProcessorItemListTile}
                        isCentered={shouldListBeCentered(orderedCookRecipesArray.length)}
                    />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayUsedToCookItems = (name: string, usedToCookArray: Array<Processor>) => {
    if (usedToCookArray == null || usedToCookArray.length < 1) return null;
    const orderedUsedToCookArray = usedToCookArray.sort((a: Processor, b: Processor) => b.Output.Quantity - a.Output.Quantity);

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.cookToCreate).replace('{0}', name)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter
                        list={orderedUsedToCookArray}
                        presenter={ProcessorItemListTile}
                        isCentered={shouldListBeCentered(orderedUsedToCookArray.length)}
                    />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayStatBonuses = (statBonuses: Array<StatBonus>) => {
    if (statBonuses == null || statBonuses.length < 1) return null;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.stats)}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter
                        list={statBonuses}
                        presenter={StatBonusItemListTile}
                        isCentered={shouldListBeCentered(statBonuses.length)}
                    />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}

export const displayProceduralStatBonuses = (numStatsMin: number, numStatsMax: number, proceduralStatBonuses: Array<ProceduralStatBonus>) => {
    if (proceduralStatBonuses == null || proceduralStatBonuses.length < 1) return null;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{i18next.t(LocaleKey.proceduralStats)
                        .replace('{0}', numStatsMin.toString())
                        .replace('{1}', numStatsMax.toString())}</h3>
                </div>
                <div className="col-12">
                    <GenericListPresenter
                        list={proceduralStatBonuses}
                        presenter={ProceduralStatBonusItemListTile}
                        isCentered={shouldListBeCentered(proceduralStatBonuses.length)}
                    />
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}