import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as api from '../../api'
import {getSongSheet, currMusic} from '../../store/actions'

class RecommendSheet extends Component {
    constructor(props){
        super(props)
        this.id = null
        this.type = null
        this.state = {
            recommondSong: []
        }
        this.handleSendSheet = this.handleSendSheet.bind(this)
    }
    componentDidMount(){
        //获取推荐歌单
        api.getDayRecommonSheet().then(response => {
            if(response.data.code === 200){
                this.setState({
                    recommondSong: response.data.recommend
                })
                //底部默认播放推荐歌单第一个
                this.props.onCurrMusic(response.data.recommend[1].id)
            }
        })
    }
    handleSendSheet(id, type){
        this.id = id
        this.type = type
        this.props.onSendRecommendSheet(this.id, this.type)
    }
    render(){
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
                                                this.handleSendSheet(data.id, data.type)
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

const mapDispatchToProps = (dispatch) => {
    return {
        onSendRecommendSheet: (id, type) => {
            dispatch(getSongSheet(id, type))
        },
        onCurrMusic: (id) => {
            dispatch(currMusic(id))
        }
    }
}

export default connect(null, mapDispatchToProps)(RecommendSheet)