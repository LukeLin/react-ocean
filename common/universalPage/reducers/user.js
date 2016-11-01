
import { combineReducers } from 'redux';

const isLogin = (
    state = true,
    action
) => {
    switch (action.type) {
        default:
            return state;
    }
};

const message = (
    state = '',
    action
) => {
    switch (action.type) {
        default:
            return state;
    }
};

const isWaiting = (
    state = false,
    action
) => {
    switch (action.type) {
        default:
            return state;
    }
};

const authenticated = (
    state = false,
    action
) => {
    switch (action.type) {
        default:
            return state;
    }
};

const userReducer = combineReducers({
    isLogin,
    isWaiting,
    authenticated,
    message
});

export default userReducer;
