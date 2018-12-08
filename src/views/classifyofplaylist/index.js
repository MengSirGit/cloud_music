import React, { Component } from 'react'
import { connect } from 'react-redux'

import Head from './head'
import NetPlaylist from './playlist'
import '../../less/playlist.less'

class ClassifyofPlaylist extends Component {
    render() {
        return (
            <div className="sheet-box classify-playlist">
                <Head />
                <NetPlaylist list={this.props.hot} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.hotPlaylistReducer)
    return {
        hot: state.hotPlaylistReducer
    }
}

export default connect(mapStateToProps)(ClassifyofPlaylist)