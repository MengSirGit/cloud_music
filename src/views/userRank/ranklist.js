import React, { Component } from 'react'

class RankList extends Component {

    render() {
        let result = this.props.result

        return (
            <ul className="rank-list">
            {
                result.map((e, i) => {
                    return (
                        <li className="rank-song clearfix" key={i}>
                            <p className="rank-index">{i + 1}</p>
                            <div className="rank-con">
                                <p className="song-name">{e.song.name}</p>
                                <p className="song-author">{e.song.ar[0]['name']}</p>
                            </div>
                        </li>
                    )
                })
            }
            </ul>
        )
    }

}

export default RankList