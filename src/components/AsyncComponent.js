import {Component} from 'react'

/**
 * 按需加载
 * @param {*} importComponent 
 */

class AsyncComponent extends Component {

    constructor(props){
        super(props);
        this.state = {component: null};
    }

    async  componentDidMount(){

            const { default: component } = await this.props.load();

            this.setState({component: component})

    }

    render(){

        const Component = this.state.component;

        return Component ? this.props.children(Component) : null;
    }
}

export default AsyncComponent