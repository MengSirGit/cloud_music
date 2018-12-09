import React from 'react'
import { withRouter } from 'react-router-dom'

import Back from '../../components/Back'

const TabHead = () => {
    return (
        <div className="sheet-head clearfix">
            <Back />
            <span>选择分类</span>
        </div>
    )
}

export default withRouter(TabHead)