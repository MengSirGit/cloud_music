import React, {Component} from 'react'
import RenderDiscuss from './renderDiscuss'

class WonderfulDiscuss extends Component {
    render(){
        let con = this.props.con
        if(con === null) return false
        return (
            <React.Fragment>
                <h5 className="discuss-title-w">精彩评论</h5>
                <RenderDiscuss con={con.hotComments} />
            </React.Fragment>
        )
    }
}

export default WonderfulDiscuss
