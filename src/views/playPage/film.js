import React from 'react'

const Film = (props) => {
    return (
        // 唱片
        <div className="page-center">
            <div className="arc-back" style={{
                animationPlayState: `${props.playStatus ? 'running' : 'paused'}`
            }}>
                <div className="film">
                    <div className="song-thum"><img src={props.bg} alt="" /></div>
                </div>
            </div>
        </div>
    )
}

export default Film