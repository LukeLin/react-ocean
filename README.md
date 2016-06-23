# isomorphic react redux application


## technology stack:
- react
- redux
- immutableJS
- express
- ES2015
- webpack
- babel 6

## start:
- npm run build:dev   // for development
    - contains 'in-line-source-map' for debugging
    - redux-logger
    - redux-dev-tool(window.devToolsExtension)
    - 'why-did-you-update' avoidable re-render checking
    - react hot module replacing
- npm run build:prod  // for production
- npm run build       // both

### how to add a page?
#### for server
* register server route
``` javascript
    router.get('/', getIndex);
```
* define appName and renderData for server render
``` javascript
    module.exports = function (req, res, next) {
        let pageStr = createRenderString(req, {
            component: <Page/>,
            locals: {
                appName: 'index',
                title: 'index page'
            },
            renderData: fakeData,
            rootReducer
        });
        res.status(200).send(pageStr);
    };
```

#### for client
* add a client page whose name is the same as appName
``` javascript
    initializeRender({
        rootReducer,
        component: <Page/>
    })
```
*

## examples:
* todos
* async action

##todo:
* add pm2 module
