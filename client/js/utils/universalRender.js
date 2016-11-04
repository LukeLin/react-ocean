import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { match, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from '../../../common/routes';
import configureStore from '../../../common/store/universalStore';
import App from '../../../common/App';

// Grab the state from a global injected into
// server-generated HTML

const store = configureStore(window.__INITIAL_STATE__, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);


match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
    // Router converts <Route> element hierarchy to a route config:
    render(
        <Provider store={store}>
            <App appConfig={ window.__APP_CONFIG__ }>
                <Router history={history} { ...renderProps } onUpdate={null}/>
            </App>
        </Provider>, document.getElementById('page')
    );
});
