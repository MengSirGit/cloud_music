import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as api from '../../api'
import { getSongSheet } from '../../store/actions'

class NewMusic extends Component {
    constructor(props) {
        super(props)
        this.id = null
        this.type = null
        this.state = {
            newSong: []
        }
        this.handleSendID = this.handleSendID.bind(this)
    }

    handleSendID(id) {
        this.props.onHandleSendID(id)
    }

    componentDidMount() {
        //获取最新音乐
        api.newPlate().then(response => {
            if (response.data.code === 200) {
                this.setState({
                    newSong: response.data.albums
                })
            }
        })
    }

    render() {
        const {title} = this.props
        const {newSong} = this.state

        return (
            <div className="recommond-song">
                <h3>{title}</h3>
                <ul className="song-list clearfix">
                    {
                        newSong.length > 0 ? 
                            newSong.map((data, i) => {
                                if (i < 6) {
                                    return (
                                        <li key={i}>
                                            <Link to="/albumsheet" onClick={() => { this.handleSendID(data.id) }}>
                                                <p className="thum"><img src={data.picUrl} alt="" /></p>
                                                <p className="title">{data.name}</p>
                                                {
                                                    data.type !== 0 && data.type !== undefined ? <p className="artist">{data.artist.name}</p>  : false
                                                }
                                            </Link>
                                        </li>
                                    )
                                }
                                return true
                            })
                        :
                            null
                    }
                </ul>
            </div>
        )       
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHandleSendID: (id) => {
            dispatch(getSongSheet(id))
        }
    }
}

export default connect(null, mapDispatchToProps)(NewMusic)