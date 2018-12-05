import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { playMusic, musicUrlAction, getMusicPos } from '../store/actions'

class PlayBar extends Component {
    constructor(props) {
        super(props)
        //滑动起始位置
        this.startPos = 0
        //上一首、下一首
        this.prevOrNext = null

        //播放状态
        this.state = {
            playStatus: false
        }

        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
        this.handleMusicUrl = this.handleMusicUrl.bind(this)
        this.handleSendPlayMusicID = this.handleSendPlayMusicID.bind(this)
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
                that.setState({ playStatus: false })

                if (true) {
                    setTimeout(() => {
                        that.refs.audio.play()
                        that.setState({ playStatus: true })
                    }, 200);
                }
            }
        }
    }

    render() {
        //选中歌曲所在歌单的基本信息
        let songSheet = this.props.songSheet.sheet,
            _mark = this.props.songSheet.mark

        if (songSheet.length === 0) return null

        let _index = this.props.musicPos || 0

        if (this.props.musicUrl.data === '') this.handleMusicUrl(songSheet[_index].id, 0)
        let musicUrl = this.props.musicUrl.data,
            proto = this.props.musicUrl.proto,
            singleSong = this.props.singleSong

        return (
            <React.Fragment>
                {
                    proto === 0 ?
                        <div className="play-bar">
                            <audio id="audio" src={musicUrl} ref="audio"></audio>  
                            <div className="music-news clearfix"
                                onTouchStart={ this.handleTouchStart }
                                onTouchMove={ () => {
                                    if (this.state.playStatus) { this.setState({ playStatus: false }) }
                                } }
                                onTouchEnd={ (e) => {
                                    this.handleTouchEnd(e)
                                    //(歌曲id, 歌曲索引, 歌单长度, 上一首或下一首)
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
                                        this.setState({
                                            playStatus: true
                                        })
                                    }
                                    else {
                                        this.refs.audio.pause()
                                        this.setState({
                                            playStatus: false
                                        })
                                    }
                                } }>
                                    {
                                        this.state.playStatus ? '\ue602' : '\ue605'
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
                                    this.setState({
                                        playStatus: true
                                    })
                                }
                                else {
                                    this.refs.audio.pause()
                                    this.setState({
                                        playStatus: false
                                    })
                                }
                            }}>
                                {
                                    this.state.playStatus ? '\ue602' : '\ue605'
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
        singleSong: state.musicDetailReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHandleMusicUrl: (id, proto) => {
            dispatch(musicUrlAction(id, proto))
        },
        onHandleMusicPos: (num, max, ctrl) => {
            dispatch(getMusicPos(num, max, ctrl))
        },
        onSendPlayMusicID: (id) => {
            dispatch(playMusic(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayBar)
