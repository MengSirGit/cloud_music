import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './css/common.css'

import Header from './components/Header'
import Recommend from './views/discover/recommend'


class App extends Component {
    render(){
        //返回顶部
        window.scrollTo(0, 0)
        return (
            <div>
                <Header />
                {/* 页面路由切换 */}
                <Recommend />
            </div>
        )
    }
}

App.PropTypes = {
    children: PropTypes.element
}

export default App