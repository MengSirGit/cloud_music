import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMusicDetail, musicUrlAction } from '../../store/actions'

class RankList extends Component {
    constructor(props) {
        super(props)
        this.handleSendSongId = this.handleSendSongId.bind(this)
    }

    handleSendSongId(id, proto) {
        this.props.onHandleSendSongId(id, proto)
    }

    render() {
        let result = this.props.result

        return (
            <React.Fragment>
                {
                    result.isCall ?
                    <ul className="rank-list">
                    {
                        result.musicArray.map((e, i) => {
                            return (
                                <li className="rank-song clearfix" key={i} onClick={() => this.handleSendSongId(e.song.id, 1)}>
                                    <p className="rank-index">{i + 1}</p>
                                    <div className="rank-con">
                                        <p className="song-name">{e.song.name}</p>
                                        <p className="song-author">{e.song.ar[0]['name']}</p>
                                    </div>
                                </li>
                            )
                        })
                    }            
                    </ul>
                :
                    <p className="msg">{result.msg}</p>
                }
            </React.Fragment>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onHandleSendSongId: (id, proto) => {
            dispatch(getMusicDetail(id))
            dispatch(musicUrlAction(id, proto))
        }
    }
}

export default connect(null, mapDispatchToProps)(RankList)