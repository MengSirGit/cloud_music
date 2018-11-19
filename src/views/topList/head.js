import React from 'react'
import { withRouter } from 'react-router-dom'

import Back from '../../components/Back'

const TabHead = () => {
    return (
        <div className="sheet-head clearfix">
            <Back />
            <span>排行榜</span>
        </div>
    )
}

export default withRouter(TabHead)