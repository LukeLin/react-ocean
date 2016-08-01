import React, {Component, PropTypes} from 'react';
import Base from '../../pages/Base';

let styles = {
    completed: {
        textDecoration: 'line-through',
        cursor: 'default'
    },
    uncompleted: {
        textDecoration: 'none',
        cursor: 'pointer'
    }
};

export default class Todo extends Base {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.on('test', function () {
            console.log('test event bus');
        });
    }

    render() {
        return (
            <li onClick={this.props.onClick}
                style={ this.props.completed ? styles.completed : styles.uncompleted }>
                { this.props.text }
            </li>
        )
    }
}
Todo.defaultProps = {
    onClick: function(){},
    text: '',
    completed: false
};
Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
};
