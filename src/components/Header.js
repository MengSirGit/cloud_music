/**
 * 项目应用公共头部
 * 包含功能有：本地音乐、 发现音乐、 音乐视频、 侧导航收展、 音乐检索
 * @example
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
    constructor(props){
        super(props)
        // tab切换
        this.state = {
            index: false,
            home: false,
            video: false
        }
    }

    componentDidMount() {
        let href = window.location.href
        if (href.indexOf('home') > -1) {
            this.setState({
                home: true
            })
        }
        else if (href.indexOf('video') > -1) {
            this.setState({
                video: true
            })
        }
        else {
            this.setState({
                index: true
            })
        }
    }

    render(){
        let tab = this.state
        return (
            <header id="header">
                {/* 侧边导航 */}
                <div className="left-nav">
                    <i id="nav-btn" className="iconfont">&#xe611;</i>
                </div>
                {/* 中部tab */}
                <ul className="tab-center">
                    <li className="home"><Link to='/home'><i className={`iconfont${tab['home'] ? ' active' : ''}`}>&#xe626;</i></Link></li>
                    <li className="index"><Link to='/'><i className={`iconfont${tab['index'] ? ' active' : ''}`}>&#xe601;</i></Link></li>
                    <li className="video"><Link to='/video'><i className={`iconfont${tab['video'] ? ' active' : ''}`}>&#xe717;</i></Link></li>
                </ul>
                {/* 搜索按钮 */}
                <div className="search"><Link to='/search'><i className="iconfont">&#xe607;</i></Link></div>
            </header>
        )
    }
}

export default Header