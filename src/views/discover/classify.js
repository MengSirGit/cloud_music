import React from 'react'
import { Link } from 'react-router-dom'

const Classify = () => (
    <ul className="classify">
        <li>
            <p className="arc-back"><i className="iconfont">&#xe663;</i></p>
            <p className="caption">私人FM</p>
        </li>
        <li>
            <Link to="/recommendsong">
                <p className="arc-back"><i className="iconfont">&#xe775;</i></p>
                <p className="caption">每日推荐</p>
            </Link>
        </li>
        <li>
            <p className="arc-back"><i className="iconfont">&#xe642;</i></p>
            <p className="caption">歌单</p>
        </li>
        <li>
            <Link to="/toplist">
                <p className="arc-back"><i className="iconfont">&#xe68d;</i></p>
                <p className="caption">排行榜</p>
            </Link>
        </li>
    </ul>
)

export default Classify