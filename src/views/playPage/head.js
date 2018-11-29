import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import Back from '../../components/Back'

//播放页顶部及背景
class TabHead extends Component {
    constructor(props) {
        super(props)
        this.handleBack = this.handleBack.bind(this)
    }
    
    //回退
    handleBack() {
        this.props.history.goBack()
    }

    render() {
        let infor = this.props.infor

        return (
            <React.Fragment>
                {/* 界面背景 */}
                <div className="play-page" style={{
                    background: `url(${this.props.bg}) repeat-y center`,
                }}>
                </div>
                {/* 界面头部 */}
                <div className="page-up">
                    <Back />
                    {
                        infor.map((data, i) => {
                            return (
                                <div className="caption" key={i}>
                                    <p>{data.name}</p>
                                    <p>{data.ar[0].name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(TabHead)