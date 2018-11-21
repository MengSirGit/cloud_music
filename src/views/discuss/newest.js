import React from 'react'

import RenderDiscuss from './renderDiscuss'

const Newest = (props) => {
    if(props.con.length === 0) return null
    let con = props.con
    
    return (
        <React.Fragment>
            <h5 className="discuss-title-w">最新评论</h5>
            <RenderDiscuss con={con} />
        </React.Fragment>
    )
}

export default Newest