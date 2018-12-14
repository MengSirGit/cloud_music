/**
 * 排行榜页面
 * 目前包含官方榜、 全球榜的音乐排名信息
 * 各榜单点击进入音乐列表页
 * 歌手榜和赞赏榜暂时未开通
 */

import React, { Component } from 'react'

import * as api from '../../api'

import Head from './head'
import OfficialList from './official'
import WorldList from './world'

import '../../less/songsheet.less'
import '../../less/toplist.less'

class TopList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topList: []
        }
    }

    componentDidMount() {
        api.getTopListDetail().then( res => {
            if (res.data.code === 200) {
                this.setState({
                    topList: res.data
                })
            }
        })
    }

    render() {
        if (this.state.topList.length === 0) return null

        const data = this.state.topList

        return (
            <div className="sheet-box top">
                <Head />
                <OfficialList data={data}/>
                <WorldList data={data} />
            </div>
        )
    }
}

export default TopList