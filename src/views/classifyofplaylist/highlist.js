import React, { Component } from 'react'
import * as api from '../../api'

class HighQualityList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            high: null
        }
    }

    componentDidMount() {
        api.getHighQualityList().then(res => {
            if (res.data.code === 200) {
                this.setState({
                    high: res.data.playlists[0]
                })
            }
        })
    }

    render() {
        if (this.state.high === null)  return null

        return (
            <div className="high-quality clearfix">
                <div className="thum"><img src={this.state.high.coverImgUrl} alt="" /></div>
                <div className="intro">
                    <h3>精品歌单 &gt;</h3>
                    <p className="name">{this.state.high.name}</p>
                    <p className="copywriter">{this.state.high.copywriter}</p>
                </div>
            </div>
        )
    }
}

export default HighQualityList