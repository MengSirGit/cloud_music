import React, { PureComponent } from 'react'
import {connect} from 'react-redux'

import * as api from '../../api'
import TabHead from './head'
import Film from './film'
import '../../css/playpage.css'

class PlayPage extends PureComponent {
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
            Sclock: '00',
            //当前播放状态
            playStatus: false,
            auto: true
        }
        this.timerID = null
        //音频总时长
        this.sumTime = 0
        this.min = 0
        this.sec = 0
        this.duration = 0
        this.DISTANCE = 0
        this.arcBack = null
        this.audio = null

        this.handlePlayStatus = this.handlePlayStatus.bind(this)
        this.songClock = this.songClock.bind(this)
        this.animationTimeBase = this.animationTimeBase.bind(this)
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
    //时间轴动画
    animationTimeBase = () => {
        if(this.state.init < 100)
            this.setState({
                init: this.state.init + this.DISTANCE
            })
    }
    //歌曲时间进度
    songClock = () => {
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
    //切换播放状态
    handlePlayStatus(){
        this.state.playStatus ? this.setState({playStatus: false}) : this.setState({playStatus: true})
        if(this.state.playStatus){
            this.audio.pause()
            clearInterval(this.timerID)
            this.timerID = null
        }else{
            this.audio.play()
            this.timerID = setInterval(()=>{
                if((this.state.minute * 60 + this.state.second) < this.duration){
                    this.songClock()
                    this.animationTimeBase()
                }else{
                    clearInterval(this.timerID)
                    this.setState({playStatus: false})
                }
            }, 1000)
        }
    }
    componentDidMount(){
        //歌曲时长
        this.audio = document.querySelector('#audio')
        let timeEnd = document.querySelector('#time-end')

        this.audio.addEventListener('canplay', () => {
            this.sumTime = parseInt(this.audio.duration) / 60
            this.min = Math.floor(this.sumTime)
            this.sec = Math.floor((this.sumTime.toFixed(2) * 1 - this.min) * 60)
            //歌曲总时长
            timeEnd.innerText = (this.min >= 10 ? this.min.toString() : `0${this.min}` )+ ':' + (this.sec >= 10 ? this.sec.toString() : `0${this.sec}`)
        })

        //播放状态
        this.audio.addEventListener('playing', () => {
            if(this.state.auto){
                //更改播放状态
                this.setState({playStatus: true})

                this.duration = this.min * 60 + this.sec
                this.DISTANCE = (100 / this.duration).toFixed(2) * 1
                this.arcBack = document.querySelector('.arc-back')
                
                if(this.arcBack.className.indexOf('active') <= -1) this.arcBack.className += ' active'
                
                this.timerID = setInterval(()=>{
                    if((this.state.minute * 60 + this.state.second) < this.duration){
                        this.songClock()
                        this.animationTimeBase()
                    }else{
                        clearInterval(this.timerID)
                        this.setState({playStatus: false})
                    }
                }, 1000)
                this.setState({auto: false})
            }
        })

        //暂停状态
        this.audio.addEventListener('paused', () => {
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
                {/* 标签 */}
                <TabHead bg={bg} infor={infor}/>
                {/* 唱片 */}
                <Film bg={bg} playStatus={this.state.playStatus}/>   
                {/* 音频 */}
                <audio id="audio" src={audio} autoPlay></audio>
                {/* 操作按钮 */}
                <div className="page-down">
                    <div className="song-handle">
                        <i className="iconfont">&#xe617;</i>
                        <i className="iconfont">&#xe890;</i>
                        <i className="iconfont">&#xe63d;</i>
                        <i className="iconfont">&#xe783;</i>
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
                        <i className="iconfont play"
                            onClick={this.handlePlayStatus}
                        >{!this.state.playStatus ? '\ue602' : '\ue501'}</i>
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
        data: state.playMusicReducer
    }
}

export default connect(mapStateProps)(PlayPage)