import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { addLocale, useLocale } from 'ttag.macro';

// Load translations in develop mode
if (process.env.NODE_ENV === 'development') {
  addLocale('default', require('./translations.po.json'));
  useLocale('default');
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
