

/*
 * Message store for global messages, i.e. Network messages / Redirect messages
 * that need to be communicated on the page itself. Ideally
 * messages/notifications should appear within the component to give the user
 * more context. - My 2 cents.
 */
export default function message(state = {
    message: 'test',
    type: 'SUCCESS'
}, action = {}) {
    switch (action.type) {
        default:
            return state;
    }
}
