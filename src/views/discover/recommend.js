import React, {Component} from 'react'

import * as api from '../../api'
import Nav from './nav'

import '../../css/recommend.css'

class Recommend extends Component {
    constructor(props){
        super(props)
        this.state = {
            banners: []
        }
    }
    componentDidMount(){
        //获取banner信息
        api.getBanner().then(response => {
            if(response.data.code === 200){
                this.setState({
                    banners: response.data.banners
                })
            }
        })
    }
    render(){
        const {banners} = this.state
        return (
            <React.Fragment>
                <Nav />
                <Banner banners={banners} />
                <Classify />
            </React.Fragment>
        )
    }
}

//banner
/**
 * 后期重构
 */
class Banner extends Component{
    constructor(props){
        super(props)
        this.state = {
            timerID: null,
            sIndex: 0
        }
        this.autoPlay = this.autoPlay.bind(this)
    }
    autoPlay(){
        this.state.timerID = setInterval(() => {
            if(this.state.sIndex >= 7){
                this.setState({
                    sIndex: 0
                })
            }else{
                this.setState({
                    sIndex: this.state.sIndex + 1
                })
            }
            // setTimeout(fn, 5000)
        }, 5000)
    }
    componentWillUnmount(){
        clearInterval(this.state.timerID)
    }
    componentDidMount(){
        this.autoPlay()
    }
    render(){
        const {banners} = this.props
        let bannerList = null
        let imgWidth = window.innerWidth
        if(banners.length > 0){
            bannerList = banners.map((e, i) => {
                return (
                    <li className="list" key={i} style={{width: imgWidth + 'px'}}><img src={e.picUrl} alt="" /></li>
                )
            })
        }
        return (
            <div className="banner">
                <ul className="banner-box" 
                style={{
                    width: imgWidth * banners.length + 'px',
                    marginLeft: -(imgWidth * this.state.sIndex) + 'px'
                }}>
                    {bannerList}
                </ul>
            </div>
        )
    }
}

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
        icon: '\ue641'
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

export default Recommend