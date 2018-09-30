import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import ExtendRoute from '../components/ExtendRoute'
import App from '../App'

//推荐页
const Recommend = () => import('../views/discover/recommend')
//本地页
const Home = () => import('../views/home')
//短视频
const Video = () => import('../views/video')
//搜索
const Search = () => import('../views/search')

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
        path: '/home',
        component: Home
    },
    //视频
    {
        path: '/video',
        component: Video
    },
    //搜索
    {
        path: '/search',
        component: Search
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