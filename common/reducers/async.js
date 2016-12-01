// import { combineReducers } from 'redux'
import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';
import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from './actions'

function selectedReddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}

function posts(state = new Immutable.Map({
  isFetching: false,
  didInvalidate: false,
  items: new Immutable.List()
}), action) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return state.set('didInvalidate', true)
    case REQUEST_POSTS:
      return state.merge({
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_POSTS:
      return state.merge({
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    default:
      return state
  }
}

function postsByReddit(state = new Immutable.Map(), action) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return state.set(action.reddit, posts(state[action.reddit], action));
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit
})

export default rootReducer