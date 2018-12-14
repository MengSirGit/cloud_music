import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as api from '../../api'
import {getSongSheet, currMusic, getMusicPos} from '../../store/actions'

class RecommendSheet extends Component {
    constructor(props) {
        super(props)
        this.id = null
        this.type = null
        this.state = {
            recommondSong: []
        }
        this.handleSendSheet = this.handleSendSheet.bind(this)
    }

    componentDidMount() {

        // 获取推荐歌单
        if (this.props.loginCode === 200) {
            // 登录状态下
            api.getDayRecommonSheet().then(response => {
                if(response.data.code === 200){
                    this.setState({
                        recommondSong: response.data.recommend
                    })
                    // 底部默认播放推荐歌单第一个
                    this.props.onCurrMusic(response.data.recommend[1].id)
                }
            })
        }
        else if (this.props.loginCode === 0) {
            // 非登录状态下
            api.getRecommonSong().then(res => {
                if (res.data.code === 200) {
                    this.setState({
                        recommondSong: res.data.result
                    })

                     this.props.onCurrMusic(res.data.result[1].id)
                }
            })
        }
    }

    handleSendSheet(id) {
        this.props.onSendRecommendSheet(id)
    }

    render() {
        const {title} = this.props
        const {recommondSong} = this.state
        return (
            <div className="recommond-song">
                <h3>{title}</h3>
                <ul className="song-list clearfix">
                    {
                        recommondSong.length > 0 ? 
                            recommondSong.map((data, i) => {
                                if(i < 6){
                                    return (
                                        <li key={i}>
                                            <Link to="/songsheet" onClick={() => {
                                                this.handleSendSheet(data.id)
                                            }}>
                                                <p className="thum"><img src={data.picUrl} alt="" /></p>
                                                <p className="title">{data.name}</p>
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

const mapStateToProps = (state) => {
    return {
        loginCode: state.loginValueReducer.code
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSendRecommendSheet: (id) => {
            dispatch(getSongSheet(id))
        },
        onCurrMusic: (id) => {
            dispatch(currMusic(id))
        },
        onSendMusicPos: (num) => {
            dispatch(getMusicPos(num))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendSheet)