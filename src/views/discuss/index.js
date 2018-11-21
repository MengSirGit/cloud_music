import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import TabHead from './head'
import DiscussTarget from './discussTarget'
import WonderfulDiscuss from './wonderful'
import Newest from './newest'
import Comment from './comment'
import '../../css/discuss.css'

class Discuss extends PureComponent {
    render(){
        if (this.props._discuss_array.length === 0) return null
        const discuss = this.props._discuss_array.data
        const detail = this.props._discuss_detail
        // console.log(detail)
        return (
            <React.Fragment>
                {/* 标签 */}
                <TabHead comment={discuss.total ? discuss.total : 0} />
                {/* 歌单标题及创建者 */}
                <DiscussTarget {...detail} />
                {/* 精彩评论 */}
                <WonderfulDiscuss con={discuss.hotComments}/>
                {/* 最新评论 */}
                <Newest con={discuss.comments} />
                {/* 评论发送 */}
                <Comment id={detail.id} type={detail.type}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        _discuss_array: state.discussReducer,
        _discuss_detail: state.discussDetailReducer
    }
}

export default connect(mapStateToProps)(Discuss)