// import { combineReducers } from 'redux'
import { List, Map } from 'immutable';
import { combineReducers } from 'redux-immutablejs';
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './indexActions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

function todos(state = new List(), action) {
    switch (action.type) {
        case ADD_TODO:
            return state.push(new Map({
                    text: action.text,
                    completed: false
                }))
        case COMPLETE_TODO:
            return state.update(action.index, function(item){
                return item.update('completed', true);
            });
        default:
            return state
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp
