import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
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
        const _data = this.props.data
        let id_discuss = this.props.id_discuss

        if (Object.keys(_data).length === 0) return null
        return(
            <div className="sheet-summary clearfix">
                <div className="sheet-summary-show clearfix">
                    <div className="sheet-summary-thum">
                        <img src={_data.coverImgUrl} alt="" />
                    </div>
                    <div className="sheet-summary-news">
                        <p>{_data.name}</p> 
                        <p><span className="head"><img src={_data.creator.avatarUrl} alt="" /></span><span className="name">{_data.creator.nickname}</span></p>
                    </div>
                </div>
                <ul className="sheet-summary-contrl">
                    <li><Link to="/discuss"><i className="iconfont discuss" onClick={
                        () => this.handleSendToId(id_discuss, 2)
                        }>&#xe63d;</i><p>{_data.commentCount}</p></Link></li>
                    <li><i className="iconfont share">&#xe8b8;</i><p>{_data.shareCount}</p></li>
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