import React, {Component} from 'react'

//中部快速导航
const classify = [
    //私人FM
    {
        name: '私人FM',
        icon: '\ue663'
    },
    //每日推荐
    {
        name: '每日推荐',
        icon: '\ue775'
    },
    //歌单
    {
        name: '歌单',
        icon: '\ue642'
    },
    //排行榜
    {
        name: '排行榜',
        icon: '\ue68d'
    },
]

class Classify extends Component{
    render(){
        return (
            <ul className="classify">
                {
                    classify.map((element, i) => {
                        return (
                            <li key={i}>
                                <p className="arc-back"><i className="iconfont">{element.icon}</i></p>
                                <p className="caption">{element.name}</p>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

export default Classify