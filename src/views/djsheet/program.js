import React, { Component } from 'react'

class Programs extends Component {
    render() {
        let program = this.props.program

        return (
            <React.Fragment>
                <p className="sum">共{program.count}期</p>
                <ul className="program-list">
                {
                    program.programs.map((e, i) => {
                        return (
                            <li className="program" key={i}></li>
                        )
                    })
                }
                </ul>
            </React.Fragment>
        )
    }
}

export default Programs