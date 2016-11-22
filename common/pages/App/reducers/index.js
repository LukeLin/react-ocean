import { combineReducers } from 'redux';
import about from './about';
import vote from './vote';

const rootReducer = combineReducers({
    about,
    vote
});

export default rootReducer;
