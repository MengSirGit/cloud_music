/**
 * 项目应用主要的音乐播放功能区
 * 包括音乐播放暂停和左右滑动切换歌曲的功能
 * 选择歌单内歌曲进行播放时， 左右切换为已选择歌单的上一首或下一首
 * 每日推荐或通过检索进行的音乐播放， 滑动则切换至默认的歌单上一首或下一首
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { playMusicAxios, musicUrlActionAxios, musicPosAction, musicPlayStatusAction } from '../store/actions'

class PlayBar extends Component {
    constructor(props) {
        super(props)
        // 滑动起始位置
        this.startPos = 0
        // 上一首、下一首
        this.prevOrNext = null

        this.handleTouchEnd = this.handleTouchEnd.bind(this)
        this.handleMusicUrl = this.handleMusicUrl.bind(this)
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleSendPlayMusicID = this.handleSendPlayMusicID.bind(this)
        this.handleSetMusicPlayStatus = this.handleSetMusicPlayStatus.bind(this)
    }

    handleSetMusicPlayStatus(status) {
        this.props.onSetMusicPlayStatus(status)
    }

    handleTouchStart(e){
        this.startPos = e.touches[0].pageX
    }

    handleTouchEnd(e){
        let endPos = e.changedTouches[0].pageX

        if (this.startPos > endPos) {
            this.prevOrNext = true
        }
        else if (this.startPos < endPos) {
            this.prevOrNext = false
        }
        else {
            this.prevOrNext = null
        }
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

    componentDidUpdate() {
        if (this.refs.audio) {
            let that = this
            this.refs.audio.onended = () => {
                that.handleSetMusicPlayStatus(0)

                if (true) {
                    setTimeout(() => {
                        that.refs.audio.play()
                        that.handleSetMusicPlayStatus(1)
                    }, 200);
                }
            }
        }
    }

    render() {
        // 选中歌曲所在歌单的基本信息
        let songSheet = this.props.songSheet.sheet

        if (songSheet.length === 0) return null

        let _index = this.props.musicPos || 0

        if (this.props.musicUrl.data === '') this.handleMusicUrl(songSheet[_index].id, 0)

        let musicUrl = this.props.musicUrl.data,
            proto = this.props.musicUrl.proto,
            singleSong = this.props.singleSong
        if (proto !== 0 && Object.keys(singleSong).length === 0) return null

        return (
            <React.Fragment>
                {
                    proto === 0 ?
                        <div className="play-bar">
                            <audio id="audio" src={musicUrl} ref="audio"></audio>  
                            <div className="music-news clearfix"
                                onTouchStart={ this.handleTouchStart }
                                onTouchEnd={ (e) => {
                                    this.handleTouchEnd(e)
                                    // (歌曲id, 歌曲索引, 歌单长度, 上一首或下一首)
                                    if (this.prevOrNext === true && _index < songSheet.length - 1) {
                                        this.handleMusicPos(_index, songSheet.length, this.prevOrNext)
                                        this.handleMusicUrl(songSheet[_index + 1].id, 0)
                                    }
                                    else if (this.prevOrNext === false && _index > 0) {
                                        this.handleMusicPos(_index, songSheet.length, this.prevOrNext)
                                        this.handleMusicUrl(songSheet[_index - 1].id, 0)
                                    }
                                } }
                            >
                                <div className="music-img"><img src={songSheet[_index].al.picUrl} alt="" /></div>
                                <Link to="/playpage" onClick={ () => this.handleSendPlayMusicID(songSheet[_index].id) }>
                                    <div className="music-title">
                                        <p>{songSheet[_index].name}</p>
                                        <p>{songSheet[_index].ar[0].name}</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="music-btn">
                                <div className="play-ctrl"><i className="iconfont" onClick={ () => {
                                    if (this.refs.audio.paused) {
                                        this.refs.audio.play()
                                        this.handleSetMusicPlayStatus(1)
                                    }
                                    else {
                                        this.refs.audio.pause()
                                        this.handleSetMusicPlayStatus(0)
                                    }
                                } }>
                                    {
                                        this.props.playStatus === 1 ? '\ue602' : '\ue605'
                                    }
                                </i></div>
                                <div className="collect"><i className="iconfont">&#xe610;</i></div>
                            </div>
                        </div>
                : 
                    <div className="play-bar">
                        <audio id="audio" src={musicUrl} ref="audio"></audio>  
                        <div className="music-news clearfix">
                            <div className="music-img"><img src={singleSong[0].al.picUrl} alt="" /></div>
                            <Link to="/playpage" onClick={ () => this.handleSendPlayMusicID(singleSong[0].id) }>
                                <div className="music-title">
                                    <p>{singleSong[0].name}</p>
                                    <p>{singleSong[0].ar[0].name}</p>
                                </div>
                            </Link>
                        </div>
                        <div className="music-btn">
                            <div className="play-ctrl"><i className="iconfont" onClick={ () => {
                                if (this.refs.audio.paused) {
                                    this.refs.audio.play()
                                    this.handleSetMusicPlayStatus(1)
                                }
                                else {
                                    this.refs.audio.pause()
                                    this.handleSetMusicPlayStatus(0)
                                }
                            }}>
                                {
                                    this.props.playStatus === 1 ? '\ue602' : '\ue605'
                                }
                            </i></div>
                            <div className="collect"><i className="iconfont">&#xe610;</i></div>
                        </div>
                    </div>
                }
            </React.Fragment> 
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        songSheet: state.currMusicReducer,
        musicUrl: state.musicUrlReducer,
        musicPos: state.musicPlayPosReducer,
        singleSong: state.musicDetailReducer,
        playStatus: state.musicPlayStatusReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHandleMusicUrl: (id, proto) => {
            dispatch(musicUrlActionAxios(id, proto))
        },
        onHandleMusicPos: (num, max, ctrl) => {
            dispatch(musicPosAction(num, max, ctrl))
        },
        onSendPlayMusicID: (id) => {
            dispatch(playMusicAxios(id))
        },
        onSetMusicPlayStatus: (status) => {
            dispatch(musicPlayStatusAction(status))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayBar)
