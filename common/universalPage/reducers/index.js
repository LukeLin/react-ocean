import { combineReducers } from 'redux';
import about from './about';
import vote from './vote';
// import { routerReducer as routing } from 'react-router-redux';

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
    about,
    vote,
    // routing
});

export default rootReducer;
