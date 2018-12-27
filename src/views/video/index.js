import React, { Component } from 'react'
import Header from '../../components/Header'

class Video extends Component {
    render(){
        return (
            <React.Fragment>
                <Header />
                <p style={{
                    color: '#8d8d8d',
                    fontSize: '.8rem',
                    textAlign: "center",
                    lineHeight: 2
                }}>完善中...</p>
            </React.Fragment>
        )
    }
}

export default Video