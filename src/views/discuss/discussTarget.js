import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSongSheet} from '../../store/actions'

class DiscussTarget extends Component {
    constructor(props){
        super(props)
        this.img = null
        this.name = null
        this.nickname = null
        this.handleSendToSheet = this.handleSendToSheet.bind(this)
        this.handleAssignment = this.handleAssignment.bind(this)
    }
    handleSendToSheet(id){
        this.props.onSendSheet(id)
    }
    handleAssignment(d_type, props){
        if (d_type === 2) {
            this.img = props._discuss_sheet_intro.creator.avatarUrl
            this.name = props._discuss_sheet_intro.name
            this.nickname = props._discuss_sheet_intro.creator.nickname
        }
        else if (d_type === 0) {
            this.img = props._discuss_song_infor[0].al.picUrl
            this.name = props._discuss_song_infor[0].name
            this.nickname = props._discuss_song_infor[0].ar[0].name
        }
    }
    render(){
        let {_discuss_sheet_id, _discuss_sheet_type} = this.props
        this.handleAssignment(_discuss_sheet_type, this.props)
        // if(_discuss_sheet_type === 2){
        //     img = this.props._discuss_sheet_intro.creator.avatarUrl,
        //     name = this.props._discuss_sheet_intro.name,
        //     nickname = this.props._discuss_sheet_intro.creator.nickname
        // }else if(_discuss_sheet_type === 0){
        //     img = this.props._discuss_song_infor[0].al.picUrl,
        //     name = this.props._discuss_song_infor[0].name,
        //     nickname = this.props._discuss_song_infor[0].ar[0].name
        // }
        return (
            <div className="discuss-target clearfix">
                <Link to="/songsheet" onClick={() => this.handleSendToSheet(_discuss_sheet_id)}>
                    <div className="discuss-thum"><img src={this.img} alt="" /></div>
                    <div className="discuss-line">
                        <p className="caption">{this.name}</p>
                        <p className="author">by <span>{this.nickname}</span></p>
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