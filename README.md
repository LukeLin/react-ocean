# react-ocean
isomorphic/universal react app


## Technology Stack:
- react
- redux
- immutableJS (optional)
- express
- ES2015
- webpack
- babel 6

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
*

## Examples:
* todos
* async action

## Todo:
* add pm2 module
