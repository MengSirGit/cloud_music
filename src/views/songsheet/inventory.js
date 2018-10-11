import React, {Component} from 'react'

class Inventory extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const _data = this.props.data

        if(Object.keys(_data).length === 0) return false
        console.log(_data)
        return (
            <article className="inventory">
                <ul className="inventory-list">
                    {
                        _data.tracks.map((e, i) => {
                            return (
                                <li className="clearfix" key={i}>
                                    <div className="index">{i + 1}</div>
                                    <div className="inventory-box">
                                        <div className="inventory-caption clearfix">
                                            <div className="caption-line">
                                                <p className="inventory-name">{e.name}
                                                    {
                                                        e.alia.length > 0 ? <span>({e.alia[0]})</span> : false
                                                    }
                                                </p>
                                                <p className="inventory-artist">{e.ar[0].name}-{e.al.name}</p>
                                            </div>
                                            <i className="iconfont">&#xe783;</i>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </article>
        )
    }
}

export default Inventory