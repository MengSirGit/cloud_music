import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as api from '../../api'

class RenderDiscuss extends Component {
    constructor(props) {
        super(props)
        this.handleClickLike = this.handleClickLike.bind(this)
    }

    handleClickLike(id, cid, t, _type) {
        api.isCommentLike(id, cid, t, _type).then(res => {
            if (res.data.code === 200) {
                console.log('点赞成功')
            }
        })
    }

    render() {
        const secondTwoDay = 3600 * 24 * 1000
        let today = new Date().getTime(),
            objId = this.props.id,
            objType = this.props._type

        return (
            <ul className="discuss-box">
                {
                    this.props.con.map((e, i) => {
                        let _time = new Date(e.time)

                        return (
                            <li key={i}>
                                <div className="head-port"><img src={e.user.avatarUrl} alt="" /></div>
                                <div className="discuss-body">
                                    <div className="discuss-up">
                                        <div className="discuss-author">
                                            <p>{e.user.nickname}</p>
                                            <p>
                                                {
                                                    today - _time.getTime() > secondTwoDay ?
                                                        `${_time.getFullYear()}年${_time.getMonth() + 1}月${_time.getDate()}日`
                                                    :
                                                        `${_time.getHours() >= 10 ?_time.getHours() : `0${_time.getHours()}` }:${_time.getMinutes() >= 10 ? _time.getMinutes() : `0${_time.getMinutes()}` }`
                                                }
                                            </p>
                                        </div>
                                        <div className="discuss-like">
                                            <span className="list-count">{e.likedCount > 0 ? e.likedCount : false}</span>
                                            <i className={`iconfont${e.liked ? ' active' : ''}`} onClick={
                                                () => {
                                                    e.liked ? this.handleClickLike(objId, e.commentId, 0, objType) : this.handleClickLike(objId, e.commentId, 1, objType)
                                                }
                                            }>&#xe604;</i>
                                        </div>
                                    </div>
                                    <div className="discuss-down">
                                        <div className="content"><p>{e.content}</p></div>
                                        {
                                            e.beReplied.length > 0 ?
                                                <div className="replay">
                                                    <p><span>@{e.beReplied[0].user.nickname}</span>:{e.beReplied[0].content}</p>
                                                </div>
                                            :
                                                null
                                        }
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.discussDetailReducer.id,
        _type: state.discussDetailReducer.type
    }
}

export default connect(mapStateToProps)(RenderDiscuss)