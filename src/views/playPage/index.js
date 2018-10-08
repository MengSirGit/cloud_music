import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import * as api from '../../api'
import '../../css/playpage.css'

class PlayPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            infor: [],
            url: []
        }
        this.handleBack = this.handleBack.bind(this)
    }
    componentWillMount(){
        let id = this.props.data
        //获取歌曲详情
        api.getSongDetail(id).then(res => {
            if(res.data.code === 200){
                this.setState({
                    infor: res.data.songs
                })
            }
        })
        //获取音频链接
        api.getMusicUrl(id).then(res => {
            if(res.data.code === 200){
                this.setState({
                    url: res.data.data
                })
            }
        })
    }
    handleBack(){
        this.props.history.goBack()
    }
    render(){
        let infor = this.state.infor,
            url = this.state.url,
            bg = null
        if(infor.length > 0) bg = infor[0]['al']['picUrl']
        return (
            <article className="page-box">
                <div className="play-page" style={{
                    background: `url(${bg}) repeat-y center`,
                }}>
                </div>
                <div className="page-up">
                <i className="iconfont back" onClick={this.handleBack}>&#xe62e;</i>
                    {
                        infor.map((data, i) => {
                            return (
                                <div className="caption" key={i}>
                                    <p>{data.name}</p>
                                    <p>{data.ar[0].name}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="page-center"></div>
                <div className="page-down"></div>
            </article>
        )
    }
}

const mapStateProps = (state) => {
    return {
        data: state.playMusic
    }
}

const PlayPage2 = connect(mapStateProps)(PlayPage)

export default withRouter(PlayPage2)