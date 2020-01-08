import React from 'react';
import classNames from "classnames";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ScrollToTop } from "./components/scrollToTop/scrollToTop";

import { Drawer } from "./components/core/drawer/drawer";

import { HomePresenter } from "./pages/home/homePresenter";
import { AboutPresenter } from "./pages/about/aboutPresenter";
import { NotFoundPresenter } from "./pages/notFound/notFoundPresenter";

import './App.css';
import { home, about } from './constants/Route';

const App: React.FC = () => {
  return (
    <div id="app"
      className={classNames(
        'menu-on-left',
        {
          isDark: false
        })}>
      <BrowserRouter>
        <ScrollToTop>
          <Drawer />
          <div className="main-panel ps-container ps-theme-default">
            <Switch>
              <Route path={about} component={AboutPresenter} />
              <Route exact={true} path={home} component={HomePresenter} />
              <Route path={home} component={NotFoundPresenter} />
            </Switch>
          </div>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
