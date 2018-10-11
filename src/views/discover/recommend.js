import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSongSheet} from '../../store/actions'

import * as api from '../../api'
import Header from '../../components/Header'
import Nav from './nav'

import '../../css/recommend.css'

//banner
/**
 * 后期重构
 */
class Banner extends Component{
    constructor(props){
        super(props)
        this.timerID = null
        this.state = {
            sIndex: 0
        }
        this.autoPlay = this.autoPlay.bind(this)
    }
    autoPlay(){
        this.timerID = setInterval(() => {
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
        clearInterval(this.timerID)
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
                <ul className="banner-box clearfix" 
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

/**
 * 高阶组件应用
 * @param {*} WrappedWithComponent 
 * 针对推荐歌单、最新音乐、主播电台
 *#### 后期需要优化####
 */
const WrappedComponent = (WrappedWithComponent) => {
    return class NewComponent extends Component {
        constructor(props){
            super(props)
            this.id = null
            this.type = null
            this.handleSendSheet = this.handleSendSheet.bind(this)
        }
        handleSendSheet(id, type){
            this.id = id
            this.type = type
            this.props.onSendSheet(this.id, this.type)
        }
        render(){
            const {songDatas, title} = this.props
            let songList = null
            if(songDatas.length > 0){
                songList = songDatas.map((data, i) => {
                    if(i < 6){
                        return (
                            <li key={i}>
                                <Link to="/songsheet" onClick={() => this.handleSendSheet(data.id, data.type)}>
                                    <p className="thum"><img src={data.picUrl} alt="" /></p>
                                    <p className="title">{data.name}</p>
                                    {
                                        data.type !== 0 && data.type !== undefined ? <p className="artist">{data.artist.name}</p>  : false
                                    }
                                </Link>
                            </li>
                        )
                    }
                })
            }
            
            return <WrappedWithComponent songList={songList} title={title}/>
        }
    }
}

class CreateComponet extends Component {
    render(){
        return (
            <div className="recommond-song">
                <h3>{this.props.title}</h3>
                <ul className="song-list clearfix">
                    {this.props.songList}
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSendSheet: (id, type) => {
            dispatch(getSongSheet(id, type))
        }
    }
}

const BeforeHighOrderMusic = WrappedComponent(CreateComponet)

const HighOrderMusic = connect(null, mapDispatchToProps)(BeforeHighOrderMusic)

//推荐页面整合
const pageMenu = {
    recomm: '推荐歌单',
    new: '最新音乐',
    exclusive: '独家放送',
    radio: '主播电台'
}

class Recommend extends Component {
    constructor(props){
        super(props)
        this.state = {
            banners: [],
            recommondSong: [],
            newSong: [],
            anchorRadio: []
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
        //获取推荐歌单
        api.getRecommonSong().then(response => {
            if(response.data.code === 200){
                this.setState({
                    recommondSong: response.data.result
                })
            }
        })
        //获取最新音乐
        api.newPlate().then(response => {
            if(response.data.code === 200){
                this.setState({
                    newSong: response.data.albums
                })
            }
        })
        //获取主播电台
        api.djRecommend().then(response => {
            if(response.data.code === 200){
                this.setState({
                    anchorRadio: response.data.djRadios
                })
            }
        })
    }
    render(){
        const {banners, recommondSong, newSong, anchorRadio} = this.state
        return (
            <React.Fragment>
                <Header />
                {/* 导航 */}
                <Nav />
                {/* banner */}
                <Banner banners={banners} />
                {/* 快速导航 */}
                <Classify />
                {/* 推荐歌单 */}
                <HighOrderMusic songDatas={recommondSong} title={pageMenu.recomm} />
                {/* 最新音乐 */}
                <HighOrderMusic songDatas={newSong} title={pageMenu.new}/>
                {/* 主播电台 */}
                <HighOrderMusic songDatas={anchorRadio} title={pageMenu.radio}/>
            </React.Fragment>
        )
    }
}

export default Recommend