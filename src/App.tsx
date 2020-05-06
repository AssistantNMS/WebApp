import classNames from 'classnames';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { mapStateToProps, mapDispatchToProps } from './App.Redux';
import { StateSettingReducer } from './redux/state/StateSettingReducer';

import { trackPageView } from './integration/analytics';

import * as route from './constants/Route';

import { Drawer } from './components/core/drawer/drawer';
import { HomePresenter } from './pages/home/homePresenter';
import { AboutPresenter } from './pages/about/aboutPresenter';
import { LanguagePresenter } from './pages/language/languagePresenter';
import { CataloguePresenter } from './pages/catalogue/cataloguePresenter';
import { CatalogueListPresenter } from './pages/catalogue/catalogueListPresenter';
import { CatalogueItemPresenter } from './pages/catalogue/catalogueItemPresenter';
import { ProcessorItemPresenter } from './pages/processor/processorItemPresenter';
import { SearchContainer } from './pages/search/searchContainer';
import { SettingPresenter } from './pages/setting/settingPresenter';
import { DonationPresenter } from './pages/donation/donationPresenter';
import { CartPresenter } from './pages/cart/cartPresenter';
import { GenericPageAllRequiredPresenter } from './pages/generic/genericPageAllRequired';
import { PortalListPresenter } from './pages/portal/portalListPresenter';
import { AddEditPortalPresenter } from './pages/portal/addEditPortalPresenter';
import { GuidePagePresenter } from './pages/guide/guidePage';
import { GuideDetailPagePresenter } from './pages/guide/guideDetailPage';
import { SocialPresenter } from './pages/social/socialPresenter';
// import { HelloGamesPresenter } from './pages/helloGames/helloGamesPresenter';
import { CommunityMissionPresenter } from './pages/helloGames/communityMissionPresenter';
import { FavouritePresenter } from './pages/favourite/favouritePresenter';
import { NotFoundPresenter } from './pages/notFound/notFoundPresenter';

import { ScrollToTop } from './components/core/scrollToTop/scrollToTop';

interface IProps extends StateSettingReducer {
  location: any;
  toggleMenu: () => void;
}

const AppUnconnected: React.FC<any> = (props: IProps) => {

  useEffect(() => {
    if (props.location == null) return;
    if (props.location.pathname == null) return;
    trackPageView(props.location.pathname);
  }, [props.location, props.location.pathname]);

  return (
    <div id="app"
      className={classNames(
        'menu-on-left',
        props.selectedLanguage,
        {
          isDark: props.isDark
        })}>
      <ScrollToTop>
        <Drawer />
        <div className="main-panel ps-theme-default">
          <div id="sidebar-main-content-overlay" className="full-page-loader opacity80" onClick={() => props.toggleMenu()}></div>
          <Switch>
            <Route exact={true} path={route.home} component={HomePresenter} />
            <Route path={`${route.catalogue}/:types`} component={CatalogueListPresenter} />
            <Route path={`${route.catalogueItem}/:itemId`} component={CatalogueItemPresenter} />
            <Route path={`${route.processorItem}/:itemId`} component={ProcessorItemPresenter} />
            <Route path={route.catalogue} component={CataloguePresenter} />
            <Route path={route.search} component={SearchContainer} />
            <Route path={route.setting} component={SettingPresenter} />
            <Route path={route.about} component={AboutPresenter} />
            <Route path={route.language} component={LanguagePresenter} />
            <Route path={route.donation} component={DonationPresenter} />
            <Route path={route.cart} component={CartPresenter} />
            <Route path={route.genericAllRequirements} component={GenericPageAllRequiredPresenter} />
            <Route path={`${route.guides}/:guid`} component={GuideDetailPagePresenter} />
            <Route path={route.guides} component={GuidePagePresenter} />
            <Route path={route.portal} component={PortalListPresenter} />
            <Route path={route.addEditPortal} component={AddEditPortalPresenter} />
            {/* <Route path={route.helloGames} component={HelloGamesPresenter} /> */}
            <Route path={route.communityMission} component={CommunityMissionPresenter} />
            <Route path={route.favourites} component={FavouritePresenter} />
            <Route path={route.social} component={SocialPresenter} />
            <Route component={NotFoundPresenter} />
          </Switch>
        </div>
      </ScrollToTop>
      <ToastContainer
        position="bottom-left"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </div>
  );
}

// export const App = connect(mapStateToProps)(AppUnconnected);
export const App = connect(mapStateToProps, mapDispatchToProps)(withRouter(AppUnconnected));