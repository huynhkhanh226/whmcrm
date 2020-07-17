import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {reducers} from './reducers';
import logger from './middlewares/logger';
//import monitorReducerEnhancer from './enhancers/monitorReducer';
const middlewares = applyMiddleware(thunk, logger);
//const composedMiddlesAndEnhancers = compose(middlewares, monitorReducerEnhancer)

const store = createStore(reducers, middlewares);
//console.log(store);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
