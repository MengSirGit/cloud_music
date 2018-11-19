import React, { Component } from 'react'

class WorldList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const _list = this.props.data.list
        return (
            <div className="world-rank">
                <h3>全球榜</h3>
                <ul className="rank-list clearfix">
                    {
                        _list.slice(4).map((e, i) => {
                            return (
                                <li className="rank-node" key={i}>
                                    <div className="world-rank-thum"><img src={e.coverImgUrl} alt="" /></div>
                                    <p className="caption">{e.name}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default WorldList