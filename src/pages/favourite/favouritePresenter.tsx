import React from 'react';
import { connect } from 'react-redux';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { RequiredItemListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemListTile';
import { FavouriteItem } from '../../contracts/favourite/favouriteItem';
import { withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';
import { IReduxProps, mapDispatchToProps, mapStateToProps } from './favourite.Redux';

interface IWithDepInj {}
interface IWithoutDepInj {}
interface IProps extends IWithoutDepInj, IReduxProps {}

export const FavouritePresenterUnconnected: React.FC<IProps> = (props: IProps) => {
  const displayFavourites = (favourites: Array<FavouriteItem>) => {
    if (favourites == null || favourites.length === 0) return <h2>{translate(LocaleKey.noItems)}</h2>;

    const connectedPresenter = (localProps: FavouriteItem) => {
      const funcs = {
        removeItem: () => props.removeItemFromFavourites(localProps.Id),
      };
      return RequiredItemListTile({ ...localProps, Quantity: 0, ...funcs });
    };

    return <GenericListPresenter list={favourites} presenter={connectedPresenter} identifier={(item: FavouriteItem) => item.Id} />;
  };

  const title = translate(LocaleKey.favourites);
  return (
    <DefaultAnimation>
      <HeadComponent title={title} />
      <NavBar title={title} />
      <div className="content">
        <div className="row full pt1">
          <div className="col-12">{displayFavourites(props.favourites)}</div>
        </div>
      </div>
    </DefaultAnimation>
  );
};

export const FavouritePresenter = withServices<IWithoutDepInj, IWithDepInj>(
  connect(mapStateToProps, mapDispatchToProps)(FavouritePresenterUnconnected),
  () => ({}),
);
