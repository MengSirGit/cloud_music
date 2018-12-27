import React, { Component } from 'react'
import { connect } from 'react-redux'

import Head from './head'
import Summary from './summary'
import Detail from './detail'
import Program from './program'
import '../../less/dj.less'

class DJSheet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            val: '2'
        }
        this.handleChangeAction = this.handleChangeAction.bind(this)
    }

    handleChangeAction(e) {
        let _index = e.target.dataset.index

        this.setState({
            val: _index
        })
    }

    render() {
        let _result = this.props.result
        if (Object.keys(_result).length === 0) return null

        return (
            <div className="sheet-box DJ">
                <Head />
                <Summary result={_result.djRadio} />
                <ul className="DJ-tab">
                    <li className="DJ-tab-menu">
                        <span className={`detail${this.state.val === '1' ? ' active': ''}`} data-index='1' onClick={ (e) => this.handleChangeAction(e) }>详情</span>
                        <span className={`program${this.state.val === '2' ? ' active': ''}`} data-index='2' onClick={ (e) => this.handleChangeAction(e) }>节目</span>
                    </li>
                    {
                        this.state.val === '2' ? <p className="sum">共{_result.program.count}期</p> : false
                    }
                    <li className="DJ-content">
                    {
                        this.state.val === '1' ? <Detail djRadio={_result.djRadio} /> : <Program program={_result.program} />
                    }
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