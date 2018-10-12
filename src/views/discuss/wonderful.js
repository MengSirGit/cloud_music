import React, {Component} from 'react'

class WonderfulDiscuss extends Component {
    constructor(props){
        super(props)
    }
    render(){
        let con = this.props.con
        console.log(con)
        if(con === null) return false
        return (
            <React.Fragment>
                <h5 className="discuss-title-w">精彩评论</h5>
                <ul className="discuss-box">
                    {
                        con.hotComments.map((e, i) => {
                            return (
                                <li key={i}>
                                    <div className="head-port"><img src={e.user.avatarUrl} alt="" /></div>
                                    <div className="discuss-body">
                                        <div className="discuss-up">
                                            <div className="discuss-author">
                                                <p>{e.user.nickname}</p>
                                                <p>08:37</p>
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
            </React.Fragment>
        )
    }
}

export default WonderfulDiscuss
