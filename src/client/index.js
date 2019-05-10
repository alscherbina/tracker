import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bulma/css/bulma.min.css';
import './css/app.css';
import '@babel/polyfill';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import ErrorModal from './components/ErrorModal';
import store from './store';
import App from './App';

const contentNode = document.getElementById('contents');

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
    <ErrorModal />
  </Provider>
);

ReactDOM.render(app, contentNode);
