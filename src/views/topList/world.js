import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { songSheetAxios } from '../../store/actions'

class WorldList extends Component {
    constructor(props) {
        super(props)
        this.handleSendID = this.handleSendID.bind(this)
    }

    handleSendID(id) {
        this.props.onHandleSendID(id)
    }

    render() {
        const _list = this.props.data.list
        return (
            <div className="world-rank">
                <h3>全球榜</h3>
                <ul className="rank-list clearfix">
                    {
                        _list.slice(4).map((e, i) => {
                            return (
                                <Link to="/songsheet" onClick={() => this.handleSendID(e.id)} key={i}>
                                    <li className="rank-node">
                                        <div className="world-rank-thum">
                                            <div className="intro">{e.updateFrequency}</div>
                                            <img src={e.coverImgUrl} alt="" />
                                        </div>
                                        <p className="caption">{e.name}</p>
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHandleSendID: (id) => {
            dispatch(songSheetAxios(id))
        }
    }
}

export default connect(null, mapDispatchToProps)(WorldList)