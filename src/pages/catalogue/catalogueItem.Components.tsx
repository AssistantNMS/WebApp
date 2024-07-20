import React, { ReactNode } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { PositiveButton } from '../../components/common/button/positiveButton';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { EggTraitListTile } from '../../components/tilePresenter/eggTraitTile/eggTraitListTile';
import { GenericItemWithRequirementsListTile } from '../../components/tilePresenter/genericItemListTile/genericItemWithRequirementsListTile';
import { CronusCookingListTile } from '../../components/tilePresenter/processorItemListTile/cronusCookingTile';
import { ProcessorItemListTile } from '../../components/tilePresenter/processorItemListTile/processorItemListTile';
import { ChargeByItemListTile } from '../../components/tilePresenter/recharge/chargeByItemListTile';
import { RechargeItemListTile } from '../../components/tilePresenter/recharge/rechargeItemListTile';
import { RequiredItemDetailsListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile';
import { RequiredItemListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemListTile';
import { RewardFromCreatureHarvestTile } from '../../components/tilePresenter/rewardFromTile/rewardFromCreatureHarvestPresenter';
import { RewardFromSeasonalExpeditionTile } from '../../components/tilePresenter/rewardFromTile/rewardFromSeasonalExpeditionPresenter';
import { RewardFromStarshipScrapTile } from '../../components/tilePresenter/rewardFromTile/rewardFromStarshipScrapPresenter';
import { RewardFromTwitchTile } from '../../components/tilePresenter/rewardFromTile/rewardFromTwitchPresenter';
import { RewardFromQuicksilverTile } from '../../components/tilePresenter/rewardFromTile/rewardTilePresenter';
import { ProceduralStatBonusItemListTile, StatBonusItemListTile } from '../../components/tilePresenter/statBonusTile/statBonusItemListTile';
import { UpdateItemListTile } from '../../components/tilePresenter/updateItemTilePresenter';
import { IdPrefix } from '../../constants/IdPrefix';
import * as Route from '../../constants/Route';
import { UsageKey } from '../../constants/UsageKey';
import { CreatureHarvest } from '../../contracts/data/creatureHarvest';
import { EggNeuralTrait } from '../../contracts/data/eggNeuralTrait';
import { MajorUpdateItem } from '../../contracts/data/majorUpdateItem';
import { StarshipScrap } from '../../contracts/data/starshipScrap';
import { CurrencyType } from '../../contracts/enum/CurrencyType';
import { GameItemModel } from '../../contracts/GameItemModel';
import { ProceduralStatBonus } from '../../contracts/ProceduralStatBonus';
import { Processor } from '../../contracts/Processor';
import { ChargeBy } from '../../contracts/recharge/chargeBy';
import { Recharge } from '../../contracts/recharge/recharge';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { StatBonus } from '../../contracts/StatBonus';
import { shouldListBeCentered } from '../../helper/mathHelper';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';

export const displayRequiredItems = (resArray: Array<RequiredItemDetails>, navigate: NavigateFunction) => {
  if (resArray == null || resArray.length < 1) return null;

  return (
    <CommonSection
      heading={translate(LocaleKey.craftedUsing)}
      content={
        <>
          <GenericListPresenter
            list={resArray}
            presenter={RequiredItemDetailsListTile}
            isCentered={shouldListBeCentered(resArray.length)}
            limitResultsTo={9}
          />
          {resArray.filter((r) => !r.Id.includes(IdPrefix.RawMaterial)).length > 0 && (
            <PositiveButton
              additionalClass="mt-1em"
              onClick={() =>
                navigate(Route.genericAllRequirements, {
                  state: {
                    typeName: translate(LocaleKey.cart),
                    requiredItems: resArray,
                  },
                })
              }
            >
              <span>{translate(LocaleKey.viewAllRawMaterialsRequired)}</span>
            </PositiveButton>
          )}
        </>
      }
    />
  );
};

export const displayUsedToCreateItems = (usedToCreateArray: Array<GameItemModel>) => {
  if (usedToCreateArray == null || usedToCreateArray.length < 1) return null;

  return (
    <CommonSection
      heading={translate(LocaleKey.usedToCreate)}
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
};

export const displayRechargedByItems = (rechargedBy: Recharge) => {
  if (rechargedBy == null || rechargedBy.ChargeBy == null || rechargedBy.ChargeBy.length < 1) return null;
  const orderedChargeBy = rechargedBy.ChargeBy.sort((a: ChargeBy, b: ChargeBy) => b.Value - a.Value);

  return (
    <CommonSection
      heading={translate(LocaleKey.rechargeThisUsing)}
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
};

export const displayUsedToRechargeItems = (id: string, name: string, usedToRechargeArray: Array<Recharge>) => {
  if (usedToRechargeArray == null || usedToRechargeArray.length < 1) return null;
  const orderedUsedToRechargeArray = usedToRechargeArray.sort((a: Recharge, b: Recharge) => b.TotalChargeAmount - a.TotalChargeAmount);

  return (
    <CommonSection
      heading={translate(LocaleKey.useXToRecharge).replace('{0}', name)}
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
};

export const displayRefItems = (refRecipesArray: Array<Processor>) => {
  if (refRecipesArray == null || refRecipesArray.length < 1) return null;
  const orderedRefRecipesArray = refRecipesArray.sort((a: Processor, b: Processor) => b.Output.Quantity - a.Output.Quantity);

  return (
    <CommonSection
      heading={translate(LocaleKey.refinedUsing)}
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
};

export const displayUsedToRefItems = (name: string, usedToRefArray: Array<Processor>) => {
  if (usedToRefArray == null || usedToRefArray.length < 1) return null;
  const orderedUsedToRefArray = usedToRefArray.sort((a: Processor, b: Processor) => b.Output.Quantity - a.Output.Quantity);

  return (
    <CommonSection
      heading={translate(LocaleKey.refineToCreate).replace('{0}', name)}
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
};

export const displayCookItems = (cookRecipesArray: Array<Processor>) => {
  if (cookRecipesArray == null || cookRecipesArray.length < 1) return null;
  const orderedCookRecipesArray = cookRecipesArray.sort((a: Processor, b: Processor) => b.Output.Quantity - a.Output.Quantity);

  return (
    <CommonSection
      heading={translate(LocaleKey.cookingRecipe)}
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
};

export const displayUsedToCookItems = (name: string, usedToCookArray: Array<Processor>) => {
  if (usedToCookArray == null || usedToCookArray.length < 1) return null;
  const orderedUsedToCookArray = usedToCookArray.sort((a: Processor, b: Processor) => b.Output.Quantity - a.Output.Quantity);

  return (
    <CommonSection
      heading={translate(LocaleKey.cookToCreate).replace('{0}', name)}
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
};

export const displayStatBonuses = (statBonuses: Array<StatBonus>) => {
  if (statBonuses == null || statBonuses.length < 1) return null;

  return (
    <CommonSection
      heading={translate(LocaleKey.stats)}
      content={<GenericListPresenter list={statBonuses} presenter={StatBonusItemListTile} isCentered={shouldListBeCentered(statBonuses.length)} />}
    />
  );
};

export const displayProceduralStatBonuses = (numStatsMin: number, numStatsMax: number, proceduralStatBonuses: Array<ProceduralStatBonus>) => {
  if (proceduralStatBonuses == null || proceduralStatBonuses.length < 1) return null;

  return (
    <CommonSection
      heading={translate(LocaleKey.proceduralStats).replace('{0}', numStatsMin.toString()).replace('{1}', numStatsMax.toString())}
      content={
        <GenericListPresenter
          list={proceduralStatBonuses as unknown as Array<StatBonus>}
          presenter={ProceduralStatBonusItemListTile}
          isCentered={shouldListBeCentered(proceduralStatBonuses.length)}
        />
      }
    />
  );
};

export const displayEggTraits = (eggTraitArray: Array<EggNeuralTrait>) => {
  if (eggTraitArray == null || eggTraitArray.length < 1) return null;

  return (
    <CommonSection
      heading={translate(LocaleKey.eggModification)}
      content={<GenericListPresenter list={eggTraitArray} presenter={EggTraitListTile} isCentered={shouldListBeCentered(eggTraitArray.length)} />}
    />
  );
};

export const displayFromUpdate = (addedInUpdateArray: Array<MajorUpdateItem>) => {
  if (addedInUpdateArray == null || addedInUpdateArray.length < 1) return null;

  return (
    <CommonSection
      heading={translate(LocaleKey.addedInUpdate)}
      content={
        <GenericListPresenter
          list={addedInUpdateArray}
          presenter={(listItem) => <UpdateItemListTile {...listItem} />}
          isCentered={shouldListBeCentered(addedInUpdateArray.length)}
        />
      }
    />
  );
};

export const displayObsoleteTech = (usages: Array<string>) => {
  if (usages == null || usages.length < 1) return null;
  if (!usages.includes(UsageKey.isNoLongerObtainable)) return null;

  return (
    <CommonSection
      heading={''}
      content={
        <GenericListPresenter
          list={[
            {
              Id: 'tech16',
              Quantity: 0,
            },
          ]}
          presenter={RequiredItemListTile}
          isCentered={true}
        />
      }
    />
  );
};

export const displayExtraDetailsSection = (gameItem: GameItemModel) => {
  const displayItems = [];

  if ((gameItem?.CookingValue ?? 0) > 0.0) {
    displayItems.push(
      <div key="cronus-cooking" className="gen-item col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <CronusCookingListTile cookingValue={gameItem.CookingValue} />
      </div>,
    );
  }

  if (displayItems.length < 1) return null;

  return <div className="generic-item-list row justify">{displayItems}</div>;
};

const usageContains = (usages: Array<string>, usageKey: string): boolean => usages.filter((u) => u.includes(usageKey)).length > 0;

export const displayRewardFrom = (item: GameItemModel, starshipScrapItems: Array<StarshipScrap>, creatureHarvests: Array<CreatureHarvest>) => {
  const usages: Array<string> = item.Usages;
  if (usages == null || usages.length < 1) return null;
  // if (!usages.includes(UsageKey.isNoLongerObtainable)) return null;

  const nodes: Array<JSX.Element> = [];

  try {
    if (usageContains(usages, UsageKey.isQuicksilver)) {
      if (item.BaseValueUnits > 0 && item.CurrencyType === CurrencyType.QUICKSILVER) {
        nodes.push(<RewardFromQuicksilverTile qsQuantity={item.BaseValueUnits.toString()} />);
      }
    }

    for (const usageKey of usages) {
      const expSeasonKeySplit = UsageKey.isExpeditionSeason.split('{0}');
      if (usageKey.includes(expSeasonKeySplit[0])) {
        const expSeasonNum = usageKey.replaceAll(expSeasonKeySplit[0], '').replaceAll(expSeasonKeySplit[1], '');

        nodes.push(<RewardFromSeasonalExpeditionTile seasId={`seas-${expSeasonNum}`} />);
      }

      const twitchCampaignKeySplit = UsageKey.isTwitchCampaign.split('{0}');
      if (usageKey.includes(twitchCampaignKeySplit[0])) {
        const expSeasonNum = usageKey.replaceAll(twitchCampaignKeySplit[0], '').replaceAll(twitchCampaignKeySplit[1], '');
        nodes.push(<RewardFromTwitchTile campaignId={expSeasonNum} />);
      }
    }

    if (usageContains(usages, UsageKey.isRewardFromShipScrap)) {
      nodes.push(<RewardFromStarshipScrapTile itemId={item.Id} starshipScrapItems={starshipScrapItems} />);
    }

    if (usageContains(usages, UsageKey.hasCreatureHarvest)) {
      const localCreatureHarvs = creatureHarvests ?? [];
      if (localCreatureHarvs.length > 0) {
        for (const localCreatureHarv of localCreatureHarvs) {
          nodes.push(<RewardFromCreatureHarvestTile creatureHarvest={localCreatureHarv} />);
        }
      }
    }
  } catch (ex) {
    /* empty */
  }

  if (nodes == null || nodes.length < 1) return null;
  return (
    <CommonSection
      heading={translate(LocaleKey.rewardFrom)}
      content={<GenericListPresenter list={nodes} presenter={(node: JSX.Element) => node} isCentered={true} />}
    />
  );
};

interface ICommonSectionProps {
  heading: string;
  content: ReactNode;
}
export const CommonSection: React.FC<ICommonSectionProps> = (props: ICommonSectionProps) => {
  return (
    <>
      <div className="row noselect">
        <div className="col-12">
          <h3>{props.heading}</h3>
        </div>
        <div className="col-12">{props.content}</div>
      </div>
      <hr className="mt-3em" />
    </>
  );
};
