import React from 'react'

const RenderDiscuss = (props) => {
    // console.log(props)
    return (
        <ul className="discuss-box">
            {
                props.con.map((e, i) => {
                    return (
                        <li key={i}>
                            <div className="head-port"><img src={e.user.avatarUrl} alt="" /></div>
                            <div className="discuss-body">
                                <div className="discuss-up">
                                    <div className="discuss-author">
                                        <p>{e.user.nickname}</p>
                                        <p>{new Date(e.time).getHours()}:{new Date(e.time).getMinutes()}</p>
                                    </div>
                                    <div className="discuss-like">
                                        <span className="list-count">{e.likedCount > 0 ? e.likedCount : false}</span>
                                        <i className="iconfont">&#xe503;</i>
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
                                            false
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