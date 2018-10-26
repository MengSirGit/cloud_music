import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDayRecommendSong } from '../../store/actions'

import Head from './head'
import Summary from './summary'
import Inventory from './inventory'
import '../../css/songsheet.css'

class DayRecommendSong extends Component {
    componentWillMount(){
        this.props.onDayRecommendSong()
    }
    render(){
        return (
            <div className="sheet-box">
                <Head />
                <Summary />
                <Inventory props={this.props.data} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.dayRecommendReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDayRecommendSong: () => {
            dispatch(getDayRecommendSong())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayRecommendSong)