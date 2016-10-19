import React, { Component, PropTypes } from 'react';
import EventEmitter from 'events';

let mediator = new EventEmitter();


class App extends Component {
    constructor(props, context) {
        super(props, context);
    }

    getChildContext(){
        return {
            $eventBus: mediator,
            $appConfig: this.props.appConfig
        }
    }

    componentDidMount(){
    }


    componentDidUpdate(){
    }

    componentWillUnmount(){
    }

    render() {
        return this.props.children;
    }
}
App.defaultProps = {
    appConfig: null
};
App.propTypes = {
    appConfig: PropTypes.object
};
App.childContextTypes = {
    $eventBus: PropTypes.instanceOf(EventEmitter),
    $appConfig: PropTypes.object
};

export default App;
