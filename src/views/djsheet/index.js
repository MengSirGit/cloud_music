import React, { Component } from 'react'
import { connect } from 'react-redux'

import Head from './head'
import Summary from './summary'
import Program from './program'
import '../../less/dj.less'

class DJSheet extends Component {
    render() {
        let _result = this.props.result
        if (Object.keys(_result).length === 0) return null
        return (
            <div className="sheet-box DJ">
                <Head />
                <Summary result={_result.djRadio} />
                <ul className="DJ-tab">
                    <li className="DJ-tab-menu">
                        <span className="detail">详情</span>
                        <span className="program active">节目</span>
                    </li>
                    <p className="sum">共{_result.program.count}期</p>
                    <li className="DJ-content">
                        <Program program={_result.program} />
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state.DJDetailReducer)
    return {
        result: state.DJDetailReducer
    }
}

export default connect(mapStateToProps)(DJSheet)