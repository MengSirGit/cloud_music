import React from 'react'

import Header from '../../components/Header'
import Nav from './nav'
import Banner from './banner'
import Classify from './classify'
import RecommendSheet from './recommendSheet'
import NewMusic from './newMusic'
import RecommendDj from './recommendDj'

import '../../css/recommend.css'

//推荐页面整合
const pageMenu = {
    recomm: '推荐歌单',
    new: '最新音乐',
    exclusive: '独家放送',
    radio: '主播电台'
}
const Recommend = () => {
    return (
        <React.Fragment>
            <Header />
            {/* 导航 */}
            <Nav />
            {/* banner */}
            <Banner />
            {/* 快速导航 */}
            <Classify />
            {/* 推荐歌单 */}
            <RecommendSheet title={pageMenu.recomm}/>
            {/* 最新音乐 */}
            <NewMusic  title={pageMenu.new}/>
            {/* 主播电台 */}
            <RecommendDj title={pageMenu.radio}/>
        </React.Fragment>
    )
}

export default Recommend