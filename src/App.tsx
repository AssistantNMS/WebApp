import classNames from 'classnames';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { mapDispatchToProps, mapStateToProps } from './App.Redux';
import { Drawer } from './components/core/drawer/drawer';
import { ScrollToTop } from './components/core/scrollToTop/scrollToTop';
import * as route from './constants/Route';
import { trackPageView } from './integration/analytics';
import { AboutPresenter } from './pages/about/aboutPresenter';
import { CartContainer } from './pages/cart/cartContainer';
import { CatalogueItemContainer } from './pages/catalogue/catalogueItemContainer';
import { CatalogueListContainer } from './pages/catalogue/catalogueListContainer';
import { CataloguePresenter } from './pages/catalogue/cataloguePresenter';
import { DonationPresenter } from './pages/donation/donationPresenter';
import { ExpeditionSeasonList } from './pages/expeditionSeason/expeditionSeasonList';
import { ExpeditionSeasonPhaseList } from './pages/expeditionSeason/expeditionSeasonPhaseList';
import { FavouritePresenter } from './pages/favourite/favouritePresenter';
import { GenericPageAllRequiredContainer } from './pages/generic/genericPageAllRequiredContainer';
import { GuideDetailPageContainer } from './pages/guide/guideDetailPageContainer';
import { GuidePageContainer } from './pages/guide/guidePageContainer';
import { CommunityMissionContainer } from './pages/helloGames/communityMissionContainer';
import { CommunityMissionTimeline } from './pages/helloGames/communityMissionTimeline';
import { WeekendMissionContainer } from './pages/helloGames/weekendMission/weekendMissionContainer';
import { WeekendMissionMenuPresenter } from './pages/helloGames/weekendMission/weekendMissionMenuPage';
import { HomePresenter } from './pages/home/homePresenter';
import { LanguagePresenter } from './pages/language/languagePresenter';
import { NmsfmContainer } from './pages/misc/nmsfmContainer';
import { PatreonPresenter } from './pages/misc/patreonPresenter';
import { NotFoundPresenter } from './pages/notFound/notFoundPresenter';
import { OnlineMeetup2020SubmissionContainer } from './pages/other/onlineMeetup2020Container';
import { AddEditPortalContainer } from './pages/portal/addEditPortalContainer';
import { PortalListContainer } from './pages/portal/portalListContainer';
import { ProcessorItemContainer } from './pages/processor/processorItemContainer';
import { SettingPresenter } from './pages/setting/settingPresenter';
import { SocialPresenter } from './pages/social/socialPresenter';
import { SyncContainer } from './pages/sync/syncContainer';
import { WhatIsNewContainer } from './pages/whatIsNew/whatIsNewContainer';
import { StateSettingReducer } from './redux/state/StateSettingReducer';

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

  const toggleMenu = () => props?.toggleMenu != null ? props?.toggleMenu() : () => { };

  return (
    <div id="app"
      className={classNames('menu-on-left', props.selectedLanguage, props.selectedFont)}>
      <ScrollToTop>
        <Drawer />
        <div className="main-panel ps-theme-default">
          <div id="sidebar-main-content-overlay" className="full-page-loader opacity80" onClick={() => toggleMenu()}></div>
          <Switch>
            <Route exact={true} path={route.home} component={HomePresenter} />
            <Route path={`${route.catalogue}/:types`} component={CatalogueListContainer} />
            <Route path={`${route.catalogueItem}/:itemId/:langCode`} component={CatalogueItemContainer} />
            <Route path={`${route.catalogueItem}/:itemId`} component={CatalogueItemContainer} />
            <Route path={`${route.processorItem}/:itemId`} component={ProcessorItemContainer} />
            <Route path={route.catalogue} component={CataloguePresenter} />
            <Route path={route.setting} component={SettingPresenter} />
            <Route path={route.about} component={AboutPresenter} />
            <Route path={route.language} component={LanguagePresenter} />
            <Route path={route.donation} component={DonationPresenter} />
            <Route path={route.cart} component={CartContainer} />
            <Route path={route.genericAllRequirements} component={GenericPageAllRequiredContainer} />
            <Route path={`${route.guides}/:guid`} component={GuideDetailPageContainer} />
            <Route path={route.guides} component={GuidePageContainer} />
            <Route path={route.portal} component={PortalListContainer} />
            <Route path={route.addEditPortal} component={AddEditPortalContainer} />
            <Route path={route.communityMission} component={CommunityMissionContainer} />
            <Route path={route.communityMissionTimeline} component={CommunityMissionTimeline} />
            <Route path={route.favourites} component={FavouritePresenter} />
            <Route path={route.social} component={SocialPresenter} />
            <Route path={route.sync} component={SyncContainer} />
            <Route path={route.onlineMeetup2020} component={OnlineMeetup2020SubmissionContainer} />
            <Route path={route.weekendMissionDetails} component={WeekendMissionContainer} />
            <Route path={route.weekendMission} component={WeekendMissionMenuPresenter} />
            <Route path={`${route.seasonExpedition}/:seasId`} component={ExpeditionSeasonPhaseList} />
            <Route path={route.seasonExpedition} component={ExpeditionSeasonList} />
            <Route path={route.patreon} component={PatreonPresenter} />
            <Route path={route.nmsfm} component={NmsfmContainer} />
            <Route path={route.whatIsNew} component={WhatIsNewContainer} />
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