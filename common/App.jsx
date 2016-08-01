import React, { Component, PropTypes } from 'react';
import EventEmitter from 'events';

let mediator = new EventEmitter();


class App extends Component {
    constructor(props, context) {
        super(props, context);
    }

    getChildContext(){
        return {
            user: {
                name: 'anonymous'
            },
            $eventBus: mediator
        }
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
    }),
    $eventBus: PropTypes.instanceOf(EventEmitter)
};

export default App;
