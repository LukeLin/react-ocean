import React, { Component, PropTypes } from 'react'
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Todo from './Todo'
import Base from '../../pages/Base';

export default class TodoList extends Base {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <ul>
                { this.props.todos.map((todo, index) =>
                    <Todo text={ todo.get('text') }
                        completed={ todo.get('completed') }
                        key={index}
                        onClick={() => this.props.onTodoClick(index) } />
                    ) }
            </ul>
        )
    }
}

TodoList.propTypes = {
    onTodoClick: PropTypes.func.isRequired,
    todos: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }))
};
