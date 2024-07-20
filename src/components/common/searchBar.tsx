import React from 'react';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';

interface IProps {
  searchTerm: string;
  onSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<IProps> = (props: IProps) => {
  return (
    <form id="searchBar" className="searchbar row noselect">
      <input
        type="text"
        className="form-control"
        placeholder={translate(LocaleKey.search)}
        value={props.searchTerm}
        onChange={props.onSearchTextChange}
      />
      <button className="icon-container pointer" type="submit">
        <i className="material-icons" title="search">
          search
        </i>
      </button>
    </form>
  );
};
