import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

//返回
class GoBack extends Component {
    constructor(props){
        super(props)
        this.handleBack = this.handleBack.bind(this)
    }
    handleBack(){
        this.props.history.goBack()
    }
    render(){
        return (
            <i className="iconfont history-back" onClick={this.handleBack}>&#xe62e;</i>
        )
    }
}

export default withRouter(GoBack)