import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import * as api from '../../api'
import { DJDetailAxios } from '../../store/actions'

class RecommendDj extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorRadio: []
        }
    }

    handleSendDjId(id, limit) {
        this.props.onHandleSendDjId(id, limit)
    }

    componentDidMount() {
        // 获取主播电台
        api.djRecommend().then(response => {
            if(response.data.code === 200){
                this.setState({
                    anchorRadio: response.data.djRadios
                })
            }
        })
    }

    render() {
        const {title} = this.props
        const {anchorRadio} = this.state
        if (anchorRadio.length === 0) return null
        return (
            <div className="recommond-song">
                <h3>{title}</h3>
                <ul className="song-list clearfix">
                    {
                        anchorRadio.map((data, i) => {
                            if(i < 6){
                                return (
                                    <li key={i} onClick={ () => {
                                        this.handleSendDjId(data.id, 40)
                                    }}>
                                        <Link to="/dj">
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
                    }
                </ul>
            </div>
        )       
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHandleSendDjId: (id, limit) => {
            dispatch(DJDetailAxios(id, limit))
        }
    }
}

export default connect(null, mapDispatchToProps)(RecommendDj)