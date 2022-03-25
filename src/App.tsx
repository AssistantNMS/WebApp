import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { mapDispatchToProps, mapStateToProps } from './App.Redux';
import { Drawer } from './components/core/drawer/drawer';
import { NavBarFake } from './components/core/navbar/navbarFake';
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
import { TechTreeContainer } from './pages/techtree/techTreeContainer';
import { TitlesContainer } from './pages/titles/titlesContainer';
import { WhatIsNewContainer } from './pages/whatIsNew/whatIsNewContainer';
import { StateSettingReducer } from './redux/state/StateSettingReducer';

interface IProps extends StateSettingReducer {
  toggleMenu: () => void;
}

const AppUnconnected: React.FC<any> = (props: IProps) => {
  let location = useLocation();

  useEffect(() => {
    if (location == null) return;
    if (location.pathname == null) return;
    trackPageView(location.pathname);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, location.pathname]);

  const toggleMenu = () => props?.toggleMenu != null ? props?.toggleMenu() : () => { };

  return (
    <div id="app"
      className={classNames('menu-on-left', props.selectedLanguage, props.selectedFont)}>
      <ScrollToTop>
        <Drawer key={props.selectedLanguage} />
        <div className="main-panel ps-theme-default">
          <div id="sidebar-main-content-overlay" className="full-page-loader opacity80" onClick={() => toggleMenu()}></div>
          <NavBarFake />
          <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.key + props.selectedLanguage}>
              <Route path={route.home} element={<HomePresenter />} />
              <Route path={route.setting} element={<SettingPresenter />} />
              <Route path={route.about} element={<AboutPresenter />} />
              <Route path={route.language} element={<LanguagePresenter />} />
              <Route path={route.donation} element={<DonationPresenter />} />
              <Route path={route.patreon} element={<PatreonPresenter />} />
              <Route path={route.whatIsNew} element={<WhatIsNewContainer />} />
              <Route path={route.nmsfm} element={<NmsfmContainer />} />

              <Route path={`${route.catalogue}/:types`} element={<CatalogueListContainer />} />
              <Route path={route.catalogue} element={<CataloguePresenter />} />

              <Route path={`${route.catalogueItem}/:itemId/:langCode/:name`} element={<CatalogueItemContainer />} />
              <Route path={`${route.catalogueItem}/:itemId/:langCode`} element={<CatalogueItemContainer />} />
              <Route path={`${route.catalogueItem}/:itemId`} element={<CatalogueItemContainer />} />

              <Route path={`${route.processorItem}/:itemId`} element={<ProcessorItemContainer />} />
              <Route path={route.cart} element={<CartContainer />} />
              <Route path={route.favourites} element={<FavouritePresenter />} />
              <Route path={route.genericAllRequirements} element={<GenericPageAllRequiredContainer />} />

              <Route path={route.guides} element={<GuidePageContainer />} />
              <Route path={`${route.guides}/:guid`} element={<GuideDetailPageContainer />} />

              <Route path={route.portal} element={<PortalListContainer />} />
              <Route path={route.addEditPortal} element={<AddEditPortalContainer />} />

              <Route path={route.communityMission} element={<CommunityMissionContainer />} />
              <Route path={route.communityMissionTimeline} element={<CommunityMissionTimeline />} />
              <Route path={route.seasonExpedition} element={<ExpeditionSeasonList />} />
              <Route path={`${route.seasonExpedition}/:seasId`} element={<ExpeditionSeasonPhaseList />} />
              <Route path={route.weekendMissionDetails} element={<WeekendMissionContainer />} />
              <Route path={route.weekendMission} element={<WeekendMissionMenuPresenter />} />

              <Route path={route.techTree} element={<TechTreeContainer />} />
              <Route path={route.titles} element={<TitlesContainer />} />

              <Route path={route.social} element={<SocialPresenter />} />
              <Route path={route.sync} element={<SyncContainer />} />
              <Route path={route.onlineMeetup2020} element={<OnlineMeetup2020SubmissionContainer />} />

              <Route element={<NotFoundPresenter />} />
            </Routes>
          </AnimatePresence>
        </div>
      </ScrollToTop >
      <ToastContainer
        position="bottom-left"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </div >
  );
}

// export const App = connect(mapStateToProps)(AppUnconnected);
export const App = connect(mapStateToProps, mapDispatchToProps)(AppUnconnected);