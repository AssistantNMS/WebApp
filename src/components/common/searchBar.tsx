import i18next from 'i18next';
import React from 'react';
import { LocaleKey } from '../../localization/LocaleKey';

interface IProps {
    searchTerm: string;
    onSearchTextChange: (e: any) => void;
}

export const SearchBar: React.FC<IProps> = (props: IProps) => {
    return (
        <form id="searchBar" className="searchbar row noselect">
            <input type="text"
                className="form-control"
                placeholder={i18next.t(LocaleKey.search)}
                value={props.searchTerm}
                onChange={props.onSearchTextChange}
            />
            <button className="icon-container pointer" type="submit">
                <i className="material-icons">search</i>
            </button>
        </form>
    );
}