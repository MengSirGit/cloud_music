import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {currMusic, playMusic} from '../store/actions'

//固定播放栏目
class PlayBar extends Component {
    constructor(props){
        super(props)
        //滑动方向, 左true 右false
        this.start = 0
        this.dir = null

        this.state = {
            //歌曲索引
            index: 0,
        }
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.changeMusic = this.changeMusic.bind(this)
        this.handleSaveMusic = this.handleSaveMusic.bind(this)
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

    changeMusic(id){
        // console.log(this.dir)
        if(this.dir === true && this.state.index <= this.props.data.length - 2){
            this.setState({
                index: this.state.index + 1
            })
        }else if(this.dir === false && this.state.index >= 1 ){
            this.setState({
                index: this.state.index - 1
            })
        }else if(this.dir === null){
            this.setState({
                index: this.state.index
            })
        }

        this.props.cutMusic(id)
    }

    componentWillMount(){
        this.props.cutMusic(360062344)
    }

    //组件卸载发送当前歌曲信息
    handleSaveMusic(id){
        this.props.saveMusic(id)
    }

    render(){
        let id = 360062344,
            data = this.props.data
        if(data){
            return (
                <div className="play-bar">
                    <div className="music-news clearfix" 
                        onTouchStart={(e) => this.handleTouchStart(e)}
                        onTouchEnd={(e) => {
                            this.handleTouchEnd(e)
                            this.changeMusic(id)
                        }
                    }>
                        <div className="music-img"><img src={data[this.state.index]['al']['picUrl']} alt="" /></div>
                        <div className="music-title">
                            <p>{data[this.state.index]['name']}</p>
                            <p>{data[this.state.index]['ar'][0]['name']}</p>
                        </div>
                    </div>
                    <div className="music-btn">
                        <div className="play-ctrl"><Link to="/playpage"><i className="iconfont" onClick={() => this.handleSaveMusic(data[this.state.index]['id'])}>&#xe602;</i></Link></div>
                        <div className="collect"><i className="iconfont">&#xe502;</i></div>
                    </div>
                </div> 
            )
        }else{
            //体验可升级
            return (
                <p>加载中...</p>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.currMusicReducer.event
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cutMusic: (id) => {
            dispatch(currMusic(id))
        },
        saveMusic: (id) => {
            dispatch(playMusic(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayBar)