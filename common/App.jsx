import React, { Component } from 'react';


class App extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
    }


    componentDidUpdate(){
    }

    componentWillUnmount(){
    }

    render() {
        return (
            <div>
                { this.props.children }
            </div>
        );
    }
}

export default App;
