/**
 * 发现音乐歌单内容页
 * 页面入口为发现音乐页的歌单按钮
 * 提供精品歌单、最热、最新歌单展示
 * 也可进入全部歌单页面根据类型选择切换展示的歌单内容
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Head from './head'
import HighQualityList from './highlist'
import Label from './label'
import NetPlaylist from './playlist'
import '../../less/playlist.less'

class ClassifyofPlaylist extends Component {
    render() {
        return (
            <div className="sheet-box classify-playlist">
                <Head />
                <HighQualityList />
                <Label />
                <NetPlaylist list={this.props.hot} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state.hotPlaylistReducer)
    return {
        hot: state.hotPlaylistReducer
    }
}

export default connect(mapStateToProps)(ClassifyofPlaylist)