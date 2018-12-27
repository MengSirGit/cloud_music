/**
 * 本地音乐页面
 * 目前只是静态页，功能还需完善
 * 此页面需要用户先进行登录操作
 */

import React, { Component } from 'react'

import Header from '../../components/Header'
import LocalFun from './localFun'

import '../../less/local.less'

class Local extends Component {
    render(){
        return (
            <React.Fragment>
                <Header />
                <LocalFun />
            </React.Fragment>
        )
    }
}

export default Local