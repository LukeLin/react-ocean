import React, { Component, PropTypes } from 'react'
import Todo from './Todo'
import Base from '../../pages/Base';

export default class TodoList extends Base {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <ul>
                {this.props.todos.map((todo, index) =>
                    <Todo {...todo}
                        key={index}
                        onClick={() => this.props.onTodoClick(index) } />
                ) }
            </ul>
        )
    }
}

TodoList.propTypes = {
    onTodoClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
}