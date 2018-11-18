import React from 'react'

import publicBg from '../../static/img/bg-pulic.jpg'

const Summary = () => {
    return (
        <div className="sheet-summary clearfix" style={{
            background: `url(${publicBg}) no-repeat center`,
            backgroundSize: '100%'
        }}>
            <div className="calender"><p>{new Date().getDate()}</p></div>
            <p className="prompt">根据你的音乐口味生成, 每天6:00更新</p>
        </div>
    )
}

export default Summary