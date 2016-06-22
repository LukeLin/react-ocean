import React, { Component, PropTypes } from 'react';


class App extends Component {
    constructor(props, context) {
        super(props, context);
    }

    getChildContext(){
        return {
            user: {
                name: 'anonymous'
            }
        };
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
App.childContextTypes = {
    user: PropTypes.shape({
        name: PropTypes.string
    })
};

export default App;
