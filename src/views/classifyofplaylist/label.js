import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as api from '../../api'
import { hotPlaylistAxios } from '../../store/actions'

class Label extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: []
        }
        this.handleCutPlaylist = this.handleCutPlaylist.bind(this)
    }

    handleCutPlaylist(cat) {
        this.props.onHandleCutPlaylist(cat)
    }

    componentDidMount() {
        api.getHotClassifyofPlayList().then(res => {
            if (res.data.code === 200) {
                this.setState({
                    tags: res.data.tags
                })
            }
        })
    }

    render() {
        return (
            <div className="classify-label clearfix">
                <h5 className="all"><Link to="/catlist">全部歌单 &gt;</Link></h5>
                <ul className="tags">
                    {
                        this.state.tags.map((e, i) => {
                            if (i < 3) {
                                return (
                                    <li className="tags-node" key={i} onClick={ () => this.handleCutPlaylist(e.name) }>{e.name}</li>
                                )
                            }
                            return true
                        })
                    }
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHandleCutPlaylist: (cat) => {
            dispatch(hotPlaylistAxios(cat))
        }
    }
}

export default connect(null, mapDispatchToProps)(Label)