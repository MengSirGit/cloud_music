import React from 'react'

const RenderDiscuss = (props) => {
    // console.log(props.con)
    const secondTwoDay = 3600 * 24 * 1000
    let today = new Date().getTime()
    return (
        <ul className="discuss-box">
            {
                props.con.map((e, i) => {
                    let _time = new Date(e.time)
                    return (
                        <li key={i}>
                            <div className="head-port"><img src={e.user.avatarUrl} alt="" /></div>
                            <div className="discuss-body">
                                <div className="discuss-up">
                                    <div className="discuss-author">
                                        <p>{e.user.nickname}</p>
                                        {/* <p>{new Date(e.time).getHours()}:{new Date(e.time).getMinutes()}</p> */}
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
                                        <i className="iconfont">&#xe604;</i>
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

export default RenderDiscuss