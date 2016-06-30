import React, {Component, PropTypes} from 'react';
import Base from '../../pages/Base';

export default class Todo extends Base {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.on('test', function () {
            console.log('test event bus');
        });
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    render() {
        return (
            <li
                onClick={this.props.onClick}
                style={{
          textDecoration: this.props.completed ? 'line-through' : 'none',
          cursor: this.props.completed ? 'default' : 'pointer'
        }}>
                {this.props.text}
            </li>
        )
    }
}

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
}
