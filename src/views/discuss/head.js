import React from 'react'

import Back from '../../components/Back'

const TabHead = (props) => {
    return (
        <div className="discuss-head clearfix">
            <Back />
            <span>评论({props.comment})</span>
            <i className="iconfont discuss-share">&#xe8b8;</i>
        </div>
    )
}

export default TabHead