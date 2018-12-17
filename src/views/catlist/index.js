/**
 * 歌单分类页
 * 展示所有可选的歌单类型
 * 选择相应的歌单类型，可对发现音乐歌单内容页进行内容更新
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as api from '../../api'
import { hotPlaylistAxios } from '../../store/actions'

import Head from './head'
import '../../less/catlist.less'

class CatList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cat: {}
        }
    }

    handleToPlaylist(cat) {
        this.props.onHanleToPlaylist(cat)
    }

    componentDidMount() {
        api.getAllClassifyofPlayList().then(res => {
            if (res.data.code === 200) {
                this.setState({
                    cat: res.data
                })
            }
        })
    }

    render() {
        let _state = this.state

        if (Object.keys(_state.cat).length === 0) return null

        let  language = [], _color = [], scene = [], emotion = [], theme = []
        
        _state.cat.sub.map((e, i) => {
            if (e.category === 0) {
                language.push(e)
            }
            else if (e.category === 1) {
                _color.push(e)
            }
            else if (e.category === 2) {
                scene.push(e)
            }
            else if (e.category === 3) {
                emotion.push(e)
            }
            else if (e.category === 4) {
                theme.push(e)
            }
            return true
        })

        return (
            <div className="sheet-box catlist">
                <Head />
                <div className="all-cat">
                    <p>{_state.cat.all.name}</p>
                </div>
                {/* 语种 */}
                <ul className="language">
                    {
                        language.map((e, i) => {
                            return (
                                <li className="cat-node" key={e.name} onClick={() => this.handleToPlaylist(e.name)}><Link to="/classifyofplaylist"><p>{e.name}</p></Link></li>
                            )
                        })
                    }
                </ul>
                {/* 风格 */}
                <ul className="_color">
                    {
                        _color.map((e, i) => {
                            return (
                                <li className="cat-node" key={e.name} onClick={() => this.handleToPlaylist(e.name)}><Link to="/classifyofplaylist"><p>{e.name}</p></Link></li>
                            )
                        })
                    }
                </ul>
                {/* 场景 */}
                <ul className="scene">
                    {
                        scene.map((e, i) => {
                            return (
                                <li className="cat-node" key={e.name} onClick={() => this.handleToPlaylist(e.name)}><Link to="/classifyofplaylist"><p>{e.name}</p></Link></li>
                            )
                        })
                    }
                </ul>
                {/* 情感 */}
                <ul className="emotion">
                    {
                        emotion.map((e, i) => {
                            return (
                                <li className="cat-node" key={e.name} onClick={() => this.handleToPlaylist(e.name)}><Link to="/classifyofplaylist"><p>{e.name}</p></Link></li>
                            )
                        })
                    }
                </ul>
                {/* 主题 */}
                <ul className="theme">
                    {
                        theme.map((e, i) => {
                            return (
                                <li className="cat-node" key={e.name} onClick={() => this.handleToPlaylist(e.name)}><Link to="/classifyofplaylist"><p>{e.name}</p></Link></li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHanleToPlaylist: (cat) => {
            dispatch(hotPlaylistAxios(cat))
        }
    }
}

export default connect(null, mapDispatchToProps)(CatList)