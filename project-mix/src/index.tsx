import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/containers/app';
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux'
import {createLogger} from 'redux-logger'
import rootReducer from '../src/reducers'
import rootSaga from '../src/models/user'


const sagaMiddleware=createSagaMiddleware();

const store=createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware,createLogger())
)
sagaMiddleware.run(rootSaga)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
