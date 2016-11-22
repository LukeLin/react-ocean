# react-ocean
isomorphic/universal react app for high performance mobile web application.
support server side render spa
support multi-page architecture without heavy react-router.


## Technology Stack:
- react
- react-router (for spa route manage)
- redux
- immutableJS (optional)
- express
- ES2015
- webpack
- babel 6
- Service Worker cache static files
- Web Security support

## Before Start
- we recommend using ES6 module for tree shaking optimization.

## Start:
- npm install react-ocean
- npm run build:dev   // for development
    - contains 'in-line-source-map' for debugging
    - redux-logger
    - redux-dev-tool(window.devToolsExtension)
    - 'why-did-you-update' avoidable re-render checking
    - react hot module replacing
- npm run build:prod  // for production
- npm run build:lib   // build libs file
- npm run build       // both
- npm run start       // start server


### How To Add A Page?
#### For Multi-page:

#### For Server Side
* register server route
``` javascript
    router.get('/', getIndex);
```
* define appName and renderData for server render
``` javascript
    module.exports = function (req, res, next) {
        res.renderReactHTML({
            component: <Page/>,
            locals: {
                appName: 'index',
                title: 'index page'
            },
            data: fakeData,
            rootReducer
        });
    };
```

#### For Client
* add a client page whose name is the same as appName
``` javascript
    initializeRender({
        rootReducer,
        component: <Page/>
    })
```

## Examples:
* todos
* async action
* chat room

#### add a SPA page
``` javascript
<Route path="/" component={App} onChange={ onChange }>
    <Route path="vote" getComponent={(nextState, cb) => {
        require.ensure([], require => {
            cb(null, require('./pages/App/Vote').default);
        }, 'Vote');
    }}/>
    <Route path="about" component={About} />
</Route>
```

``` javascript
class Vote extends Component {
    render() {
        return (
            <div className="vote">
                this is vote
                <Link to="/about?debug=test">about</Link>
                <Link to="/test">test</Link>
                message: { this.props.message }
            </div>
        );
    }
}
Vote.pageConfig = {
    pageId: 'Vote'
};

export default connect(function mapStateToProps(state) {
    return {
        message: state.vote.message
    };
})(connectDataFetchers(Vote, [ACTIONS.loadData]));
```
fetch data according to connectDataFetchers.

``` javascript
import fetchList from '../../../fetchList';

export const LOAD_VOTE_SUCCESS = 'LOAD_VOTE_SUCCESS';
export const LOAD_VOTE_FAILED = 'LOAD_VOTE_FAILED';

export function loadData(opts, req){
    return (dispatch) => {
        return fetchList.getVote(opts, req).then((resp) => {
            dispatch({
                type: LOAD_VOTE_SUCCESS,
                payload: resp.data
            });
        }).catch(() => {
            dispatch({
                type: LOAD_VOTE_FAILED
            });
        });
    };
}
```

## TodoList
* add docker support

