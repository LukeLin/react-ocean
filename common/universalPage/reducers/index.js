import { combineReducers } from 'redux';
import user from './user';
import topic from './topic';
import message from './message';
import { routerReducer as routing } from 'react-router-redux';

const isFetching = ( state = false, action ) => {
    switch (action.type) {
        default:
            return state;
    }
};

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
    isFetching,
    topic,
    user,
    message,
    routing
});

export default rootReducer;
