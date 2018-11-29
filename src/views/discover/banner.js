import React, {Component} from 'react'

import * as api from '../../api'

class Banner extends Component{
    constructor(props) {
        super(props)
        this.timerID = null
        this.startPos = 0
        this.state = {
            sIndex: 0,
            banners: []
        }
        this.autoPlay = this.autoPlay.bind(this)
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
    }

    handleTouchStart(e){
        this.startPos = e.touches[0].pageX
        clearInterval(this.timerID)
    }

    handleTouchEnd(e, len){
        let endPos = e.changedTouches[0].pageX,
            _that = this

        if (this.startPos > endPos && this.state.sIndex < len - 1) {
            this.setState({
                sIndex: this.state.sIndex + 1
            })
        }
        else if (this.startPos < endPos && this.state.sIndex > 0) {
            this.setState({
                sIndex: this.state.sIndex - 1
            })
        }
        else {
            this.setState({
                sIndex: this.state.sIndex
            })
        }

        setTimeout(function() {
            clearInterval(_that.timerID)
            _that.autoPlay()
        }, 3000)

    }

    autoPlay() {
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
        }, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    componentDidMount() {
        //获取banner信息
        api.getBanner().then(response => {
            if(response.data.code === 200){
                this.setState({
                    banners: response.data.banners
                })
            }
        })

        this.autoPlay()
    }
    
    render() {
        const {banners} = this.state
        let bannerList = null
        let imgWidth = window.innerWidth

        if (banners.length > 0) {
            bannerList = banners.map((e, i) => {
                return (
                    <li className="list" key={i} style={{width: imgWidth + 'px'}}
                        onTouchStart={ this.handleTouchStart }
                        onTouchEnd={ (e) =>  this.handleTouchEnd(e, banners.length) }
                    ><img src={e.imageUrl} alt="" /></li>
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
