import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as api from '../../api'

import Head from './head'
import Summary from './summary';
import Inventory from './inventory'
import '../../css/songsheet.css'


class SongSheetDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            summary: {}
        }
    }
    componentWillMount(){
        let data = this.props.data
        if(Object.keys(data).length > 0){
            api.getDetail(data.id).then(res => {
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
        return (
            <div className="sheet-box">
                {/* 标签 */}
                <Head />
                {/* 封面 */}
                <Summary data={this.state.summary} />
                {/* 列表 */}
                <Inventory data={this.state.summary} />
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