import React, { Component } from 'react'

class UserSummary extends Component {
    render() {
        let _summary = this.props.data

        return (
            <div className="user-show">
                <div className="vision">
                    <div className="thum"><img src={_summary.profile.avatarUrl} alt="" /></div>
                    <div className="follow"><span>+ 关注</span></div>
                </div>
                <p className="nickname">{_summary.profile.nickname}</p>
                <p className="fans"><span>关注 {_summary.profile.follows}</span><span>粉丝 {_summary.profile.followeds}</span></p>
                <p className="property"><span className="level">LV{_summary.level}</span></p>
            </div>
        )
    }
}

export default UserSummary