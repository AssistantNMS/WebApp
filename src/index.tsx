import React, { DOMAttributes } from 'react';
import { createRoot } from 'react-dom/client';
import { createStore } from 'redux';
import { Provider as StateProvider } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { UpdateButton } from './components/updateButton';
import { modalSetup } from './components/common/dialog/baseDialog';
import { anyObject } from './helper/typescriptHacks';
import { DependencyInjectionProvider } from './integration/dependencyInjection';
import { initLocalization } from './integration/i18n';
import { initAnalytics } from './integration/analytics';
import { updateServiceWorker } from './integration/serviceWorker';
import { getCurrentLanguage } from './redux/modules/setting/selector';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from './redux/stateFromLocalStorage';
import { reducer } from './redux';
import { getJSON, defaultConfig } from './utils';

import * as serviceWorker from './serviceWorker';

import './index.scss';
import 'react-tippy/dist/tippy.css';
import 'react-vertical-timeline-component/style.min.css';
import 'flag-icons/css/flag-icons.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

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

    const container = document.getElementById(reactAppId);
    const root = createRoot(container!);

    root.render(
        <DependencyInjectionProvider>
            <StateProvider store={store}>
                <BrowserRouter>
                    <App />
                    <ToastContainer
                        position="bottom-right"
                        theme="colored"
                        autoClose={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        draggable
                    />
                </BrowserRouter>
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

