import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as api from '../../api'

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

    componentDidMount() {
        api.getAlbumCon(this.props._id).then(res => {
            if (res.data.code === 200) {
                this.setState({
                    list: res.data
                })
            }
        })
    }

    render() {
        if (this.state.list.length === 0) return null

        return (
            <div className="sheet-box album" style={{
                background: `url(${this.state.list.album.picUrl}) no-repeat 50% 0`
            }}>
                <Head />
                <Summary data={this.state.list.album} />
                <Inventory data={this.state.list.songs} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        _id: state.songSheetReducer.id
    }
}

export default connect(mapStateToProps)(AlbumSheet)