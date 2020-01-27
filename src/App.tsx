import './App.css';

import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { mapStateToProps } from './App.Redux';
import { StateSettingReducer } from './redux/state/StateSettingReducer';
import { ScrollToTop } from './components/core/scrollToTop/scrollToTop';
import { Drawer } from './components/core/drawer/drawer';
import { HomePresenter } from './pages/home/homePresenter';
import { AboutPresenter } from './pages/about/aboutPresenter';
import { LanguagePresenter } from './pages/language/languagePresenter';
import { CataloguePresenter } from './pages/catalogue/cataloguePresenter';
import { CatalogueListPresenter } from './pages/catalogue/catalogueListPresenter';
import { CatalogueItemPresenter } from './pages/catalogue/catalogueItemPresenter';
import { SearchContainer } from './pages/search/searchContainer';
import { NotFoundPresenter } from './pages/notFound/notFoundPresenter';
import { about, catalogue, catalogueItem, home, language, search } from './constants/Route';

interface IProps extends StateSettingReducer { }

const App: React.FC<any> = (props: IProps) => {
  return (
    <div id="app"
      className={classNames(
        'menu-on-left',
        props.selectedLanguage,
        {
          isDark: props.isDark,
        })}>
      <BrowserRouter>
        <ScrollToTop>
          <Drawer />
          <div className="main-panel ps-theme-default">
            <Switch>
              <Route exact={true} path={home} component={HomePresenter} />
              <Route path={`${catalogue}/:types`} component={CatalogueListPresenter} />
              <Route path={`${catalogueItem}/:itemId`} component={CatalogueItemPresenter} />
              <Route path={catalogue} component={CataloguePresenter} />
              <Route path={search} component={SearchContainer} />
              <Route path={about} component={AboutPresenter} />
              <Route path={language} component={LanguagePresenter} />
              <Route path={home} component={NotFoundPresenter} />
            </Switch>
          </div>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default connect(mapStateToProps)(App);

// export default App;
