import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { songSheetAxios } from '../../store/actions'

class DiscussTarget extends Component {
    handleSendToSheet(id) {
        this.props.onSendSheet(id)
    }

    render() {
  
        return (
            <div className="discuss-target clearfix">
                {/* <Link to="/songsheet"> */}
                    <div className="discuss-thum"><img src={this.props.coverImgUrl} alt="" /></div>
                    <div className="discuss-line">
                        <p className="caption">{this.props.name}</p>
                        <p className="author">by <span>{this.props.creatorName}</span></p>
                    </div>
                {/* </Link> */}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSendSheet: (id) => {
            dispatch(songSheetAxios(id))
        }
    }
}

export default connect(null, mapDispatchToProps)(DiscussTarget)