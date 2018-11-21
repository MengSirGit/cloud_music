import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMusicDetail } from '../../store/actions'
import * as api from '../../api'

import Back from '../../components/Back'
import '../../css/search.css'

let isOnComposition = false

//判断是否为chrome浏览器
const isChrome = !!window.chrome && !!window.chrome.webstore

//搜索框
class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        this.inputValue = null
        this.changeEvent = this.changeEvent.bind(this)
        this.handleComposition = this.handleComposition.bind(this)
        this.handleSendSongId = this.handleSendSongId.bind(this)
    }
    handleSendSongId(id) {
        this.props.onHandleSendSongId(id)
        //清空搜索结果
        this.setState({
            data: []
        })
        this.refs.search.value = ''
    }
    handleComposition(e) {
        //中文输入结束，改变state
        if (e.type === 'compositionend') {
            isOnComposition = false
            if (!isOnComposition && isChrome) {
                this.changeEvent()
            }
        }
        else {
            isOnComposition = true
        }
    }
    changeEvent() {

        !isOnComposition ? this.inputValue = this.refs.search.value : 
                           this.inputValue = null

        let inputValue = this.inputValue

        if (inputValue != null && inputValue !== '') {
            api.searchAdvise(inputValue).then(res => {
                this.setState({
                    data: res['data']
                })
            })
        }
    }
    render() {
        let searchResult = null,
            data = this.state.data
        if (data['code'] === 200) {
            searchResult = data['result']['songs'].map((e, i) => {
                return (
                    <li key={i} className="result-list" onClick={() => {
                        this.handleSendSongId(e.id)
                    }
                    }><i className="iconfont">&#xe607;</i><span>{e.name}</span>-<span>{e.artists[0].name}</span></li>
                )
            })
        }
        return (
            <React.Fragment>
                <div className="search-input">
                    <div className="search-back">
                        <Back />
                    </div>
                    <input type="text" name="k" ref='search' autoFocus placeholder="请输入歌名/歌手/歌单名"
                        onChange={this.changeEvent}
                        onCompositionStart={this.handleComposition}
                        onCompositionUpdate={this.handleComposition}
                        onCompositionEnd={this.handleComposition}
                    />
                </div>
                <ul className="search-result">
                    {searchResult}
                </ul>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHandleSendSongId: (id) => {
            dispatch(getMusicDetail(id))
        }
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Search))