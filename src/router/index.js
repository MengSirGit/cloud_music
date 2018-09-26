import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import App from '../App'

//路由
const routes = []

//历史记录
const history = createBrowserHistory()

const router = (
    <Router>
        <App history={history}>
            {/* <Route exact path='/' component={Header}></Route> */}
        </App>
    </Router>
)

export default router