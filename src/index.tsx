import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { initLocalization } from './localization/i18n';
import * as serviceWorker from './serviceWorker';

import './index.scss';

initLocalization('en');
ReactDOM.render(<App />, document.getElementById('nms-app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
