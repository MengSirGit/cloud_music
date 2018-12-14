/**
 * 网易云音乐用户的个人主页
 * 可提供用户音乐歌单、 动态、 个人信息的展示
 * 目前此页面入口仅可通过评论点击用户头像进入
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Head from './head'
import Summary from './summary'
import Main from './main'
import '../../less/userinfo.less'

class UserInfo extends Component {
    render() {
        let _userInfo = this.props._userInfo

        if (!_userInfo.detail.profile) return null

        return (
            <div className="sheet-box info" style={{
                background: `url(${_userInfo.detail.profile.backgroundUrl}) repeat-y center top / 100%`
            }}>
                <div className="user-shadown">
                    <Head />
                    <Summary data={_userInfo.detail} />
                    <Main data={_userInfo.playList} userId={_userInfo.detail.profile['userId']} listenSongs={_userInfo.detail['listenSongs']} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        _userInfo: state.userAllInfoReducer
    }
}

export default connect(mapStateToProps)(UserInfo)