import React, { DOMAttributes } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as StateProvider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { legacy_createStore as createStore } from 'redux';

import { App } from './App';
import { modalSetup } from './components/common/dialog/baseDialog';
import { AppToastContainer } from './components/core/appToastContainer';
import { UpdateButton } from './components/updateButton';
import { adScriptId, adScriptUrl } from './constants/Overwolf';
import { addScriptToHead } from './helper/documentHelper';
import { initAnalytics } from './integration/analytics';
import { DependencyInjectionProvider } from './integration/dependencyInjection';
import { initLocalization } from './integration/i18n';
import { updateServiceWorker } from './integration/serviceWorker';
import { reducer } from './redux';
import { getCurrentLanguage } from './redux/modules/setting/selector';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from './redux/stateFromLocalStorage';
import { defaultConfig, getJSON } from './utils';

import * as serviceWorker from './serviceWorker';

import 'flag-icons/css/flag-icons.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-tippy/dist/tippy.css';
import 'react-vertical-timeline-component/style.min.css';
import { isRunningInOverwolf } from './helper/overwolfHelper';
import './index.scss';

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
    interface Window { config: any; registration: any }
    namespace JSX {
        interface IntrinsicElements {
            ['assistant-apps-patreon-list']: CustomElement<any>;
            ['assistant-apps-team-list']: CustomElement<any>;
            ['assistant-apps-translation-leaderboard']: CustomElement<any>;
        }
    }
}

const reactAppId = 'nms-app';

const persistedState = loadStateFromLocalStorage();
const store = createStore(reducer, persistedState);
store.subscribe(() => saveStateToLocalStorage(store));

window.config = window.config || {};
getJSON('/assets/config.json', (status: boolean, response: string) => {
    window.config = (status === true)
        ? (response ?? defaultConfig)
        : defaultConfig;

    if (window.config.consoleLogDebug) console.log('Config', window.config);

    initAnalytics();
    initLocalization(getCurrentLanguage(store.getState()));
    modalSetup(reactAppId);

    const container = document.getElementById(reactAppId);
    const root = createRoot(container!);

    let appWithRouter;
    if (isRunningInOverwolf()) {
        appWithRouter = (<HashRouter><App /><AppToastContainer /></HashRouter>);
        addScriptToHead(adScriptId, adScriptUrl);
    } else {
        appWithRouter = (<BrowserRouter><App /><AppToastContainer /></BrowserRouter>);
    }

    root.render(
        <DependencyInjectionProvider>
            <StateProvider store={store}>
                {appWithRouter}
            </StateProvider>
        </DependencyInjectionProvider>
    );

    if (window.config.useServiceWorker) {
        serviceWorker.register({
            onUpdate: registration => {
                toast.info(<UpdateButton onClick={() => updateServiceWorker(registration)} />, {
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        });
    }
})

