import React, { Component } from 'react'
import * as api from '../../api'

class Comment extends Component {
    constructor(props) {
        super(props)
        this.handleSendComment = this.handleSendComment.bind(this)
    }

    handleSendComment(type, id) {
        let content = this.refs.commentInput.value

        if (content !== '' && content !== undefined && content !== null && typeof content === 'string') {
            api.sendComment(type, id, content)
            console.log('发送成功')
        }

        this.refs.commentInput.value = ''
    }

    render() {
        let type = this.props.type,
            id = this.props.id

        return (
            <div className="comment">
                <input ref="commentInput" className="comment-input" name="" defaultValue="" placeholder="听说爱评论的人粉丝多..." />
                <button id="send" onClick={ () => this.handleSendComment(type, id)}>发送</button>
            </div>
        )
    }
}

export default Comment