import React, { DOMAttributes } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider as StateProvider } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { UpdateButton } from './components/updateButton';
import { modalSetup } from './components/common/dialog/baseDialog';
import { DependencyInjectionProvider } from './integration/dependencyInjection';
import { initLocalization } from './integration/i18n';
import { initAnalytics } from './integration/analytics';
import { updateServiceWorker } from './integration/serviceWorker';
import { getCurrentLanguage } from './redux/modules/setting/selector';
import { getJSON, defaultConfig } from './utils';

import { loadStateFromLocalStorage, saveStateToLocalStorage } from './redux/stateFromLocalStorage';
import { reducer } from './redux';

import * as serviceWorker from './serviceWorker';

import './index.scss';
import 'react-tippy/dist/tippy.css';
import 'react-vertical-timeline-component/style.min.css';
import 'flag-icons/css/flag-icons.min.css';
import { anyObject } from './helper/typescriptHacks';

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
    interface Window { config: any; registration: any }
    namespace JSX {
        interface IntrinsicElements {
            ['assistant-apps-patreon-list']: CustomElement<any>;
            ['assistant-apps-team-list']: CustomElement<any>;
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
        ? (response || anyObject)
        : defaultConfig;

    if (window.config.consoleLogDebug) console.log('Config', window.config);

    initAnalytics();
    initLocalization(getCurrentLanguage(store.getState()));
    modalSetup(reactAppId);

    const appNode = (
        <DependencyInjectionProvider>
            <StateProvider store={store}>
                <BrowserRouter>
                    <App />
                    <ToastContainer newestOnTop={false} theme="colored" />
                </BrowserRouter>
            </StateProvider>
        </DependencyInjectionProvider>
    );
    ReactDOM.render(appNode, document.getElementById(reactAppId));

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

