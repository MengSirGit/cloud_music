import React, {Component} from 'react'

class Summary extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const _data = this.props.data

        if(Object.keys(_data).length === 0) return false

        return(
            <div className="sheet-summary clearfix">
                <div className="sheet-summary-show clearfix">
                    <div className="sheet-summary-thum">
                        <img src={_data.coverImgUrl} alt="" />
                    </div>
                    <div className="sheet-summary-news">
                        <p>{_data.name}</p> 
                        <p><span className="head"><img src={_data.creator.avatarUrl} alt="" /></span><span className="name">{_data.creator.nickname}</span></p>
                    </div>
                </div>
                <ul className="sheet-summary-contrl">
                    <li><i className="iconfont discuss">&#xe63d;</i><p>{_data.commentCount}</p></li>
                    <li><i className="iconfont share">&#xe8b8;</i><p>{_data.shareCount}</p></li>
                    <li><i className="iconfont down">&#xe890;</i><p>下载</p></li>
                    <li><i className="iconfont checkbox">&#xe6b4;</i><p>多选</p></li>
                </ul>
            </div>
        )
    }
}

export default Summary