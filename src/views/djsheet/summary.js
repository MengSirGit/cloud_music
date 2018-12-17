import React from 'react'

const Summary = (props) => {
    console.log(props)
    return (
        <div className="summary">
            <div className="shadown-box">
                <div className="headline">
                    <p className="dj-name">{props.result.name}</p>
                    <p className="sub-count">{props.result.subCount}人已订阅</p>
                </div>
                <div className="sub-btn">订阅</div>
            </div>
            <img src={props.result.picUrl} alt="" />
        </div>
    )
}

export default Summary