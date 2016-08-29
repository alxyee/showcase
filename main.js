/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import {Provider} from 'react-redux';


import {configureStore} from './core/configure-store'
import reducers from './pages/reducers'

import AuthService from './core/AuthService'
const auth = new AuthService('A6kmwBY4n9oESHhZeMooq2Tyofq9xsW3', 'alxyee1.auth0.com');


import {Router, Route, Link, IndexRoute, IndexRedirect, browserHistory} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import {combineReducers} from 'redux'


const store = configureStore({}, combineReducers({reducers, routing:routerReducer}));

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/ReactJSTraining/history/tree/master/docs#readme
const history = syncHistoryWithStore(browserHistory, store)
history.listen(location=>console.log(location))

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
    if (!auth.loggedIn()) {
        replace({ pathname: '/login' })
    }
}


// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body);

import Home from './pages/home'
import Login from './pages/login'

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Home} auth = {auth}>
                <IndexRedirect to="/home" />
                <Route path="home" component={Home} onEnter={requireAuth} />
                <Route path="login" component={Login} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('container')
)