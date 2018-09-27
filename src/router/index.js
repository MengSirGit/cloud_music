import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import ExtendRoute from '../components/ExtendRoute'
import App from '../App'

const Recommend = () => import('../views/discover/recommend')

const Local = () => import('../views/local/local')

const Video = () => import('../views/video/video')

//路由
const routes = [
    //推荐
    {
        path: '/',
        exact: true,
        component: Recommend
    },
    //本地
    {
        path: '/local',
        component: Local
    },
    //视频
    {
        path: '/video',
        component: Video
    }
]

//历史记录
const history = createBrowserHistory()

const router = (
    <Router>
        <App history={history}>
            <Switch>
            {routes.map((route, i) => (
                <ExtendRoute key={i} {...route} />
            ))}
            </Switch>
        </App>
    </Router>
)

export default router