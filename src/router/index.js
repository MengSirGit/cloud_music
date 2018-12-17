/**
 * 应用全部路由地址
 * 
 * 对页面组件进行懒加载
 * @example 
 * const example = lazy(() => import('example'))
 * 
 * function exampleComponent() {
 *      return (
 *          <Suspense><example /></Suspense>
 *      )
 * }
 * 
 * 路由定制  path 路由地址  component 加载组件
 * { path: '..', component: example }
 */

import React, { lazy, Suspense } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import App from '../App'

// 登录页
const Login = lazy(() => import('../views/login'))
// 每日推荐歌曲列表
const DayRecommendSong = lazy(() => import('../views/recommendSong'))
// 推荐页
const Recommend = lazy(() => import('../views/discover'))
// 本地页
const Home = lazy(() => import('../views/home'))
// 短视频
const Video = lazy(() => import('../views/video'))
// 搜索
const Search = lazy(() => import('../views/search'))
// 歌曲播放
const PlayPage = lazy(() => import('../views/playPage'))
// 歌单详情
const SongSheet = lazy(() => import('../views/songsheet'))
// 评论
const Discuss = lazy(() => import('../views/discuss'))
// 排行榜
const TopList = lazy(() => import('../views/topList'))
// 专辑详情
const AlbumSheet = lazy(() => import('../views/albumsheet'))
// 用户详情页
const UserInfo = lazy(() => import('../views/userinfo'))
// 歌单分类页
const ClassifyofPlaylist = lazy(() => import('../views/classifyofplaylist'))
// 分类列表
const CatList = lazy(() => import('../views/catlist'))
// 用户听歌排行
const UserPlayRank = lazy(() => import('../views/userRank'))
// 私人FM
const PersonalFM = lazy(() => import('../views/personalFM'))
// 主播电台
const DJ = lazy(() => import('../views/djsheet'))

function LoginComponent() {
    return (
        <Suspense fallback={<div id="loading"></div>}>
            <Login />
        </Suspense>
    )
}

function DayRecommendSongComponent() {
    return (
        <Suspense fallback={<div id="loading">loading...</div>}>
            <DayRecommendSong />
        </Suspense>
    )
}

function RecommendComponent() {
    return (
        <Suspense fallback={<div id="loading">loading...</div>}>
            <Recommend />
        </Suspense>
    )
}

function HomeComponent() {
    return (
        <Suspense fallback={<div id="loading">loading...</div>}>
            <Home />
        </Suspense>
    )
}

function VideoComponent() {
    return (
        <Suspense fallback={<div id="loading">loading...</div>}>
            <Video />
        </Suspense>
    )
}

function SearchComponent() {
    return (
        <Suspense fallback={<div id="loading">loading...</div>}>
            <Search />
        </Suspense>
    )
}

function PlayPageComponent() {
    return (
        <Suspense fallback={<div id="loading">loading...</div>}>
            <PlayPage />
        </Suspense>
    )
}

function SongSheetComponent() {
    return (
        <Suspense fallback={<div id="loading">loading...</div>}>
            <SongSheet />
        </Suspense>
    )
}

function DiscussComponent() {
    return (
        <Suspense fallback={<div id="loading">loading...</div>}>
            <Discuss />
        </Suspense>
    )
}

function TopListComponent() {
    return (
        <Suspense fallback={<div id="loading">loading...</div>}>
            <TopList />
        </Suspense>
    )
}

function AlbumSheetComponent() {
    return (
        <Suspense fallback={<div id="loading">loading...</div>}>
            <AlbumSheet />
        </Suspense>
    )
}

function UserInfoComponent() {
    return (
        <Suspense fallback={<div id="loading">loading...</div>}>
            <UserInfo />
        </Suspense>
    )
}

function ClassifyofPlaylistComponent() {
    return (
        <Suspense fallback={<div id="loading">loading...</div>}>
            <ClassifyofPlaylist />
        </Suspense>
    )
}

function CatListComponent() {
    return (
        <Suspense fallback={<div id="loading">loading...</div>}>
            <CatList />
        </Suspense>
    )
}

function UserPlayRankComponent() {
    return (
        <Suspense fallback={<div id="loading">loading...</div>}>
            <UserPlayRank />
        </Suspense>
    )
}

function PersonalFMComponent() {
    return (
        <Suspense fallback={<div id="loading">loading...</div>}>
            <PersonalFM />
        </Suspense>
    )
}

function DJComponent() {
    return (
        <Suspense fallback={<div id="loading">loading...</div>}>
            <DJ />
        </Suspense>
    )
}

// 路由
const routes = [
    // 登录
    {
        path: '/login',
        component: LoginComponent
    },
    // 每日推荐歌曲
    {
        path: '/recommendsong',
        component: DayRecommendSongComponent
    },
    // 推荐
    {
        path: '/',
        exact: true,
        component: RecommendComponent
    },
    // 本地
    {
        path: '/home',
        component: HomeComponent
    },
    // 视频
    {
        path: '/video',
        component: VideoComponent
    },
    // 搜索
    {
        path: '/search',
        component: SearchComponent
    },
    // 歌曲播放页
    {
        path: '/playpage',
        component: PlayPageComponent
    },
    // 歌单详情页
    {
        path: '/songsheet',
        component: SongSheetComponent
    },
    // 评论
    {
        path: '/discuss',
        component: DiscussComponent
    },
    // 排行榜
    {
        path: '/toplist',
        component: TopListComponent
    },
    // 专辑详情
    {
        path: '/albumsheet',
        component: AlbumSheetComponent
    },
    // 用户详情页
    {
        path: '/userinfo',
        component: UserInfoComponent
    },
    // 歌单分类
    {
        path: '/classifyofplaylist',
        component: ClassifyofPlaylistComponent
    },
    // 分类列表
    {
        path: '/catlist',
        component: CatListComponent
    },
    // 用户听歌排行
    {
        path: '/userplayrank',
        component: UserPlayRankComponent
    },
    // 私人FM
    {
        path: '/personalfm',
        component: PersonalFMComponent
    },
    // 主播电台
    {
        path: '/dj',
        component: DJComponent
    },
]

//历史记录
const history = createBrowserHistory()

const router = (
    <Router>
        <App history={history}>
            <Switch>
                {routes.map((route, i) => (
                    <Route path={route.path} exact={route.exact} component={route.component} key={i} />
                ))}
            </Switch>
        </App>
    </Router>
)

export default router