/**
 * 网易云用户听歌排行榜页面
 * 可展示用户近一周内前一百名歌曲和全部时间内前一百名歌曲
 * @example
 * 
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userPlayRankAxios } from '../../store/actions'
import * as api from '../../api'
 
import Head from './head'
import RankList from './ranklist'
import '../../less/userplayrank.less'

class UserRank extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: '1',
            allData: {}
        }
        this.handleChangeMenu = this.handleChangeMenu.bind(this)
        this.handleAllDataRank = this.handleAllDataRank.bind(this)
    }

    handleChangeMenu(e) {
        let _index = e.target.dataset.index

        this.setState({
            menu: _index
        })
    }

    handleAllDataRank(id) {
        // 只在第一次点击时请求一次
        if (Object.keys(this.state.allData).length === 0) {
            api.getUserPlayBack(id, 0).then(res => {
                // console.log('all')
                if (res.data.code === 200) {
                    this.setState({
                        allData: {ID: id, data: { musicArray: res.data.allData, isCall: true }}
                    })
                }
                else {
                    this.setState({
                        allData: { data: { msg: '由于对方设置，你不能查看听歌排行', isCall: false } }
                    })
                }
            })
        }
    }

    render() {
        let _result = this.props.result
        
        if (Object.keys(this.state.allData).length === 0 && this.state.menu === '2') return null

        return (
            <div className="sheet-box user-rank">
                <Head />
                <ul className="rank-tab">
                    <li className={this.state.menu === '1' ? "active" : ""} data-index='1' onClick={
                        (e) => this.handleChangeMenu(e)
                    }>最近一周</li>
                    <li className={this.state.menu === '2' ? "active" : ""} data-index='2'  onClick={
                        (e) => {
                            this.handleChangeMenu(e)
                            this.handleAllDataRank(_result.ID)
                        }
                    }>所有时间</li>
                </ul>
                <RankList result={ this.state.menu === '1' ? _result.data : this.state.allData.data } />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.userPlayRankReducer)
    return {
        result: state.userPlayRankReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHandleUserPlayRank: (id, _type) => {
            dispatch(userPlayRankAxios(id, _type))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRank)