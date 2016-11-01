import { combineReducers } from 'redux';

const topic = (
    state = {},
    action
) => {
    switch (action.type) {
        default:
            return state;
    }
};

const topics = (
    state = [],
    action
) => {
    switch (action.type) {
        default:
            return state;
    }
};

const newTopic = (
    state = '',
    action
) => {
    switch (action.type) {
        default:
            return state;
    }
};

const topicReducer = combineReducers({
    topics,
    newTopic
});

export default topicReducer;
