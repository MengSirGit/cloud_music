import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import TabHead from './head'
import * as api from '../../api'
import {getSongSheet} from '../../store/actions'

import DiscussTarget from './discussTarget'
import WonderfulDiscuss from './wonderful'
import '../../css/discuss.css'

class Discuss extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            con: null
        }
    }
    componentWillMount(){
        let id = this.props._discuss_id
        console.log(id)
        api.getSheetDiscuss(id).then(res => {
            if(res.data.code === 200){
                console.log(res.data)
                this.setState({
                    con: res.data
                })
            }
        })
    }
    render(){
        const _props = this.props
        if(!_props._discuss_intro) return false
        return (
            <React.Fragment>
                <TabHead comment={_props._discuss_intro.commentCount}/>
                <DiscussTarget />
                <WonderfulDiscuss con={this.state.con}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        _discuss_id: state.sheetDiscussReducer.id,
        _discuss_intro: state.sheetDiscussReducer.intro
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSendSheet: (id) => {
            dispatch(getSongSheet(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discuss)