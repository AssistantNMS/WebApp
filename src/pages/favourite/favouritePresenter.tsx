import i18next from 'i18next';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapStateToProps, mapDispatchToProps } from './favourite.Redux';

import { NavBar } from '../../components/core/navbar/navbar';
import { setDocumentTitle } from '../../helper/DocumentHelper';
import { LocaleKey } from '../../localization/LocaleKey';

import { FavouriteItem } from '../../contracts/favourite/favouriteItem';
import { RequiredItem } from '../../contracts/RequiredItem';

import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { RequiredItemListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemListTile';

interface IProps {
    location: any;
    match: any;
    history: any;
    favourites: Array<FavouriteItem>
    removeItemFromFavourites: (favouriteItemId: string) => void;
}

export const FavouritePresenterUnconnected = withRouter((props: IProps) => {
    const title = i18next.t(LocaleKey.favourites);
    setDocumentTitle(title);

    const displayFavourites = (favourites: Array<FavouriteItem>) => {
        if (favourites == null || favourites.length === 0) return (
            <h2>{i18next.t(LocaleKey.noItems)}</h2>
        );

        const connectedPresenter = (localProps: RequiredItem | any, index: number) => {
            const funcs = {
                removeItem: () => props.removeItemFromFavourites(localProps.Id)
            };
            return RequiredItemListTile({ ...localProps, ...funcs });
        }

        return <GenericListPresenter list={favourites} presenter={connectedPresenter} identifier={(item: FavouriteItem) => item.Id} />;
    };

    return (
        <>
            <NavBar title={title} />
            <div className="content">
                <div className="row full pt1">
                    <div className="col-12">
                        {displayFavourites(props.favourites)}
                    </div>
                </div>
            </div>
        </>
    );
});

export const FavouritePresenter = connect(mapStateToProps, mapDispatchToProps)(FavouritePresenterUnconnected);