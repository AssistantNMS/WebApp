import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import App from './App';
import { initLocalization } from './localization/i18n';

import { SettingReducerKey } from './redux/cacheKey';
import { reducer } from './redux';

import * as serviceWorker from './serviceWorker';

import './index.scss';

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

initLocalization(store.getState()?.settingReducer?.selectedLanguage ?? 'en');


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('nms-app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
