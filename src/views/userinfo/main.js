import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import RankPng from '../../static/img/rank.png'
import { songSheetAxios, userPlayRankAxios } from '../../store/actions'

class Main extends Component {
    constructor(props) {
        super(props)
        this.handleSendSheetId = this.handleSendSheetId.bind(this)
        this.handleUserPlayBack= this.handleUserPlayBack.bind(this)
    }

    handleSendSheetId(id) {
        this.props.onHandleSendSheetId(id)
    }

    handleUserPlayBack(id, _type) {
        this.props.onHandleUserPlayBack(id, _type)
    }

    render() {
        let collect = this.props.data,
            userId = this.props.userId,
            selfSheet = [],
            collectSheet = []
        console.log(userId)
        collect.map((e) => {
            if (e.userId === userId) {
                selfSheet.push(e)
            }
            else {
                collectSheet.push(e)
            }
            return true
        })

        return (
            <div className="user-info-main">
                <ul className="tab-menu">
                    <li className="active">音乐({collect.length})</li>
                    <li>动态</li>
                    <li>关于TA</li>
                </ul>
                <div className="user-songsheet">
                    <h4>歌单({selfSheet.length})</h4>
                    <ul className="normal-songsheet">
                        <li className="songsheet-all" onClick={ () => this.handleUserPlayBack(userId, 1) }>
                            <Link to="/userplayrank">
                                <div className="thum"><img src={RankPng} alt="" /></div>
                                <div className="content">
                                    <p className="name">{selfSheet[0].name}的听歌排行</p>
                                    <p className="nature"><span>累计听歌{this.props.listenSongs}首</span></p>
                                </div>
                            </Link>
                        </li>
                        {
                            selfSheet.map((e, i) => {
                                return (
                                    <li className="songsheet-all" key={i} onClick={ () => this.handleSendSheetId(e.id) }>
                                        <Link to="/songsheet">
                                            <div className="thum"><img src={e.coverImgUrl} alt="" /></div>
                                            <div className="content">
                                                <p className="name">{e.name}</p>
                                                <p className="nature"><span>{e.trackCount}首,</span><span>播放{e.playCount}次</span></p>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <h4>收藏的歌单({collectSheet.length})</h4>
                    <ul className="collect-songsheet">
                        {
                            collectSheet.map((e, i) => {
                                return (
                                    <li className="songsheet-all" key={i} onClick={() => this.handleSendSheetId(e.id)}>
                                        <Link to="/songsheet">
                                            <div className="thum"><img src={e.coverImgUrl} alt="" /></div>
                                            <div className="content">
                                                <p className="name">{e.name}</p>
                                                <p className="nature"><span>{e.trackCount}首,</span><span>by {e.creator.nickname},</span><span>播放{e.playCount}次</span></p>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHandleSendSheetId: (id) => {
            dispatch(songSheetAxios(id))
        },
        onHandleUserPlayBack: (id, _type) => {
            dispatch(userPlayRankAxios(id, _type))
        }
    }
} 

export default connect(null, mapDispatchToProps)(Main)