import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as api from '../../api'
import { getDiscussDetail } from '../../store/actions'

import Head from './head'
import Summary from './summary'
import Inventory from './inventory'
import '../../less/songsheet.less'

class AlbumSheet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    handleSendDiscussDetail(model, intro) {
        this.props.onSendDiscussDetail(model, intro)
    }

    componentDidMount() {
        api.getAlbumCon(this.props._id).then(res => {
            if (res.data.code === 200) {
                this.setState({
                    list: res.data
                })
            }
        })
    }

    componentWillUnmount() {
        const _list = this.state.list
        let intro = {
            id: _list.album.id,
            name: _list.album.name,
            creator: {
                nickname: _list.album.artist.name
            },
            coverImgUrl: _list.album.picUrl
        }
        this.handleSendDiscussDetail(3, intro)
    }

    render() {
        if (this.state.list.length === 0) return null
        console.log(this.state.list)
        return (
            <div className="sheet-box album" style={{
                background: `url(${this.state.list.album.picUrl}) no-repeat 50% 0`
            }}>
                <Head />
                <Summary data={this.state.list.album} />
                <Inventory data={this.state.list.songs} ID={this.props._id} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        _id: state.songSheetReducer.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSendDiscussDetail: (model, intro) => {
            dispatch(getDiscussDetail(model, intro))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumSheet)