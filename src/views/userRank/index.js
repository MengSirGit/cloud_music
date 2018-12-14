/**
 * 网易云用户听歌排行榜页面
 * 可展示用户近一周内前一百名歌曲和全部时间内前一百名歌曲
 * @example
 * 
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Head from './head'
import RankList from './ranklist'
import '../../less/userplayrank.less'

class UserRank extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: '1',
            allData: []
        }
        this.handleChangeMenu = this.handleChangeMenu.bind(this)
    }

    handleChangeMenu(e) {
        let _index = e.target.dataset.index

        this.setState({
            menu: _index
        })
    }

    handleAllDataRank(id) {

    }

    render() {
        let _result = this.props.result

        return (
            <div className="sheet-box user-rank">
                <Head />
                <ul className="rank-tab">
                    <li className={this.state.menu === '1' ? "active" : ""} data-index='1' onClick={
                        (e) => this.handleChangeMenu(e)
                    }>最近一周</li>
                    <li className={this.state.menu === '2' ? "active" : ""} data-index='2'  onClick={
                        (e) => this.handleChangeMenu(e)
                    }>所有时间</li>
                </ul>
                <RankList result={_result.data} />
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

export default connect(mapStateToProps)(UserRank)