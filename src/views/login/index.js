import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import * as api from '../../api'

import logoImg from '../../static/img/logo.png'

class Login extends Component {
    constructor(props){
        super(props)
        this.handleToLogin = this.handleToLogin.bind(this)
    }
    handleToLogin(phone, password){
        api.loginPhone(phone, password).then(res => {
            if(res.data.code === 200){
                // console.log(res.data)
                this.props.history.push('/')
            }
        })
    }
    render(){
        return (
            <div className="login-main">
                <div className="login-logo"><img src={logoImg} alt="" /></div>
                <input id="phone" ref="phone" type="text" placeholder="输入手机号" />
                <input id="password" ref="password" type="password" placeholder="输入密码" />
                <button onClick={() => this.handleToLogin(this.refs.phone.value, this.refs.password.value)}>登录</button>
            </div>
        )
    }
}

export default withRouter(Login)