import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import * as api from '../../api'
import '../../css/playpage.css'

class PlayPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            //歌曲信息
            infor: [],
            //音频地址
            url: [],
            //分
            minute: 0,
            //秒
            second: 0,
            //初始化播放时间轴长度
            init: 0,
            //当前时间分
            Mclock: '00',
            //当前时间秒
            Sclock: '00'
        }
        this.timerID = null
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
    componentDidMount(){
        //歌曲时长
        let audio = document.querySelector('#audio'),
            timeEnd = document.querySelector('#time-end'),
            sumTime, min, sec

        audio.addEventListener('canplay', () => {
            sumTime = parseInt(audio.duration) / 60
            min = Math.floor(sumTime)
            sec = Math.floor((sumTime.toFixed(2) * 1 - min) * 60)
            //歌曲总时长
            timeEnd.innerText = (min >= 10 ? min.toString() : `0${min}` )+ ':' + (sec >= 10 ? sec.toString() : `0${sec}`)
        })

        //播放状态
        audio.addEventListener('playing', () => {
            let duration = min * 60 + sec,
                DISTANCE = (100 / duration).toFixed(2) * 1,
                arcBack = document.querySelector('.arc-back')
            
            if(arcBack.className.indexOf('active') <= -1) arcBack.className += ' active'

            //时间轴动画
            const animationTimeBase = () => {
                if(this.state.init < 100)
                    this.setState({
                        init: this.state.init + DISTANCE
                    })
            }
            //歌曲时间进度
            const songClock = () => {
                if(this.state.second < 60){
                    this.setState({
                        second: this.state.second + 1
                    })
                }else{
                    this.setState({
                        minute: this.state.minute + 1,
                        second: 0
                    })
                }
                this.state.minute >= 10 ? this.setState({Mclock: this.state.minute.toString()}) : this.setState({Mclock: `0${this.state.minute}`})
                this.state.second >= 10 ? this.setState({Sclock: this.state.second.toString()}) : this.setState({Sclock: `0${this.state.second}`})
            }
            
            this.timerID = setInterval(()=>{
                if((this.state.minute * 60 + this.state.second) < duration){
                    songClock()
                    animationTimeBase()
                }else{
                    clearInterval(this.timerID)
                }
            }, 1000)
        })

        //暂停状态
        audio.addEventListener('paused', () => {
            console.log('paused')
        })
    }
    //路由跳转清除播放计时器
    componentWillUnmount(){
        clearInterval(this.timerID)
    }
    render(){
        let infor = this.state.infor,
            url = this.state.url,
            bg = null,
            audio = null

        if(infor.length > 0) bg = infor[0]['al']['picUrl']
        if(url.length > 0) audio = url[0]['url']

        return (
            <article className="page-box">
                {/* 界面背景 */}
                <div className="play-page" style={{
                    background: `url(${bg}) repeat-y center`,
                }}>
                </div>
                {/* 界面头部 */}
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
                {/* 唱片 */}
                <div className="page-center">
                    <div className="arc-back">
                        <div className="film">
                            <div className="song-thum"><img src={bg} alt="" /></div>
                        </div>
                    </div>
                </div>
                {/* 音频 */}
                <audio id="audio" src={audio} autoPlay></audio>
                {/* 操作按钮 */}
                <div className="page-down">
                    <div className="song-handle">
                        <i className="iconfont">&#xe617;</i>
                        <i className="iconfont">&#xe890;</i>
                        <i className="iconfont">&#xe63d;</i>
                        <i className="iconfont">&#xe60f;</i>
                    </div>
                    <div className="time-base">
                        <span id="time-now">{this.state.Mclock}:{this.state.Sclock}</span>
                        <div id="time-line">
                            <div id="time-back"></div>
                            <div id="time-front" style={{
                                width: `${this.state.init}%`
                            }}></div>
                            <div id="time-arc" style={{
                                left: `${this.state.init}%`
                            }}></div>
                        </div>
                        <span id="time-end">00:00</span>
                    </div>
                    <div className="song-contrl">
                        <i className="iconfont">&#xe603;</i>
                        <i className="iconfont prev">&#xe61f;</i>
                        <i className="iconfont play">&#xe602;</i>
                        <i className="iconfont next">&#xe61f;</i>
                        <i className="iconfont list">&#xe610;</i>
                    </div>
                </div>
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