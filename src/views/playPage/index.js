/**
 * 当前播放歌曲详情页
 * 通过点击播放栏进入
 * 通过此页面可以查看当前歌曲的时间进度和歌曲总长度，进入歌曲评论页
 * 对歌曲进行上一首、下一首的操作，原理同播放栏的滑动切换
 * 歌曲的循环模式切换，目前仅支持单曲循环播放
 * 暂时不支持下载、分享、收藏的功能
 * @example
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { discussArrayAxios, discussDetailAxios, musicUrlActionAxios, musicPosAction, musicPlayStatusAction } from '../../store/actions'

import * as api from '../../api'
import TabHead from './head'
import Film from './film'

import '../../less/playpage.less'

class PlayPage extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            // 歌曲信息
            infor: [],
            // 音频地址
            url: [],
            // 当前时间分
            Mclock: '00',
            // 当前时间秒
            Sclock: '00',
            auto: true
        }
        this.minute = 0
        this.second = 0
        this.timerID = null
        // 音频总时长
        this.sumTime = 0
        this.min = 0
        this.sec = 0
        this.duration = 0
        this.DISTANCE = 0
        this.arcBack = null
        this.audio = null
        // 初始化播放时间轴长度
        this.init = 0

        this.handlePlayStatus = this.handlePlayStatus.bind(this)
        this.songClock = this.songClock.bind(this)
        this.animationTimeBase = this.animationTimeBase.bind(this)
        this.handleMusicPos = this.handleMusicPos.bind(this)
        this.handleMusicUrl = this.handleMusicUrl.bind(this)
        this.handleSendPlayMusicID = this.handleSendPlayMusicID.bind(this)
        this.handleGetMusicDetail = this.handleGetMusicDetail.bind(this)
        this.handleCutPlay = this.handleCutPlay.bind(this)
    }
    
    // 时间轴动画
    animationTimeBase = () => {
        let _init = this.init.toFixed(2) * 1
        if (_init < 100) this.init = _init + this.DISTANCE
    }
    
    // 歌曲时间进度
    songClock = (time) => {
        if (time > 0) {
            let _time = Math.round(time),
                _floor = Math.floor(_time / 60),
                _second = _time - _floor * 60

            if (time < 60) {
                this.second = _second
            }
            else {
                this.minute = _floor
                this.second = _second
            }

            this.minute >= 10 ? this.setState({Mclock: this.minute.toString()}) : this.setState({Mclock: `0${this.minute}`})
            this.second >= 10 ? this.setState({Sclock: this.second.toString()}) : this.setState({Sclock: `0${this.second}`})
        }
    }

    // 切换播放状态
    handlePlayStatus() {
        this.props.playStatus === 1 ? this.props.onHandleSetMusicPlayStatus(0) : this.props.onHandleSetMusicPlayStatus(1)
        if (this.props.playStatus === 1) {
            this.audio.pause()
            clearInterval(this.timerID)
            this.timerID = null
        }
        else {
            this.audio.play()
            this.timerID = setInterval(()=>{
                if ((this.minute * 60 + this.second) < this.duration) {
                    this.songClock(this.audio.currentTime)
                    this.animationTimeBase()
                }
                else {
                    clearInterval(this.timerID)
                    this.props.onHandleSetMusicPlayStatus(0)
                }
            }, 1000)
        }
    }

    // 切歌自动播放
    handleCutPlay() {
        setTimeout(() => {
            let audio = document.querySelector('#audio')
            if (audio.paused) {
                audio.play()
                this.minute = 0
            }
        }, 500)
    }

    handleMusicUrl(id, proto) {
        this.props.onHandleMusicUrl(id, proto)
    } 

    handleMusicPos(num, max, ctrl) {
        this.props.onHandleMusicPos(num, max, ctrl)
    }

    handleSendPlayMusicID(id) {
        this.props.onSendPlayMusicID(id)
    }

    handleGetMusicDetail(id) {
        this.init = 0
        api.getSongDetail(id).then(res => {
            if (res.data.code === 200) {
                this.setState({
                    infor: res.data.songs
                })

                 // 歌曲时长
                this.audio = document.querySelector('#audio')
                let timeEnd = document.querySelector('#time-end'),
                    _duration = this.audio.duration

                this.duration = _duration
                this.DISTANCE = (100 / _duration).toFixed(2) * 1
                this.init =  (this.DISTANCE * Math.round(this.audio.currentTime))
                
                if (!this.audio.paused) {
                    this.sumTime = parseInt(_duration, 10) / 60
                    this.min = Math.floor(this.sumTime)
                    this.sec = Math.floor((this.sumTime.toFixed(2) * 1 - this.min) * 60)
                    // 歌曲总时长
                    timeEnd.innerText = (this.min >= 10 ? this.min.toString() : `0${this.min}` )+ ':' + (this.sec >= 10 ? this.sec.toString() : `0${this.sec}`)
                    // 更改播放状态
                    this.props.onHandleSetMusicPlayStatus(1)
                    this.arcBack = document.querySelector('.arc-back')

                    if (this.arcBack.className.indexOf('active') <= -1) this.arcBack.className += ' active'

                    this.timerID = setInterval(()=>{
                        if ((this.minute * 60 + this.second) < _duration) {
                            this.songClock(this.audio.currentTime)
                            this.animationTimeBase()
                        }
                        else {
                            clearInterval(this.timerID)
                        }
                    }, 1000)
                }

            }
        })
    }

    componentDidMount() {
        let id = this.props.data
        // 获取歌曲详情
        this.handleGetMusicDetail(id)
    }

    // 路由跳转清除播放计时器
    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    render() {
        let infor = this.state.infor,
            bg = null,
            discussDetail = {}
        if (infor.length > 0) {
            bg = infor[0]['al']['picUrl']
            discussDetail.id = infor[0].id
            discussDetail.name = infor[0].name
            discussDetail.creator = { nickname: infor[0].ar[0].name }
            discussDetail.coverImgUrl = infor[0].al.picUrl
        }
        else {
            return null
        }

        let songSheet = this.props.songSheet.sheet,
            _index = this.props.musicPos || 0

        return (
            <article className="page-box">
                {/* 标签 */}
                <TabHead bg={bg} infor={infor}/>
                {/* 唱片 */}
                <Film bg={bg} playStatus={this.props.playStatus}/>   
                {/* 操作按钮 */}
                <div className="page-down">
                    <div className="song-handle">
                        <i className="iconfont">&#xe617;</i>
                        <i className="iconfont">&#xe890;</i>
                        <Link to="/discuss"><i className="iconfont" onClick={() => this.props.onSendSongDiscuss(this.props.data, 0, discussDetail)}>&#xe63d;</i></Link>
                        <i className="iconfont">&#xe783;</i>
                    </div>
                    <div className="time-base">
                        <span id="time-now">{this.state.Mclock}:{this.state.Sclock}</span>
                        <div id="time-line">
                            <div id="time-back"></div>
                            <div id="time-front" style={{
                                width: `${this.init}%`
                            }}></div>
                            <div id="time-arc" style={{
                                left: `${this.init}%`
                            }}></div>
                        </div>
                        <span id="time-end">00:00</span>
                    </div>
                    <div className="song-contrl">
                        <i className="iconfont">&#xeaac;</i>
                        <i className="iconfont prev" onClick={
                            () => {
                                this.handleMusicPos(_index, songSheet.length, false)
                                if (_index > 0) {
                                    this.handleMusicUrl(songSheet[_index - 1].id, 0)
                                    this.handleGetMusicDetail(songSheet[_index - 1].id)
                                    this.handleCutPlay()
                                }
                            }
                        }>&#xe61f;</i>
                        <i className="iconfont play"
                            onClick={this.handlePlayStatus}
                        >
                            { !this.props.playStatus ? '\ue605' : '\ue602' }
                        </i>
                        <i className="iconfont next" onClick={
                            () => {
                                this.handleMusicPos(_index, songSheet.length, true)
                                if (_index < songSheet.length) {
                                    this.handleMusicUrl(songSheet[_index + 1].id, 0)
                                    this.handleGetMusicDetail(songSheet[_index + 1].id)
                                    this.handleCutPlay()
                                }
                            }
                        }>&#xe61f;</i>
                        <i className="iconfont list">&#xe610;</i>
                    </div>
                </div>
            </article>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state.playMusicReducer)
    return {
        data: state.playMusicReducer,
        musicPos: state.musicPlayPosReducer,
        singleSong: state.musicDetailReducer,
        songSheet: state.currMusicReducer,
        playStatus: state.musicPlayStatusReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSendSongDiscuss: (id, type, intro) => {
            dispatch(discussArrayAxios(id, type))
            dispatch(discussDetailAxios(type, intro))
        },
        onHandleMusicUrl: (id, proto) => {
            dispatch(musicUrlActionAxios(id, proto))
        },
        onHandleMusicPos: (num, max, ctrl) => {
            dispatch(musicPosAction(num, max, ctrl))
        },
        onHandleSetMusicPlayStatus: (status) => {
            dispatch(musicPlayStatusAction(status))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayPage)