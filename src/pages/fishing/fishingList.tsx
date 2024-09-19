import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { DropDown } from '../../components/common/dropdown/dropdown';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { PatreonBlock } from '../../components/common/patreon/patreonBlock';
import { SearchBar } from '../../components/common/searchBar';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { Loading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { FishingDataListTile } from '../../components/tilePresenter/fishingTile/fishingDataListTile';
import { NetworkState } from '../../constants/NetworkState';
import { patreonUnlockDate } from '../../constants/Patreon';
import { FishingData } from '../../contracts/data/fishingData';
import { shouldListBeCentered } from '../../helper/mathHelper';
import { capitaliseFirstChar } from '../../helper/stringHelper';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';
import { GameItemService } from '../../services/json/GameItemService';
import { IReduxProps, mapStateToProps } from './fishingList.Redux';

interface IWithDepInj {
  gameItemService: GameItemService;
}
interface IWithoutDepInj { }

interface IProps extends IWithDepInj, IWithoutDepInj, IReduxProps { }

interface ISearchState {
  search: string;
  biome?: string;
  time?: string;
  size?: string;
}

const defaultDisplayValue = '...';

export const FishingListPageUnconnected: React.FC<IProps> = (props: IProps) => {
  const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);
  const [items, setItems] = useState<Array<FishingData>>([]);
  const [biomes, setBiomes] = useState<Array<string>>([]);
  const [times, setTimes] = useState<Array<string>>([]);
  const [size, setSize] = useState<Array<string>>([]);
  const [searchState, setSearchState] = useState<ISearchState>({
    search: '',
    biome: undefined,
    time: undefined,
    size: undefined,
  });

  const defaultOption = { title: '❌', value: undefined as unknown as string }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const itemsResult = await props.gameItemService.getAllFishing();
    if (!itemsResult.isSuccess) {
      // Error
      return;
    }

    const biomesRecord: Record<string, string> = {};
    const timesRecord: Record<string, string> = {};
    const sizeRecord: Record<string, string> = {};

    for (const item of itemsResult.value) {
      for (const biome of item.Biomes) {
        biomesRecord[biome] = biome;
      }
      timesRecord[item.Time] = item.Time;
      sizeRecord[item.Size] = item.Size;
    }

    setItems(itemsResult.value);
    setBiomes(Object.values(biomesRecord));
    setTimes(Object.values(timesRecord));
    setSize(Object.values(sizeRecord));
    setNetworkState(NetworkState.Success);
  };

  const onSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e?.persist?.();

    const searchValue = e?.target?.value || '';
    if (searchState.search === searchValue) return;

    setSearchState(prev => ({
      ...prev,
      search: searchValue
    }));
  };

  const getDisplayItems = (localItems: Array<FishingData>, searchState?: ISearchState): Array<FishingData> => {
    const newDisplayItems = [];
    for (const item of localItems) {
      if (searchState?.search != null) {
        if (!item.Name.toLowerCase().includes(searchState?.search.trim().toLowerCase())) continue;
      }
      if (searchState?.biome != null) {
        if (!item.Biomes.map(b => b.toLocaleLowerCase()).includes(searchState.biome.toLocaleLowerCase())) continue;
      }
      if (searchState?.time != null) {
        if (!item.Time.toLocaleLowerCase().includes(searchState.time.toLocaleLowerCase())) continue;
      }
      if (searchState?.size != null) {
        if (!item.Size.toLocaleLowerCase().includes(searchState.size.toLocaleLowerCase())) continue;
      }
      newDisplayItems.push(item);
    }
    return newDisplayItems;
  };

  const renderContent = () => {
    if (networkState === NetworkState.Loading) return <Loading />;
    if (networkState === NetworkState.Error) return <Error />;

    const displayItems = getDisplayItems(items, searchState);

    return (
      <div className="col-12">
        <GenericListPresenter
          list={displayItems}
          identifier={item => item.Id}
          presenter={FishingDataListTile}
          isCentered={shouldListBeCentered(displayItems.length)}
        />
      </div>
    );
  };

  const title = translate(LocaleKey.fishingLocation);
  return (
    <DefaultAnimation>
      <HeadComponent title={title} />
      <NavBar title={title} />
      <div className="content" data-id="FishingList">
        <PatreonBlock dateAvailable={patreonUnlockDate.fishing}>
          <>
            <SearchBar searchTerm={searchState.search} onSearchTextChange={onSearchTextChange} />
            <div className="row">
              <div className="col-4 mb-3">
                <DropDown
                  btnPrefix={`${translate(LocaleKey.biome)}: `}
                  defaultValue={defaultDisplayValue}
                  options={[defaultOption, ...biomes.map(d => ({ title: capitaliseFirstChar(d), value: d }))]}
                  onClick={(value) => setSearchState(prev => ({ ...prev, biome: value }))}
                />
              </div>
              <div className="col-4 mb-3">
                <DropDown
                  btnPrefix={`${translate(LocaleKey.time)}: `}
                  defaultValue={defaultDisplayValue}
                  options={[defaultOption, ...times.map(d => ({ title: capitaliseFirstChar(d), value: d }))]}
                  onClick={(value) => setSearchState(prev => ({ ...prev, time: value }))}
                />
              </div>
              <div className="col-4 mb-3">
                <DropDown
                  btnPrefix={`${translate(LocaleKey.size)}: `}
                  defaultValue={defaultDisplayValue}
                  options={[defaultOption, ...size.map(d => ({ title: capitaliseFirstChar(d), value: d }))]}
                  onClick={(value) => setSearchState(prev => ({ ...prev, size: value }))}
                />
              </div>
              {renderContent()}
            </div>
          </>
        </PatreonBlock>
      </div>
    </DefaultAnimation>
  );
};

export const FishingListPage = withServices<IWithoutDepInj, IWithDepInj>(
  connect(mapStateToProps)(FishingListPageUnconnected),
  (services: IDependencyInjection) => ({
    gameItemService: services.gameItemService,
  }),
);
