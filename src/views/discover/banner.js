import React, {Component} from 'react'

import * as api from '../../api'

class Banner extends Component{
    constructor(props){
        super(props)
        this.timerID = null
        this.state = {
            sIndex: 0,
            banners: []
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
    componentWillMount(){
        //获取banner信息
        api.getBanner().then(response => {
            if(response.data.code === 200){
                this.setState({
                    banners: response.data.banners
                })
            }
        })
    }
    componentWillUnmount(){
        clearInterval(this.timerID)
    }
    componentDidMount(){
        this.autoPlay()
    }
    render(){
        const {banners} = this.state
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

export default Banner
