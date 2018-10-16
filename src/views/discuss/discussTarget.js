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
        const id = this.props.id
        let CREATOR = this.props.con
        return (
            <div className="discuss-target clearfix">
                <Link to="/songsheet" onClick={() => this.handleSendToSheet(id)}>
                    <div className="discuss-thum"><img src={CREATOR.creator.avatarUrl} alt="" /></div>
                    <div className="discuss-line">
                        <p className="caption">{CREATOR.name}</p>
                        <p className="author">by <span>{CREATOR.creator.nickname}</span></p>
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