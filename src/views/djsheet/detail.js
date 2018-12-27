import React from 'react'

const Detail = (props) => {
    let _djRadio = props.djRadio

    return (
        <React.Fragment>
            <h4 className="anchor">主播</h4>
            <div className="intro clearfix">
                <div className="thum"><img src={_djRadio['dj']['avatarUrl']} alt="" /></div>
                <div className="nick-name">
                    <p>{_djRadio['dj']['nickname']}</p>
                    <p>{_djRadio['dj']['description']}</p>
                </div>
                <div className="admire">
                    <button>赞赏</button>
                    <p>{_djRadio['dj']['rewardCount']}次赞赏</p>
                </div>
            </div>
            <div className="DJ-intro">
                <h4 className="anchor">电台内容简介</h4>
                <p className="label"><span>分类：</span><span className="assort">{_djRadio['category']}</span></p>
                <p className="content">{_djRadio['desc']}</p>
            </div>
            {
                _djRadio['commentDatas'].length > 0 ?
                    <div className="comments">
                        <h4 className="anchor">精彩评论</h4>
                        <ul>
                        {
                            _djRadio['commentDatas'].map((e, i) => {
                                return (
                                    <li className="comment-list" key={i}>
                                        <div className="info clearfix">
                                            <div className="thum"><img src={e.userProfile.avatarUrl} alt="" /></div>
                                            <p>{e.userProfile.nickname}</p>
                                        </div>
                                        <p className="comment-con">{e.content}</p>
                                        <p className="program">—— {e.programName}</p>
                                    </li>
                                )
                            })
                        }
                        </ul>
                    </div>
                :
                    null
            }
        </React.Fragment>
    )
}

export default Detail