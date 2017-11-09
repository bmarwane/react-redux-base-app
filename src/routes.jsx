import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import {Link, Route} from 'react-router-dom'

import createHistory from 'history/createBrowserHistory'

export const history = createHistory();



import DefaultLayout from './Layout'

import Login from './pages/Login'
import Home from './pages/Home'
import About from './pages/About'

export default function MainRouter() {
    return (
        <ConnectedRouter history={history}>
            <div>
                <DefaultLayout exact path="/" component={Home} />
                <DefaultLayout path="/about" component={About} />
                <Route path="/login" component={Login} />
            </div>
        </ConnectedRouter>
    )
}