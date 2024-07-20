import classNames from 'classnames';
import React from 'react';

import { GameItemFromDevDetailsListTile } from '../../../components/tilePresenter/gameItemListTile/gameItemFromDevDetailsListTile';
import { DevDetail } from '../../../contracts/data/devDetail';
import { shouldListBeCentered } from '../../../helper/mathHelper';
import { OnClickEvent } from '../../../helper/typescriptHacks';
import { GenericListPresenter } from '../genericListPresenter/genericListPresenter';

interface IProps {
  searchText?: string;
  selectedSearchResult: number;
  searchResults: Array<DevDetail>;
  setSelectedSearchResult: (newIndex: number) => void;
  openItem: (devItem: DevDetail) => (e: OnClickEvent) => void;
}

export const SpotlightSearchResult: React.FC<IProps> = (props: IProps) => {
  return (
    <div
      key="spotlight"
      className={classNames('spotlight-results-bg mt-1em', {
        isOpen: props.searchResults.length > 0,
      })}
    >
      <GenericListPresenter
        list={props.searchResults}
        presenter={(devd: DevDetail) => (
          <GameItemFromDevDetailsListTile key={devd.Id} Id={devd.Id} Properties={devd.Properties} searchText={props.searchText} />
        )}
        bootstrapClasses={'col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12'}
        identifier={(devd: DevDetail) => devd.Id}
        isCentered={shouldListBeCentered(props.searchResults.length)}
        hideViewMoreButton={true}
        limitResultsTo={45}
      />
    </div>
  );
};
