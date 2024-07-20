import React, { useEffect, useState } from 'react';

import { translate } from '../../localization/Translate';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { CommunitySearchViewModel } from '../../contracts/other/communitySearchViewModel';
import { CommunitySearchChipColourViewModel } from '../../contracts/other/communitySearchChipColourViewModel';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { ApiService } from '../../services/api/ApiService';
import { CommunitySearchListTile } from '../../components/tilePresenter/community/communitySearchListTile';
import { SearchBar } from '../../components/common/searchBar';
import { CommunitySearchBottomModalSheet } from '../../components/tilePresenter/community/communitySearchBottomModalSheet';

interface IWithDepInj {
  apiService: ApiService;
}
interface IWithoutDepInj {}
interface IProps extends IWithDepInj, IWithoutDepInj {}

export const CommunityLinksPageUnconnected: React.FC<IProps> = (props: IProps) => {
  const [communityLinks, setCommunityLinks] = useState<Array<CommunitySearchViewModel>>([]);
  const [chipColours, setChipColours] = useState<Array<CommunitySearchChipColourViewModel>>([]);
  const [networkStatus, setStatus] = useState<NetworkState>(NetworkState.Loading);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<CommunitySearchViewModel>();

  const gridPresenter = CommunitySearchListTile(chipColours, (newItem: CommunitySearchViewModel) => setSelectedItem(newItem));

  useEffect(() => {
    fetchCommunityLinks();
    fetchCommunityLinkChipColours();
  }, []);

  const fetchCommunityLinks = async () => {
    const communityLinksResult = await props.apiService.getCommunityLinks();
    if (!communityLinksResult.isSuccess) {
      setCommunityLinks([]);
      setStatus(NetworkState.Error);
      return;
    }

    setCommunityLinks(communityLinksResult.value);
    setStatus(NetworkState.Success);
  };

  const fetchCommunityLinkChipColours = async () => {
    const communityLinkChipColoursResult = await props.apiService.getCommunityLinksChipColours();
    if (!communityLinkChipColoursResult.isSuccess) {
      setChipColours([]);
      setStatus(NetworkState.Error);
      return;
    }

    setChipColours(communityLinkChipColoursResult.value);
    setStatus(NetworkState.Success);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSearchTextChange = (e: any) => {
    e?.persist?.();

    const searchValue = e?.target?.value || '';
    if (searchTerm === searchValue) return;

    setSearchTerm(searchValue);
  };

  const getDisplayItems = (localItems: Array<CommunitySearchViewModel>, searchText?: string): Array<CommunitySearchViewModel> => {
    const newDisplayItems = new Array<CommunitySearchViewModel>();
    for (const item of localItems) {
      if (searchText != null) {
        if (
          item.name.toLowerCase().includes(searchText.toLowerCase()) === false &&
          item.tags.findIndex((t) => t.toLowerCase().includes(searchText.toLowerCase())) < 0
        )
          continue;
      }
      newDisplayItems.push(item);
    }
    return newDisplayItems;
  };

  const displayComunityLinks = (communityLinks: Array<CommunitySearchViewModel>) => {
    if (networkStatus === NetworkState.Loading) {
      return <SmallLoading />;
    }

    if (networkStatus === NetworkState.Error) {
      return <Error />;
    }

    if (communityLinks == null || communityLinks.length === 0) return <h2>{translate(LocaleKey.noItems)}</h2>;

    return (
      <GenericListPresenter
        list={getDisplayItems(communityLinks, searchTerm)}
        presenter={gridPresenter}
        identifier={(item: CommunitySearchViewModel) => item.name + item.tags.join(',')}
      />
    );
  };

  const title = translate(LocaleKey.communityLinks);
  return (
    <DefaultAnimation>
      <HeadComponent title={title} />
      <NavBar title={title} />
      <div data-id="CommunityLinks" className="content">
        <SearchBar searchTerm={searchTerm} onSearchTextChange={onSearchTextChange} />
        <div className="row full pb5">
          <div className="col-12 community-search-list">{displayComunityLinks(communityLinks)}</div>
        </div>
        <CommunitySearchBottomModalSheet
          isModalOpen={selectedItem != null}
          itemToDisplay={selectedItem!}
          chipColours={chipColours}
          setModalClosed={() => setSelectedItem(undefined)}
        />
      </div>
    </DefaultAnimation>
  );
};

export const CommunityLinksPage = withServices<IWithoutDepInj, IWithDepInj>(CommunityLinksPageUnconnected, (services: IDependencyInjection) => ({
  apiService: services.apiService,
}));
