import './App.css';

import classNames from 'classnames';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import { mapStateToProps } from './App.Redux';
import { StateSettingReducer } from './redux/state/StateSettingReducer';

import { trackPageView } from './integration/analytics';

import { about, catalogue, catalogueItem, processorItem, home, language, search, donation } from './constants/Route';

import { Drawer } from './components/core/drawer/drawer';
import { HomePresenter } from './pages/home/homePresenter';
import { AboutPresenter } from './pages/about/aboutPresenter';
import { LanguagePresenter } from './pages/language/languagePresenter';
import { CataloguePresenter } from './pages/catalogue/cataloguePresenter';
import { CatalogueListPresenter } from './pages/catalogue/catalogueListPresenter';
import { CatalogueItemPresenter } from './pages/catalogue/catalogueItemPresenter';
import { ProcessorItemPresenter } from './pages/processor/processorItemPresenter';
import { SearchContainer } from './pages/search/searchContainer';
import { DonationPresenter } from './pages/donation/donationPresenter';
import { NotFoundPresenter } from './pages/notFound/notFoundPresenter';

import { ScrollToTop } from './components/core/scrollToTop/scrollToTop';

interface IProps extends StateSettingReducer {
  location: any;
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
          isDark: props.isDark,
        })}>
      <ScrollToTop>
        <Drawer />
        <div className="main-panel ps-theme-default">
          <Switch>
            <Route exact={true} path={home} component={HomePresenter} />
            <Route path={`${catalogue}/:types`} component={CatalogueListPresenter} />
            <Route path={`${catalogueItem}/:itemId`} component={CatalogueItemPresenter} />
            <Route path={`${processorItem}/:itemId`} component={ProcessorItemPresenter} />
            <Route path={catalogue} component={CataloguePresenter} />
            <Route path={search} component={SearchContainer} />
            <Route path={about} component={AboutPresenter} />
            <Route path={language} component={LanguagePresenter} />
            <Route path={donation} component={DonationPresenter} />
            <Route path={home} component={NotFoundPresenter} />
          </Switch>
        </div>
      </ScrollToTop>
    </div>
  );
}

// export const App = connect(mapStateToProps)(AppUnconnected);
export const App = connect(mapStateToProps)(withRouter(AppUnconnected));