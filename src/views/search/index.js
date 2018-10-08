import React, {Component} from 'react'
import * as api from '../../api'
import { withRouter } from 'react-router-dom'

import '../../css/search.css'

let isOnComposition = false

//判断是否为chrome浏览器
const isChrome = !!window.chrome && !!window.chrome.webstore

//搜索框
class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
        this.inputValue = null
        this.changeEvent = this.changeEvent.bind(this)
        this.handleComposition = this.handleComposition.bind(this)
        this.handleBack = this.handleBack.bind(this)
    }
    handleComposition(e){
        //中文输入结束，改变state
        if(e.type == 'compositionend'){
            isOnComposition = false
            if(!isOnComposition && isChrome){
                this.changeEvent()
            }
        }else{
            isOnComposition = true
        }
    }
    handleBack(){
        this.props.history.goBack()
    }
    changeEvent(){

        !isOnComposition ? this.inputValue = this.refs.search.value : 
                           this.inputValue = null

        let inputValue = this.inputValue

        if(inputValue != null){
            api.searchAdvise(inputValue).then(res => {
                // console.log(res['data'])
                this.setState({
                    data: res['data']
                })
            })
        }
    }
    render(){
        let searchResult = null,
            data = this.state.data
        if(data['code'] === 200){
            searchResult = data['result']['songs'].map((e, i) => {
                return (
                    <li key={i} className="result-list"><i className="iconfont">&#xe607;</i><span>{e.name}</span>-<span>{e.artists[0].name}</span></li>
                )
            })
        }
        return (
            <React.Fragment>
                <div className="search-input">
                    <div className="search-back" onClick={this.handleBack}><i className="iconfont">&#xe62e;</i></div>
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

export default withRouter(Search)