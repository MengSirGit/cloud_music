import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getSongSheet } from '../../store/actions'

class NetPlaylist extends Component {
    constructor(props) {
        super(props)
        this.handleToSongsheet = this.handleToSongsheet.bind(this)
    }

    handleToSongsheet(id) {
        this.props.onHandleToSongsheet(id)
    }

    render() {
        return (
            <ul className="hot-list">
                {
                    this.props.list.map((e, i) => {
                        return (
                            <li className="hot-node" key={i} onClick={() => this.handleToSongsheet(e.id)}>
                                <Link to="/songsheet">
                                    <div className="hot-box">
                                        <img className="node-bg" src={e.coverImgUrl} alt="" />
                                        <div className="hot-cunk">
                                            <p className="play-count"><i className="iconfont">&#xe6bf;</i><span>{Number(e.playCount) > 100000 ? `${Math.ceil(e.playCount / 10000)}万` : e.playCount}</span></p>
                                            <p className="play-creator"><i className="iconfont">&#xe618;</i><span>{e.creator.nickname}</span></p>
                                        </div>
                                    </div>
                                    <p className="play-caption">{e.name}</p>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHandleToSongsheet: (id) => {
            dispatch(getSongSheet(id))
        }
    }
}

export default connect(null, mapDispatchToProps)(NetPlaylist)