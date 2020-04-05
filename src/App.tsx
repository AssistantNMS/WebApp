import classNames from 'classnames';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { mapStateToProps, mapDispatchToProps } from './App.Redux';
import { StateSettingReducer } from './redux/state/StateSettingReducer';

import { trackPageView } from './integration/analytics';

import { about, catalogue, catalogueItem, processorItem, home, language, setting, search, donation, cart, genericAllRequirements, guides } from './constants/Route';

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
import { GuidePagePresenter } from './pages/guide/guidePage';
import { GuideDetailPagePresenter } from './pages/guide/guideDetailPage';
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
            <Route exact={true} path={home} component={HomePresenter} />
            <Route path={`${catalogue}/:types`} component={CatalogueListPresenter} />
            <Route path={`${catalogueItem}/:itemId`} component={CatalogueItemPresenter} />
            <Route path={`${processorItem}/:itemId`} component={ProcessorItemPresenter} />
            <Route path={catalogue} component={CataloguePresenter} />
            <Route path={search} component={SearchContainer} />
            <Route path={setting} component={SettingPresenter} />
            <Route path={about} component={AboutPresenter} />
            <Route path={language} component={LanguagePresenter} />
            <Route path={donation} component={DonationPresenter} />
            <Route path={cart} component={CartPresenter} />
            <Route path={genericAllRequirements} component={GenericPageAllRequiredPresenter} />
            <Route path={`${guides}/:guid`} component={GuideDetailPagePresenter} />
            <Route path={guides} component={GuidePagePresenter} />
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