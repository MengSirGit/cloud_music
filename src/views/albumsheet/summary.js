import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { discussArrayAxios } from '../../store/actions'

class Summary extends Component {
    constructor(props) {
        super(props)
        this.handleSendToId = this.handleSendToId.bind(this)
    }

    handleSendToId(id, _type) {
        this.props.onHandleSendToId(id, _type)
    }

    render() {
        const album = this.props.data
        let publish = new Date(album.publishTime)
        // console.log(album)
        return (
            <div className="sheet-summary clearfix">
                <div className="sheet-summary-show clearfix">
                    <div className="sheet-summary-thum">
                        <img src={album.picUrl} alt="" />
                    </div>
                    <div className="sheet-summary-news">
                        <p>{album.name}</p> 
                        <p><span className="name">歌手: {album.artist.name}</span></p>
                        <p><span className="name">发行时间：{publish.getFullYear()}.{publish.getMonth() + 1}.{publish.getDate()}</span></p>
                    </div>
                </div>
                <ul className="sheet-summary-contrl">
                    <li onClick={
                        () => this.handleSendToId(album.id, 3)
                    }><Link to="/discuss"><i className="iconfont discuss">&#xe63d;</i><p>{album.info.commentCount}</p></Link></li>
                    <li><i className="iconfont share">&#xe8b8;</i><p>{album.info.shareCount}</p></li>
                    <li><i className="iconfont down">&#xe890;</i><p>下载</p></li>
                    <li><i className="iconfont checkbox">&#xe6b4;</i><p>多选</p></li>
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHandleSendToId: (id, _type) => {
            dispatch(discussArrayAxios(id, _type))
        }
    }
}

export default connect(null, mapDispatchToProps)(Summary)
