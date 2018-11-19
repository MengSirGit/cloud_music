import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMusicDetail} from '../../store/actions'

class Inventory extends Component {
    constructor(props){
        super(props)
        this.handleSendId = this.handleSendId.bind(this)
    }
    handleSendId(id){
        // console.log(id)
        this.props.onHandleSendId(id)
    }
    render(){
        let data = this.props.props
        if(data.length === 0) return false
        return (
            <article className="inventory">
                    <div className="inventory-detail clearfix">
                        <div className="detail-left">
                            <i className="iconfont">&#xe605;</i>
                            <em><span>播放全部</span></em>
                        </div>
                    </div>
                    <ul className="inventory-list">
                        {
                            data.map((e, i) => {
                                return (
                                    <li className="clearfix" key={i} onClick={ () => {
                                        this.handleSendId(e.id)
                                    }}>
                                        <div className="index">{i + 1}</div>
                                        <div className="inventory-box">
                                            <div className="inventory-caption">
                                                <div className="caption-line">
                                                    <p className="inventory-name">{e.name}
                                                        {
                                                            e.alias.length > 0 ? <span>({e.alias[0]})</span> : false
                                                        }
                                                    </p>
                                                    <p className="inventory-artist">{e.artists[0].name}-{e.album.name}</p>
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
        onHandleSendId: (id) => {
            dispatch(getMusicDetail(id))
        }
    }
}

export default connect(null, mapDispatchToProps)(Inventory)