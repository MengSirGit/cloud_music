import React, {Component} from 'react'
import RenderDiscuss from './renderDiscuss'

class WonderfulDiscuss extends Component {
    render(){
        let con = this.props.con
        if(con === null) return null
        return (
            <React.Fragment>
                <h5 className="discuss-title-w">精彩评论</h5>
                <RenderDiscuss con={con} />
            </React.Fragment>
        )
    }
}

export default WonderfulDiscuss
