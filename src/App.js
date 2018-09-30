import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './css/common.css'

import SideNav from './components/SideNav'
import PlayBar from './components/PlayBar'


class App extends Component {
    render(){
        //返回顶部
        window.scrollTo(0, 0)
        return (
            <div>
                <SideNav />
                {/* <Header /> */}
                {/* 页面路由切换 */}
                <div className="main">
                    {
                        this.props.children
                    }
                </div>
                <PlayBar />
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.element
}

export default App