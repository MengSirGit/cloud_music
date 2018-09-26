import React from 'react'
import '../css/header.css'

const Header = () => (
    <header id="header">
        {/* 侧边导航 */}
        <div className="left-nav">
            <i className="iconfont">&#xe604;</i>
        </div>
        {/*中部tab*/}
        <ul className="tab-center">
            <li className="local"><i className="iconfont">&#xe503;</i></li>
            <li className="index"><i className="iconfont">&#xe601;</i></li>
            <li className="video"><i className="iconfont">&#xe717;</i></li>
        </ul>
        {/*搜索按钮*/}
        <div className="search"><i className="iconfont">&#xe607;</i></div>
    </header>
)

export default Header