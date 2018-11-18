import React, {Component} from 'react'

import Header from '../../components/Header'
import LocalFun from './localFun'
import '../../css/local.css'

class Local extends Component {
    render(){
        return (
            <React.Fragment>
                <Header />
                <LocalFun />
            </React.Fragment>
        )
    }
}

export default Local