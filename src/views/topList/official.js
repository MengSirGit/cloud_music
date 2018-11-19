import React, { Component } from 'react'

class OfficialList extends Component {
    render() {
        const _list = this.props.data.list
        const _artist = this.props.data.artistToplist
        const _reward = this.props.data.rewardToplist
        console.log(this.props)
        return (
            <div className="official-rank">
                <h3>官方榜</h3>
                <ul className="rank-list">
                    {
                        _list.map((e, i) => {
                            if (i < 4) {
                                return (
                                    <li className="rank-node clearfix" key={i}>
                                        <div className="rank-thum">
                                            <div className="intro">{e.updateFrequency}</div>
                                            <img src={e.coverImgUrl} alt="" />
                                        </div>
                                        <ul className="rank-tracks">
                                            {
                                                e.tracks.map((n, k) => {
                                                    return (
                                                        <li className="track-node" key={k}><span>{k + 1}.</span><span>{n.first}</span>-<span>{n.second}</span></li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </li>
                                )
                            }
                        })
                    }
                    {/* 赞赏榜 */}
                    <li className="rank-node clearfix">
                        <div className="rank-thum">
                            <div className="intro">实时更新</div>
                            <img src={_reward.coverUrl} alt="" />
                        </div>
                        <ul className="rank-tracks">
                            {
                                _reward.songs.map((e, i) => {
                                    return (
                                        <li className="track-node" key={i}><span>{i + 1}.</span><span>{e.name}</span>-<span>{e.artists[0].name}</span></li>
                                    )
                                })
                            }
                        </ul>
                    </li>
                    {/* 歌手榜 */}
                    <li className="rank-node clearfix">
                        <div className="rank-thum">
                            <div className="intro">{_artist.updateFrequency}</div>
                            <img src={_artist.coverUrl} alt="" />
                        </div>
                        <ul className="rank-tracks">
                            {
                                _artist.artists.map((e, i) => {
                                    return (
                                        <li className="track-node" key={i}><span>{i + 1}.</span><span>{e.first}</span>-<span>{e.third}</span></li>
                                    )
                                })
                            }
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

export default OfficialList