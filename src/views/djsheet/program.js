import React, { Component } from 'react'
import { connect } from 'react-redux'
import { musicDetailAxios, musicUrlActionAxios } from '../../store/actions'

class Programs extends Component {
    constructor(props) {
        super(props)
        this.handleSendId = this.handleSendId.bind(this)
    }

    handleSendId(id, proto) {
        // console.log(id)
        this.props.onHandleSendId(id, proto)
    }

    render() {
        let program = this.props.program
        // console.log(program)
        return (
            <React.Fragment>
                <ul className="program-list">
                {
                    program.programs.map((e, i) => {
                        let _time = new Date(e.createTime),
                            _duration = (e.duration / 1000 / 60).toFixed(2) * 1,
                            _minute = Math.floor(_duration),
                            _second = ((_duration - _minute) * 60).toFixed(0) * 1

                        return (
                            <li className="program clearfix" key={i} onClick={
                                () => this.handleSendId(e.mainSong.id, 1)
                            }>
                                <p className="index">{program.count - i}</p>
                                <div className="caption">
                                    <p className="title">{e.name}</p>
                                    <p className="info">
                                        <span>{`${_time.getMonth() + 1 >= 10 ? _time.getMonth() + 1 : `0${_time.getMonth() + 1}` }-${_time.getDate() > 10 ? _time.getDate() : `0${_time.getDate()}`}`}</span>
                                        <span>{e.listenerCount}</span>
                                        <span>{`${_minute >= 10 ? _minute : `0${_minute}`}:${_second >= 10 ? _second : `0${_second}`}`}</span>
                                    </p>
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

const mapDispatchToProps = (dispatch) => {
    return {
        onHandleSendId: (id, proto) => {
            dispatch(musicDetailAxios(id))
            dispatch(musicUrlActionAxios(id, proto))
        }
    }
}

export default connect(null, mapDispatchToProps)(Programs)