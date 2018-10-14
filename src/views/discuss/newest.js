import React from 'react'

import RenderDiscuss from './renderDiscuss'

const Newest = (props) => {
    let con = props.con
    if(con === null) return false
    return (
        <React.Fragment>
            <h5 className="discuss-title-w">最新评论</h5>
            <RenderDiscuss con={con.comments} />
        </React.Fragment>
    )
}

export default Newest