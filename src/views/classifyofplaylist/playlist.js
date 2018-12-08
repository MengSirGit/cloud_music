import React from 'react'

const NetPlaylist = (props) => {
    return (
        <ul className="hot-list">
            {
                props.list.map((e, i) => {
                    return (
                        <li className="hot-node" key={i}>
                            <div className="hot-box">
                                <img className="node-bg" src={e.coverImgUrl} alt="" />
                                <div className="hot-cunk">
                                    <p className="play-count"><i className="iconfont">&#xe6bf;</i><span>{Number(e.playCount) > 100000 ? `${Math.ceil(e.playCount / 10000)}万` : e.playCount}</span></p>
                                    <p className="play-creator"><i className="iconfont">&#xe618;</i><span>{e.creator.nickname}</span></p>
                                </div>
                            </div>
                            <p className="play-caption">{e.name}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default NetPlaylist