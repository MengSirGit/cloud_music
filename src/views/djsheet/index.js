import React, { Component } from 'react'
import { connect } from 'react-redux'

import Head from './head'
import Summary from './summary'
import '../../less/dj.less'

class DJSheet extends Component {
    render() {
        let _result = this.props.result
        if (Object.keys(_result).length === 0) return null
        return (
            <div className="sheet-box DJ">
                <Head />
                <Summary result={_result.djRadio} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.DJDetailReducer)
    return {
        result: state.DJDetailReducer
    }
}

export default connect(mapStateToProps)(DJSheet)