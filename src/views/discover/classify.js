import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getHotPlaylist } from '../../store/actions'

class Classify extends Component {
    constructor(props) {
        super(props)
        this.handleGetHotPlaylist = this.handleGetHotPlaylist.bind(this)
    }

    handleGetHotPlaylist() {
        this.props.onHandleGetHotPlaylist()
    }

    render() {
        return (
            <ul className="classify">
                <li>
                    <p className="arc-back"><i className="iconfont">&#xe663;</i></p>
                    <p className="caption">私人FM</p>
                </li>
                <li>
                    <Link to="/recommendsong">
                        <p className="arc-back"><i className="iconfont">&#xe775;</i></p>
                        <p className="caption">每日推荐</p>
                    </Link>
                </li>
                <li>
                    <Link to="/classifyofplaylist" onClick={ () => this.handleGetHotPlaylist() }>
                        <p className="arc-back"><i className="iconfont">&#xe642;</i></p>
                        <p className="caption">歌单</p>
                    </Link>
                </li>
                <li>
                    <Link to="/toplist">
                        <p className="arc-back"><i className="iconfont">&#xe68d;</i></p>
                        <p className="caption">排行榜</p>
                    </Link>
                </li>
            </ul>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHandleGetHotPlaylist: () => {
            dispatch(getHotPlaylist())
        }
    }
}

export default connect(null, mapDispatchToProps)(Classify)