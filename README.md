# react-ocean
isomorphic/universal react app for high performance mobile web application. Multi-page architecture without heavy react-router


## Technology Stack:
- react
- redux
- immutableJS (optional)
- express
- ES2015
- webpack 2.0 (tree shaking optimization, see: [webpack tree shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html))
- babel 6
- Service Worker cache static files

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
- npm run build       // both
- npm run start       // start server


### How To Add A Page?
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
