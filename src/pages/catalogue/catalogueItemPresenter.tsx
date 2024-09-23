import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { AdditionalInfoChipRow, IChipProps } from '../../components/common/chip/additionalInfoChip';
import { DecriptionRegexHighlightText } from '../../components/common/descriptionRegexHighlighter';
import { ExpeditionAlphabetDecoder } from '../../components/common/expeditionAlphabetDecoder';
import { HeadComponent } from '../../components/core/headComponent';
import { ItemHeaderRow } from '../../components/core/itemHeaderRow';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { CartFloatingActionButton } from '../../components/floatingActionButton/cartFloatingActionButton';
import { FavouriteFloatingActionButton } from '../../components/floatingActionButton/favouriteFloatingActionButton';
import { PlatformFloatingActionButton } from '../../components/floatingActionButton/platformFloatingActionButton';
import { ShareDialog } from '../../components/shareDialog';
import { IdPrefix } from '../../constants/IdPrefix';
import { NetworkState } from '../../constants/NetworkState';
import { GameItemModel } from '../../contracts/GameItemModel';
import { Processor } from '../../contracts/Processor';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { BaitData } from '../../contracts/data/baitData';
import { PlatformControlMapping } from '../../contracts/data/controlMapping';
import { CreatureHarvest } from '../../contracts/data/creatureHarvest';
import { EggNeuralTrait } from '../../contracts/data/eggNeuralTrait';
import { FishingData } from '../../contracts/data/fishingData';
import { MajorUpdateItem } from '../../contracts/data/majorUpdateItem';
import { StarshipScrap } from '../../contracts/data/starshipScrap';
import { ControllerPlatformType } from '../../contracts/enum/ControllerPlatformType';
import { Recharge } from '../../contracts/recharge/recharge';
import { anyObject } from '../../helper/typescriptHacks';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';
import { ApiService } from '../../services/api/ApiService';
import { DataJsonService } from '../../services/json/DataJsonService';
import { ToastService } from '../../services/toastService';
import {
  displayBaitData,
  displayCookItems,
  displayEggTraits,
  displayExtraDetailsSection,
  displayFishData,
  displayFromUpdate,
  displayObsoleteTech,
  displayProceduralStatBonuses,
  displayRechargedByItems,
  displayRefItems,
  displayRequiredItems,
  displayRewardFrom,
  displayStatBonuses,
  displayUsedToCookItems,
  displayUsedToCreateItems,
  displayUsedToRechargeItems,
  displayUsedToRefItems,
} from './catalogueItem.Components';
import { IReduxProps } from './catalogueItem.Redux';
import { DevDetailsBottomModalSheet } from './devDetailsBottomModalSheet';

interface IProps extends IReduxProps {
  // Container State
  item: GameItemModel;
  requiredItems: Array<RequiredItemDetails>;
  usedToCreate: Array<GameItemModel>;
  refined: Array<Processor>;
  usedToRefine: Array<Processor>;
  cooking: Array<Processor>;
  usedToCook: Array<Processor>;
  rechargedBy: Recharge;
  usedToRecharge: Array<Recharge>;
  eggTrait: Array<EggNeuralTrait>;
  controlLookup: Array<PlatformControlMapping>;
  starshipScrapItems: Array<StarshipScrap>;
  creatureHarvests: Array<CreatureHarvest>;
  addedInUpdate: Array<MajorUpdateItem>;
  fishData: Array<FishingData>;
  baitData: Array<BaitData>;
  additionalData: Array<IChipProps>;

  networkState: NetworkState;

  toastService: ToastService;
  dataJsonService: DataJsonService;
  apiService: ApiService;

  // Container Specific
  addThisItemToCart: () => void;
  addThisItemToFavourites: () => void;
  removeThisItemToFavourites: () => void;
  updateControlLookup: (newPlatform: ControllerPlatformType) => void;
}

export const CatalogueItemPresenter: React.FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();
  const [isDetailPaneOpen, setDetailPaneOpen] = useState<boolean>(false);

  const getFloatingActionButtons = (allItems: boolean): Array<JSX.Element> => {
    const components: Array<JSX.Element> = [];
    if (props.item == null || props.item.Id == null) return components;

    if (allItems === true && (props.item.Description ?? '').includes('<IMG>')) {
      components.push(
        <PlatformFloatingActionButton
          dataKey="platform-dialog"
          value={props.controlPlatform}
          onClick={(newPlatform: ControllerPlatformType) => {
            props.setPlatform(newPlatform);
            props.updateControlLookup(newPlatform);
          }}
        />,
      );
    }

    const shareDialogProps = {
      id: props.item.Id,
      itemName: props.item.Name,
      selectedLanguage: props.selectedLanguage!,
      toastService: props.toastService,
    };
    components.push(<ShareDialog key="share-dialog" {...shareDialogProps} />);

    if (!props.item.Id.includes(IdPrefix.Cooking)) {
      components.push(CartFloatingActionButton(props.addThisItemToCart));
    }
    const isFavourited = props.favourites.find((f) => f.Id === props.item.Id) != null;
    components.push(FavouriteFloatingActionButton(isFavourited, props.addThisItemToFavourites, props.removeThisItemToFavourites));
    return components;
  };

  const handleLoadingOrError = () => {
    if (props.networkState === NetworkState.Loading)
      return (
        <div className="pt-5">
          <SmallLoading />
        </div>
      );
    if (props.networkState === NetworkState.Error) {
      return <h2>{translate(LocaleKey.error)}</h2>;
    }
    return displayDetails();
  };

  const displayDetails = () => {
    return (
      <DefaultAnimation>
        <div className="content">
          <ItemHeaderRow {...props.item} controlLookup={props.controlLookup} openDevProperties={() => setDetailPaneOpen(!isDetailPaneOpen)}>
            <ExpeditionAlphabetDecoder id={props.item.Id} />
            {props.item.ConsumableRewardTexts != null && props.item.ConsumableRewardTexts.length > 0 && (
              <div className="consumable-rewards">
                {props.item.ConsumableRewardTexts.map((consRew) => (
                  <DecriptionRegexHighlightText key={consRew} orig={consRew} controlLookup={props.controlLookup} />
                ))}
              </div>
            )}
          </ItemHeaderRow>
          <AdditionalInfoChipRow additionalData={props.additionalData} />
          {displayExtraDetailsSection(props.item)}

          {displayObsoleteTech(props.item.Usages)}
          {displayRequiredItems(props.requiredItems, navigate)}
          {displayUsedToCreateItems(props.usedToCreate)}
          {displayRechargedByItems(props.rechargedBy)}
          {displayUsedToRechargeItems(props.item.Id, props.item.Name, props.usedToRecharge)}
          {displayRefItems(props.refined)}
          {displayUsedToRefItems(props.item.Name, props.usedToRefine)}
          {displayCookItems(props.cooking)}
          {displayUsedToCookItems(props.item.Name, props.usedToCook)}
          {displayStatBonuses(props.item.StatBonuses)}
          {displayProceduralStatBonuses(props.item.NumStatsMin, props.item.NumStatsMax, props.item.ProceduralStatBonuses)}
          {displayRewardFrom(props.item, props.starshipScrapItems, props.creatureHarvests)}
          {displayEggTraits(props.eggTrait)}
          {displayFishData(props.fishData)}
          {displayBaitData(props.item.Id, props.apiService, props.baitData, props.selectedLanguage)}
          {displayFromUpdate(props.addedInUpdate)}
        </div>
        <DevDetailsBottomModalSheet
          appId={props.item.Id}
          isDetailPaneOpen={isDetailPaneOpen}
          dataJsonService={props.dataJsonService}
          setDetailPaneOpen={() => setDetailPaneOpen(false)}
        />
      </DefaultAnimation>
    );
  };

  const { Name: title, Description: description, Id: id } = props?.item ?? anyObject;
  return (
    <>
      <HeadComponent
        id={id}
        title={title}
        description={description}
        selectedLanguage={props.selectedLanguage}
      // updateUrl={true}
      />
      <NavBar title={title} additionalItems={getFloatingActionButtons(true)} />
      {handleLoadingOrError()}

      {getFloatingActionButtons(false)}
      <div className="col-12" style={{ marginTop: '8em' }}></div>
    </>
  );
};
