import React, {Component} from 'react'

//登录
class Login extends Component {
    render(){
        return (
            <div className="left-login">
                <p>登录网易云音乐</p>
                <p>320k高音质无限下载，手机电脑多端同步</p>
                <button className="login-btn">立即登录</button>
            </div>
        )
    }
}

//推送
class PushNew extends Component {
    render(){
        return (
            <ul className="push-new">
                <li><i className="iconfont news">&#xe6b3;</i><span>我的消息</span></li>
                <li><i className="iconfont vip">&#xe604;</i><span>会员中心</span></li>
                <li><i className="iconfont shop">&#xe60e;</i><span>商城</span></li>
                <li><i className="iconfont beta">&#xe62c;</i><span>游戏推荐Beta</span></li>
                <li><i className="iconfont up">&#xe689;</i><span>在线听歌免流量</span></li>
            </ul>
        )
    }
}

//社交
class Social extends Component {
    render(){
        return (
            <ul className="social">
                <li><i className="iconfont bro">&#xe618;</i><span>我的好友</span></li>
                <li><i className="iconfont near">&#xe55b;</i><span>附近的人</span></li>
            </ul>
        )
    }
}

//额外功能
class Extra extends Component {
    render(){
        return (
            <ul className="extra">
                <li><i className="iconfont skin">&#xe668;</i><span>个性换肤</span></li>
                <li><i className="iconfont listen">&#xe608;</i><span>听歌识曲</span></li>
                <li><i className="iconfont play">&#xe641;</i><span>定时停止播放</span></li>
                <li><i className="iconfont scan">&#xe661;</i><span>扫一扫</span></li>
                <li><i className="iconfont music">&#xe647;</i><span>音乐闹钟</span></li>
                <li><i className="iconfont drive">&#xe61a;</i><span>驾驶模式</span></li>
                <li><i className="iconfont parental">&#xe622;</i><span>亲子频道</span></li>
                <li><i className="iconfont pre">&#xe619;</i><span>优惠劵</span></li>
            </ul>
        )
    }
}

//app操作
class Setting extends Component {
    render(){
        return (
            <ul className="setting">
                <li><i className="iconfont">&#xe609;</i><span>夜间模式</span></li>
                <li><i className="iconfont">&#xe674;</i><span>设置</span></li>
                <li><i className="iconfont">&#xe64c;</i><span>退出</span></li>
            </ul>
        )
    }
}

//侧导航
const contrlOpen = (obj) => {
    if(obj.className.indexOf('active') <= -1) obj.className += ' active'
}
const contrlOpen2 = (obj) => {
    if(obj.className.indexOf('active') > -1) obj.className = obj.className.replace(' active', '')
}
class SideNav extends Component {
    constructor(props){
        super(props)
        this.toggleNav = this.toggleNav.bind(this)
    }
    //导航控制
    toggleNav(e){
        let sideNav = document.querySelector('#side-nav')
        switch(e.target.id){
            case 'nav-btn':
                contrlOpen(sideNav)
                break
            case 'side-nav':
                break
            default:
                contrlOpen2(sideNav)
        }
    }
    componentDidMount(){
        document.addEventListener('touchend', this.toggleNav)
    }
    componentWillUnmount(){
        document.removeEventListener('touchend', this.toggleNav)
    }
    render(){
        return (
            <div id='side-nav' className="side-nav">
                {/* 登录 */}
                <Login />
                {/* 推送 */}
                <PushNew />
                {/* 社交 */}
                <Social />
                {/* 额外功能 */}
                <Extra />
                {/* 设置 */}
                <Setting />
            </div>
        )
    }
}

export default SideNav