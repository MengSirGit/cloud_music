import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import TabHead from './head'
import * as api from '../../api'
import {getSongSheet} from '../../store/actions'

import DiscussTarget from './discussTarget'
import WonderfulDiscuss from './wonderful'
import Newest from './newest'
import '../../css/discuss.css'

class Discuss extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            con: null,
            newCon: null
        }
    }
    componentWillMount(){
        let id = this.props._discuss_id
        console.log(id)
        //热门评论
        api.getHotDiscuss(id, 2).then(res => {
            if(res.data.code === 200){
                console.log(res.data)
                this.setState({
                    con: res.data
                })
            }
        })
        //最新评论
        api.getSheetDiscuss(id, 10, 1).then(res => {
            if(res.data.code === 200){
                this.setState({
                    newCon: res.data
                })
            }
        })
    }
    render(){
        const _props = this.props
        if(!_props._discuss_intro) return false
        return (
            <React.Fragment>
                {/* 标签 */}
                <TabHead comment={_props._discuss_intro.commentCount}/>
                {/* 歌单标题及创建者 */}
                <DiscussTarget id={this.props._discuss_id} con={this.props._discuss_intro}/>
                {/* 精彩评论 */}
                <WonderfulDiscuss con={this.state.con}/>
                {/* 最新评论 */}
                <Newest con={this.state.newCon} />
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