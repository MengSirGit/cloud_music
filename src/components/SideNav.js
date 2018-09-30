import React, {Component} from 'react'

class SideNav extends Component {
    constructor(props){
        super(props)
        this.toggleNav = this.toggleNav.bind(this)
    }
    //导航控制
    toggleNav(e){
        let sideNav = document.querySelector('#side-nav')
        switch(e.target.id){
            case 'nav-btn':
                sideNav.className.indexOf('active') > -1 ? false : sideNav.className += ' active'
                break
            case 'side-nav':
                break
            default:
                sideNav.className.indexOf('active') > -1 ? sideNav.className = sideNav.className.replace(' active', '') : false
        }
    }
    componentDidMount(){
        document.addEventListener('touchend', this.toggleNav)
    }
    componentWillUnmount(){
        document.removeEventListener('touchend', this.toggleNav)
    }
    render(){
        return (
            <div id='side-nav' className="side-nav">
                hello
            </div>
        )
    }
}

export default SideNav