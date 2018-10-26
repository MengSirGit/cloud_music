import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {playMusic} from '../store/actions'

import * as api from '../api'

//固定播放栏目
class PlayBar extends Component {
    constructor(props){
        super(props)
        //滑动方向, 左true 右false
        this.start = 0
        this.dir = null
        this.audio = 0
        //判断是否已切歌
        this.isCut = true
        this.prevChooseId = null
        //歌曲索引
        this.index = 0
        this.mark = 0
        this.state = {
            play_id: null,
            //音频地址
            url: [],
            play_status: false,
            audio_url : null,
        }
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.changeMusic = this.changeMusic.bind(this)
        this.handleSaveMusic = this.handleSaveMusic.bind(this)
        this.apiAsk = this.apiAsk.bind(this)
    }

    handleTouchStart(e){
        this.start = e.touches[0].pageX
    }

    handleTouchEnd(e){
        let end = e.changedTouches[0].pageX
        // console.log([this.start, end])
        if(end > this.start){
            this.dir = false
        }else if(end < this.start){
            this.dir = true
        }else{
            this.dir = null
        }
    }

    changeMusic(){
        if(this.dir === true && this.index <= this.props.data.length - 2){
            this.index = this.index + 1
        }else if(this.dir === false && this.index >= 1 ){
            this.index = this.index - 1
        }else if(this.dir === null){
            this.index = this.index
        }
    }

    //api请求
    apiAsk(id){
        console.log(id)
        //获取音频链接
        api.getMusicUrl(id).then(res => {
            if(res.data.code === 200){
                this.setState({
                    url: res.data.data
                })
            }
        })
    }

    //播放点击歌曲
    handleSaveMusic(id){
        if(this.isCut){
            this.apiAsk(id)
            this.isCut = false
        }
        //播放控制
        if(this.refs.audio.paused){
            this.setState({play_status: true})
            setTimeout(()=>{
                this.refs.audio.play()
            }, 200)
        }else{
            this.setState({play_status: false})
            this.refs.audio.pause()
        }
    }
    componentWillReceiveProps(nextProps){
        // this.apiAsk(nextProps.data[0].id)
        if(nextProps.single !== undefined) this.apiAsk(nextProps.single.songs[0].id)
    }
    render(){
        let data = this.props.data,
            singleData = this.props.single,
            audio = null
        //continued...
        let control = false
        if(singleData === undefined) return false
        if(this.state.url.length > 0) audio = this.state.url[0].url
        //歌单列表选歌
        if(this.mark !== this.props.mark && this.props.mark !== undefined){  
            this.index = this.props._index
            this.mark = this.props.mark
            this.apiAsk(data[this.index]['id'])
        }
        return (
            <React.Fragment>
                {
                    !control ?
                        <div className="play-bar">
                            <audio id="audio" src={audio} ref="audio"></audio>  
                                <div className="music-news clearfix">
                                    <div className="music-img"><img src={singleData.songs[0].al.picUrl} alt="" /></div>
                                    <Link to="/playpage" onClick={() => {this.props.saveMusic(singleData.songs[0].id)}}>
                                        <div className="music-title">
                                            <p>{singleData.songs[0].name}</p>
                                            <p>{singleData.songs[0].ar[0].name}</p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="music-btn">
                                    <div className="play-ctrl"><i className="iconfont" onClick={() => {
                                        this.handleSaveMusic()
                                    }}>
                                        {
                                            this.state.play_status ? '\ue501' : '\ue602'
                                        }
                                    </i></div>
                                    <div className="collect"><i className="iconfont">&#xe610;</i></div>
                                </div>
                        </div> 
                        :
                        (data ? 
                            <div className="play-bar">
                                <audio id="audio" src={audio} ref="audio"></audio>  
                                    <div className="music-news clearfix" 
                                        onTouchStart={(e) => {this.handleTouchStart(e)}}
                                        onTouchMove={() => {
                                            this.isCut = true
                                            this.refs.audio.pause()
                                        }}
                                        onTouchEnd={(e) => {
                                            // console.log(this.index)
                                            this.handleTouchEnd(e)
                                            //切歌
                                            this.changeMusic()
                                            //请求音频地址
                                            this.apiAsk(data[this.index]['id']) 
                                            //切歌自动播放
                                            if(this.isCut && this.refs.audio.paused){
                                                setTimeout(() => {
                                                    this.refs.audio.play()
                                                    this.setState({
                                                        play_status: true
                                                    })
                                                }, 300)
                                            } 
                                        }
                                    }>
                                        <div className="music-img"><img src={data[this.index]['al']['picUrl']} alt="" /></div>
                                        <Link to="/playpage" onClick={() => {this.props.saveMusic(data[this.index].id)}}>
                                            <div className="music-title">
                                                <p>{data[this.index]['name']}</p>
                                                <p>{data[this.index]['ar'][0]['name']}</p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="music-btn">
                                        <div className="play-ctrl"><i className="iconfont" onClick={() => {
                                            this.handleSaveMusic(data[this.index]['id'])
                                        }}>
                                            {
                                                this.state.play_status ? '\ue501' : '\ue602'
                                            }
                                        </i></div>
                                        <div className="collect"><i className="iconfont">&#xe610;</i></div>
                                    </div>
                            </div> 
                            :
                            <p style={{textAlign: 'center', fontSize: '.8rem', color: '#8d8d8d'}}>加载中...</p>)
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.currMusicReducer.event,
        _index: state.currMusicReducer.index,
        mark: state.currMusicReducer.mark,
        single: state.musicDetailReducer.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveMusic: (id) => {
            dispatch(playMusic(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayBar)