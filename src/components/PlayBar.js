import React, {Component} from 'react'

class PlayBar extends Component {
    render(){
        return (
            <div className="play-bar">
                <div className="music-news">
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

export default PlayBar