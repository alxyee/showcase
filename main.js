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
import router from './core/router';
import history from './core/history';

import axios from 'axios'
import $ from 'jquery'

import AuthService from './core/AuthService'
const auth = new AuthService('A6kmwBY4n9oESHhZeMooq2Tyofq9xsW3', 'alxyee1.auth0.com');

let routes = require('./routes.json'); // Loaded with utils/routes-loader.js
routes.map(route=>route['auth'] = auth)

const container = document.getElementById('container');


const store = configureStore({}, reducers);

function renderComponent(component) {
    ReactDOM.render(<Provider store={store}>{component}</Provider>, container);
}

export const ajaxPost = (url, data)=> {
    return $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(response=>response)
}

function getParamFromHash(param, hash) {
    let paramToReturn = ''
    const filteredParams = hash.split('&').filter(p=>p.includes(param))
    if (filteredParams.length > 0) {
        const param_array = filteredParams[0].split('=')
        paramToReturn = param_array[param_array.length - 1]
    }
    return paramToReturn
}

// Find and render a web page matching the current URL path,
// if such page is not found then render an error page (see routes.json, core/router.js)
function render(location) {
    console.log(location, auth.loggedIn())
    if (location.hash !== "") {
        // const access_token = getParamFromHash('access_token', location.hash)
        // console.log('access_token', access_token)
        const access_token = "enLxZvbEgKdnAijog5pIr1DXc670mBgN"
        axios({
            method: 'post',
            headers:{
                Authorization: `Bearer ${access_token}`
            },
            url: 'https://api.box.com/2.0/users',
            data: {"name": "Ned Stark", "is_platform_access_only": true}
        }).then(response=>{console.log(response)})

        ajaxPost('https://api.box.com/2.0/users',  {"name": "Ned Stark", "is_platform_access_only": true})
            .then(response=>console.log("AJAX POST", response))
    }
    // const isSecuredPath = location.pathname.indexOf("/secure") !== -1

    // if (!auth.loggedIn() && isSecuredPath) {
    //     location.pathname = "/login"
    // }

    router
        .resolve(routes, location)
        .then(renderComponent)
        .catch(error => router.resolve(routes, {...location, error}).then(renderComponent));
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/ReactJSTraining/history/tree/master/docs#readme
history.listen(render);
render(history.getCurrentLocation());

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
    module.hot.accept(reducers, () => {
        store.replaceReducer(reducers.default);
        return true;
    });

}
