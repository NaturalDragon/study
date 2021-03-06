import React from 'react';
import logo from './logo.svg';
import './App.css';
import {GlobalStyle} from './style'
import { renderRoutes } from 'react-router-config';
import{IconStyle} from './assets/iconfont/iconfont'
import routes from './routes/index.js';
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/index'
function App() {
  return (
    <Provider store={store}>
    <HashRouter>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      { renderRoutes (routes) }
    </HashRouter>
    </Provider>
  );
}

export default App;
