import i18next from 'i18next';
import React, { ReactNode } from 'react';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { EggTraitListTile } from '../../components/tilePresenter/eggTraitTile/eggTraitListTile';
import { GenericItemWithRequirementsListTile } from '../../components/tilePresenter/genericItemListTile/genericItemWithRequirementsListTile';
import { ProcessorItemListTile } from '../../components/tilePresenter/processorItemListTile/processorItemListTile';
import { ChargeByItemListTile } from '../../components/tilePresenter/recharge/chargeByItemListTile';
import { RechargeItemListTile } from '../../components/tilePresenter/recharge/rechargeItemListTile';
import { RequiredItemDetailsListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile';
import { ProceduralStatBonusItemListTile, StatBonusItemListTile } from '../../components/tilePresenter/statBonusTile/statBonusItemListTile';
import { EggNeuralTrait } from '../../contracts/data/eggNeuralTrait';
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
        <CommonSection
            heading={i18next.t(LocaleKey.craftedUsing)}
            content={
                <GenericListPresenter
                    list={resArray}
                    presenter={RequiredItemDetailsListTile}
                    isCentered={shouldListBeCentered(resArray.length)}
                    limitResultsTo={9}
                />
            }
        />
    );
}

export const displayUsedToCreateItems = (usedToCreateArray: Array<GameItemModel>) => {
    if (usedToCreateArray == null || usedToCreateArray.length < 1) return null;

    return (
        <CommonSection
            heading={i18next.t(LocaleKey.usedToCreate)}
            content={
                <GenericListPresenter
                    list={usedToCreateArray}
                    presenter={GenericItemWithRequirementsListTile}
                    isCentered={shouldListBeCentered(usedToCreateArray.length)}
                    limitResultsTo={9}
                />
            }
        />
    );
}

export const displayRechargedByItems = (rechargedBy: Recharge) => {
    if (rechargedBy == null || rechargedBy.ChargeBy == null || rechargedBy.ChargeBy.length < 1) return null;
    const orderedChargeBy = rechargedBy.ChargeBy.sort((a: ChargeBy, b: ChargeBy) => b.Value - a.Value);

    return (
        <CommonSection
            heading={i18next.t(LocaleKey.rechargeThisUsing)}
            content={
                <GenericListPresenter
                    list={orderedChargeBy}
                    presenter={(item: ChargeBy) => <ChargeByItemListTile {...item} totalChargeAmount={rechargedBy.TotalChargeAmount} />}
                    isCentered={shouldListBeCentered(orderedChargeBy.length)}
                    limitResultsTo={9}
                />
            }
        />
    );
}

export const displayUsedToRechargeItems = (id: string, name: string, usedToRechargeArray: Array<Recharge>) => {
    if (usedToRechargeArray == null || usedToRechargeArray.length < 1) return null;
    const orderedUsedToRechargeArray = usedToRechargeArray.sort((a: Recharge, b: Recharge) => b.TotalChargeAmount - a.TotalChargeAmount);

    return (
        <CommonSection
            heading={i18next.t(LocaleKey.useXToRecharge).replace('{0}', name)}
            content={
                <GenericListPresenter
                    list={orderedUsedToRechargeArray}
                    presenter={(item: Recharge) => <RechargeItemListTile {...item} currentItemId={id} />}
                    isCentered={shouldListBeCentered(orderedUsedToRechargeArray.length)}
                    limitResultsTo={9}
                />
            }
        />
    );
}

export const displayRefItems = (refRecipesArray: Array<Processor>) => {
    if (refRecipesArray == null || refRecipesArray.length < 1) return null;
    const orderedRefRecipesArray = refRecipesArray.sort((a: Processor, b: Processor) => b.Output.Quantity - a.Output.Quantity);

    return (
        <CommonSection
            heading={i18next.t(LocaleKey.refinedUsing)}
            content={
                <GenericListPresenter
                    list={orderedRefRecipesArray}
                    presenter={ProcessorItemListTile}
                    isCentered={shouldListBeCentered(orderedRefRecipesArray.length)}
                    limitResultsTo={9}
                />
            }
        />
    );
}

export const displayUsedToRefItems = (name: string, usedToRefArray: Array<Processor>) => {
    if (usedToRefArray == null || usedToRefArray.length < 1) return null;
    const orderedUsedToRefArray = usedToRefArray.sort((a: Processor, b: Processor) => b.Output.Quantity - a.Output.Quantity);

    return (
        <CommonSection
            heading={i18next.t(LocaleKey.refineToCreate).replace('{0}', name)}
            content={
                <GenericListPresenter
                    list={orderedUsedToRefArray}
                    presenter={ProcessorItemListTile}
                    isCentered={shouldListBeCentered(orderedUsedToRefArray.length)}
                    limitResultsTo={9}
                />
            }
        />
    );
}

export const displayCookItems = (cookRecipesArray: Array<Processor>) => {
    if (cookRecipesArray == null || cookRecipesArray.length < 1) return null;
    const orderedCookRecipesArray = cookRecipesArray.sort((a: Processor, b: Processor) => b.Output.Quantity - a.Output.Quantity);

    return (
        <CommonSection
            heading={i18next.t(LocaleKey.cookingRecipe)}
            content={
                <GenericListPresenter
                    list={orderedCookRecipesArray}
                    presenter={ProcessorItemListTile}
                    isCentered={shouldListBeCentered(orderedCookRecipesArray.length)}
                    limitResultsTo={9}
                />
            }
        />
    );
}

export const displayUsedToCookItems = (name: string, usedToCookArray: Array<Processor>) => {
    if (usedToCookArray == null || usedToCookArray.length < 1) return null;
    const orderedUsedToCookArray = usedToCookArray.sort((a: Processor, b: Processor) => b.Output.Quantity - a.Output.Quantity);

    return (
        <CommonSection
            heading={i18next.t(LocaleKey.cookToCreate).replace('{0}', name)}
            content={
                <GenericListPresenter
                    list={orderedUsedToCookArray}
                    presenter={ProcessorItemListTile}
                    isCentered={shouldListBeCentered(orderedUsedToCookArray.length)}
                    limitResultsTo={9}
                />
            }
        />
    );
}

export const displayStatBonuses = (statBonuses: Array<StatBonus>) => {
    if (statBonuses == null || statBonuses.length < 1) return null;

    return (
        <CommonSection
            heading={i18next.t(LocaleKey.stats)}
            content={
                <GenericListPresenter
                    list={statBonuses}
                    presenter={StatBonusItemListTile}
                    isCentered={shouldListBeCentered(statBonuses.length)}
                />
            }
        />
    );
}

export const displayProceduralStatBonuses = (numStatsMin: number, numStatsMax: number, proceduralStatBonuses: Array<ProceduralStatBonus>) => {
    if (proceduralStatBonuses == null || proceduralStatBonuses.length < 1) return null;

    return (
        <CommonSection
            heading={i18next.t(LocaleKey.proceduralStats)
                .replace('{0}', numStatsMin.toString())
                .replace('{1}', numStatsMax.toString())}
            content={
                <GenericListPresenter
                    list={proceduralStatBonuses}
                    presenter={ProceduralStatBonusItemListTile}
                    isCentered={shouldListBeCentered(proceduralStatBonuses.length)}
                />
            }
        />
    );
}

export const displayEggTraits = (eggTraitArray: Array<EggNeuralTrait>) => {
    if (eggTraitArray == null || eggTraitArray.length < 1) return null;

    return (
        <CommonSection
            heading={i18next.t(LocaleKey.eggModification)}
            content={
                <GenericListPresenter
                    list={eggTraitArray}
                    presenter={EggTraitListTile}
                    isCentered={shouldListBeCentered(eggTraitArray.length)}
                />
            }
        />
    );
}

interface ICommonSectionProps {
    heading: string;
    content: ReactNode;
}
export const CommonSection: React.FC<ICommonSectionProps> = (props: ICommonSectionProps) => {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h3>{props.heading}</h3>
                </div>
                <div className="col-12">
                    {props.content}
                </div>
            </div>
            <hr className="mt-3em" />
        </>
    );
}