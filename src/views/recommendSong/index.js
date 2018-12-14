/**
 * 每日歌曲推荐页
 * 页面内容为网易云根据用户听歌习惯，在每日6:00更新的推荐列表
 * 此页面需用户登录后使用
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDayRecommendSong } from '../../store/actions'

import Head from './head'
import Summary from './summary'
import Inventory from './inventory'

import '../../less/songsheet.less'

class DayRecommendSong extends Component {

    componentDidMount(){
        this.props.onDayRecommendSong()
    }
    
    render(){
        return (
            <div className="sheet-box">
                <Head />
                <Summary />
                <Inventory props={this.props.data} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.dayRecommendReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDayRecommendSong: () => {
            dispatch(getDayRecommendSong())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayRecommendSong)