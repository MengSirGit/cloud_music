import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeCurrMusicAxios, musicPosAction, musicUrlActionAxios } from '../../store/actions'

class Inventory extends Component{
    constructor(props) {
        super(props)
        this.handleSendId = this.handleSendId.bind(this)
    }
    handleSendId(id, index, posID) {
        // console.log(id)
        this.props.onHandleSendId(id, index, posID)
    }
    render() {
        const _data = this.props.data
        if (Object.keys(_data).length === 0 ) return null
        // console.log(_data)
        return (
            <article className="inventory">
                <div className="inventory-detail clearfix">
                    <div className="detail-left">
                        <i className="iconfont">&#xe605;</i>
                        <em><span>播放全部</span><span>(共{_data.trackCount}首)</span></em>
                    </div>
                    <div className="detail-right">
                        <p>+ 收藏({_data.subscribedCount})</p>
                    </div>
                </div>
                <ul className="inventory-list">
                    {
                        _data.tracks.map((e, i) => {
                            return (
                                <li className="clearfix" key={i} onClick={() => {
                                    // console.log(e)
                                    this.handleSendId(this.props.ID, i, e.id)
                                }}>
                                    <div className="index">{i + 1}</div>
                                    <div className="inventory-box">
                                        <div className="inventory-caption">
                                            <div className="caption-line">
                                                <p className="inventory-name">{e.name}
                                                    {
                                                        e.alia.length > 0 ? <span>({e.alia[0]})</span> : null
                                                    }
                                                </p>
                                                <p className="inventory-artist">{e.ar[0].name}-{e.al.name}</p>
                                            </div>
                                            <i className="iconfont">&#xe783;</i>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </article>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHandleSendId: (id, index, posID) => {
            dispatch(changeCurrMusicAxios(id, index))
            dispatch(musicPosAction(index))
            dispatch(musicUrlActionAxios(posID))
        }
    }
}

export default connect(null, mapDispatchToProps)(Inventory)