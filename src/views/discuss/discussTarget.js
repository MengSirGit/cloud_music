import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSongSheet} from '../../store/actions'

class DiscussTarget extends Component {
    constructor(props){
        super(props)
        this.handleSendToSheet = this.handleSendToSheet.bind(this)
    }
    handleSendToSheet(id){
        this.props.onSendSheet(id)
    }
    render(){
        let {_discuss_sheet_id, _discuss_sheet_type} = this.props, img, name, nickname
        if(_discuss_sheet_type === 2){
            img = this.props._discuss_sheet_intro.creator.avatarUrl,
            name = this.props._discuss_sheet_intro.name,
            nickname = this.props._discuss_sheet_intro.creator.nickname
        }else if(_discuss_sheet_type === 0){
            img = this.props._discuss_song_infor[0].al.picUrl,
            name = this.props._discuss_song_infor[0].name,
            nickname = this.props._discuss_song_infor[0].ar[0].name
        }
        return (
            <div className="discuss-target clearfix">
                <Link to="/songsheet" onClick={() => this.handleSendToSheet(_discuss_sheet_id)}>
                    <div className="discuss-thum"><img src={img} alt="" /></div>
                    <div className="discuss-line">
                        <p className="caption">{name}</p>
                        <p className="author">by <span>{nickname}</span></p>
                    </div>
                </Link>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSendSheet: (id) => {
            dispatch(getSongSheet(id))
        }
    }
}

export default connect(null, mapDispatchToProps)(DiscussTarget)