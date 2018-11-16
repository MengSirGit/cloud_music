import React, {Component} from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from '../../components/Header'
import Nav from './nav'
import Banner from './banner'
import Classify from './classify'
import RecommendSheet from './recommendSheet'
import NewMusic from './newMusic'
import RecommendDj from './recommendDj'

import '../../css/recommend.css'

//推荐页面整合
const pageMenu = {
    recomm: '推荐歌单',
    new: '最新音乐',
    exclusive: '独家放送',
    radio: '主播电台'
}

class Recommend extends Component {
    render() {
        console.log(this.props.code)
        return (
            <React.Fragment>
                {
                    this.props.code !== 200 ?
                        <Redirect to="/login"></Redirect>
                    :
                        [
                            <Header key={'header'} />,
                            //导航 
                            <Nav key={'nav'} />,
                            //banner
                            <Banner key={'banner'} />,
                            //快速导航
                            <Classify key={'classify'} />,
                            //推荐歌单
                            <RecommendSheet title={pageMenu.recomm} key={'recommend'} />,
                            //最新音乐
                            <NewMusic  title={pageMenu.new} key={'newmusic'} />,
                            //主播电台
                            <RecommendDj title={pageMenu.radio} key={'recommendDj'}/>
                        ]
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        code: state.loginValueReducer.code
    }
}

export default connect(mapStateToProps)(withRouter(Recommend))