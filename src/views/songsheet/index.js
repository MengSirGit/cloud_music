/**
 * 歌单列表页
 * 可查看播放歌单内所有歌曲，包含歌单评论页的入口
 * 其他展示信息有歌单简介和创建者信息，歌单收藏量
 * 暂不支持下载、全部播放、分享、收藏、播放全部、多选操作的功能
 * @example
 */

import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import * as api from '../../api'
import { discussDetailAxios } from '../../store/actions'

import Head from './head'
import Summary from './summary';
import Inventory from './inventory'

import '../../less/songsheet.less'


class SongSheetDetail extends PureComponent {
    constructor(props) {
        super(props)
        this.ID = null
        this.state = {
            summary: {}
        }
    }

    componentDidMount() {
        let data = this.props.data
        if (Object.keys(data).length > 0) {
            this.ID = data.id
            api.getSongSheetDetail(this.ID).then(res => {
                if (res.data.code === 200) {
                    this.setState({
                        summary: res.data.playlist
                    })
                }
            })
        }
    }

    componentWillUnmount() {
        this.props.onSendDiscussDetail(2, this.state.summary)
    }

    render(){
        if (Object.keys(this.state.summary).length === 0) return null
        return (
            <div className="sheet-box" style={{
                background: `url(${this.state.summary.creator.backgroundUrl}) no-repeat 50% 0`
            }}>
                {/* 标签 */}
                <Head />
                {/* 封面 */}
                <Summary data={this.state.summary} id_discuss={this.props.data.id} />
                {/* 列表 */}
                <Inventory data={this.state.summary} ID={this.ID} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.songSheetReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSendDiscussDetail: (model, intro) => {
            dispatch(discussDetailAxios(model, intro))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongSheetDetail)