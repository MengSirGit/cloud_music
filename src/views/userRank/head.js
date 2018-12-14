import React from 'react'
import { withRouter } from 'react-router-dom'

import Back from '../../components/Back'

const TabHead = () => {
    return (
        <div className="sheet-head clearfix">
            <Back />
            <i className="iconfont sheet-more">&#xe783;</i>
        </div>
    )
}

export default withRouter(TabHead)