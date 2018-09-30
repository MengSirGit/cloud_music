import React, {Component} from 'react'

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputValue: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(){
        console.log(1)
    }
    componentDidMount(){
        //非直接输入文字
        this.refs.search.addEventListener('compositionstart', () => {})
        //直接输入文字
        this.refs.search.addEventListener('compositionend', () => {})
    }
    render(){
        return (
            <form>
                <input type="text" name="k" onFocus={this.handleChange} ref='search' />
            </form>
        )
    }
}

export default Search