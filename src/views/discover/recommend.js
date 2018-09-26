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
            </React.Fragment>
        )
    }
}

//banner
class Banner extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {banners} = this.props
        let bannerList = null
        if(banners.length > 0){
            bannerList = banners.map((e, i) => {
                return (
                    <li className="list" key={i}><img src={e.picUrl} alt="" /></li>
                )
            })
        }
        return (
            <div className="banner">
                <ul className="banner-box">
                    {bannerList}
                </ul>
            </div>
        )
    }
}

export default Recommend