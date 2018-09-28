import React, {Component} from 'react'
import {connect} from 'react-redux'
import {currMusic} from '../store/actions'

//固定播放栏目
class PlayBar extends Component {
    constructor(props){
        super(props)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
    }
    handleTouchEnd(id){
        this.props.touchEnd(id)
    }
    render(){
        let id = 2425837049
        return (
            <div className="play-bar">
                <div className="music-news" onTouchEnd={() => this.handleTouchEnd(id)}>
                    <div className="music-img"></div>
                    <div className="music-title">
                        <p>Stay Here Forever</p>
                        <p>横滑可以切换上下首哦</p>
                    </div>
                </div>
                <div className="music-btn">
                    <div className="play-ctrl"><i className="iconfont">&#xe602;</i></div>
                    <div className="collect"><i className="iconfont">&#xe502;</i></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        touchEnd: (id) => {
            dispatch(currMusic(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayBar)