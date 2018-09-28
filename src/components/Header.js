import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Header extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e){
        if(e.target.className.indexOf('active') <= -1){
            Array.from(document.getElementById('header').getElementsByClassName('iconfont')).map(e => {
                e.className = e.className.replace(' active', '')
            })
            e.target.className += ' active'
        }
    }
    render(){
        return (
            <header id="header">
                {/* 侧边导航 */}
                <div className="left-nav">
                    <i className="iconfont">&#xe610;</i>
                </div>
                {/*中部tab*/}
                <ul className="tab-center">
                    <li className="local" onClick={this.handleClick}><Link to='/local'><i className="iconfont">&#xe626;</i></Link></li>
                    <li className="index" onClick={this.handleClick}><Link to='/'><i className="iconfont active">&#xe601;</i></Link></li>
                    <li className="video" onClick={this.handleClick}><Link to='/video'><i className="iconfont">&#xe717;</i></Link></li>
                </ul>
                {/*搜索按钮*/}
                <div className="search"><i className="iconfont">&#xe607;</i></div>
            </header>
        )
    }
}

export default Header