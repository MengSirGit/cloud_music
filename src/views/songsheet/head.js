import React from 'react'
import {Link, withRouter} from 'react-router-dom'

import Back from '../../components/Back'

const TabHead = () => {
    return (
        <div className="sheet-head clearfix">
            <Back />
            <span>歌单</span>
            <i className="iconfont sheet-more">&#xe783;</i>
            <Link to="/search"><i className="iconfont sheet-search">&#xe607;</i></Link>
        </div>
    )
}

export default withRouter(TabHead)