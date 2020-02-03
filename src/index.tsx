import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { initLocalization } from './integration/i18n';
import { initAnalytics } from './integration/analytics';
import { getJSON, defaultConfig } from './utils';

import { SettingReducerKey } from './redux/cacheKey';
import { reducer } from './redux';

import * as serviceWorker from './serviceWorker';

import './index.scss';

declare global {
    interface Window { config: any; }
}

let persistedState: any = localStorage.getItem(SettingReducerKey)
    ? {
        settingReducer: JSON.parse(localStorage.getItem(SettingReducerKey) || '{}'),
    }
    : {
        settingReducer: {}
    }

const store = createStore(
    reducer,
    persistedState,
);

store.subscribe(() => {
    var currentSetting = store.getState().settingReducer;
    var storedSetting = JSON.parse(localStorage.getItem(SettingReducerKey) || '{}');

    if (storedSetting == null
        || storedSetting.isDark !== currentSetting.isDark
        || storedSetting.selectedLanguage !== currentSetting.selectedLanguage) {
        localStorage.setItem(SettingReducerKey, JSON.stringify(store.getState().settingReducer))
    }
})

window.config = window.config || {};
getJSON('/assets/config.json', (status: boolean, response: string) => {
    window.config = (status === true)
        ? response || {}
        : defaultConfig;

    if (window.config.consoleLogDebug) console.log('Config', window.config);

    initAnalytics();
    initLocalization(store.getState()?.settingReducer?.selectedLanguage ?? 'en');

    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
        , document.getElementById('nms-app'));

    serviceWorker.register();
})

