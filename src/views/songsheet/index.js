import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import * as api from '../../api'

import Head from './head'
import Summary from './summary';
import Inventory from './inventory'
import '../../css/songsheet.css'


class SongSheetDetail extends PureComponent {
    constructor(props){
        super(props)
        this.ID = null
        this.state = {
            summary: {}
        }
    }
    componentWillMount(){
        let data = this.props.data
        if(Object.keys(data).length > 0){
            this.ID = data.id
            api.getDetail(this.ID).then(res => {
                if(res.data.code === 200){
                    // console.log(res.data.playlist.tracks)
                    this.setState({
                        summary: res.data.playlist
                    })
                }
            })
        }
    }
    render(){
        if(Object.keys(this.state.summary).length === 0) return false
        return (
            <div className="sheet-box" style={{
                background: `url(${this.state.summary.creator.backgroundUrl}) no-repeat 50% 0`
            }}>
                {/* 标签 */}
                <Head />
                {/* 封面 */}
                <Summary data={this.state.summary} id_discuss={this.props.data.id} />
                {/* 列表 */}
                <Inventory data={this.state.summary} ID={this.ID} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.songSheetReducer
    }
}

export default connect(mapStateToProps)(SongSheetDetail)