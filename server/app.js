import http from 'http';
import express from 'express';
import compress from 'compression';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import csurf from 'csurf';
import config from './config/config.json';
import routes from './controllers/index';
import apis from './apis/index';
import allowCrossDomain from './utils/allowCrossDomain'
import reactRender from './utils/renderReactMiddleware';
import Immutable from 'immutable';
import helmet from 'helmet';
import socket from './sockets/socket';

let app = express();

app.set('host', process.env.IP || '127.0.0.1');
app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');

app.use(helmet.contentSecurityPolicy());
app.use(helmet.frameguard());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.hsts());
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    resave: true,
    secret: 'mySecretCookieSalt',
    key: 'myCookieSessionId',
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
    }
}));

// app.use(favicon(__dirname + '/../public/favicon.ico'));
app.use('/static', express.static(__dirname + '/../public', {
    maxAge: 86400000
}));

// if(process.env.NODE_ENV !== 'production'){
//     let webpack = require('webpack');
//     let config = require('../create-webpack.config')(true);
//     let webpackDevMiddleware = require('webpack-dev-middleware');
//     let webpackHotMiddleware = require('webpack-hot-middleware');
//     let compiler = webpack(config);
//     app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
//     app.use(webpackHotMiddleware(compiler));
// }

app.use(allowCrossDomain);

app.use(csurf());
app.use(function (req, res, next) {
    res.locals.csrftoken = req.csrfToken();
    next();
});
app.use(reactRender({
    transformer: function(data){
        return Immutable.fromJS(data);
    }
}));

app.use('/', routes);
app.use('/api', apis);

// error handlers
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.dir(err);
    res.status(err.status || 500);
    if(err.status === 500) {
        console.error(err.stack);
        res.json({error: 'Internal Server Error'});
    }
    else if(err.status === 404) {
        res.render('error');    //render error page
    } else {
        res.json({error: err.message})
    }
});


process.on('uncaughtException', err => {
    console.error(err.message + '\n' + err.stack);
});
process.on('unhandledRejection', (reason, p) => {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});
process.on('rejectionHandled', (reason, p) => {
    console.warn("rejectionHandled at: Promise ", p, " reason: ", reason);
});

let server = http.createServer(app);

/* Socket.io Communication */
let io = require('socket.io').listen(server);
io.sockets.on('connection', socket);

server.listen(app.get('port'), app.get('host'), function() {
    let { address, port } = server.address();
    console.log(`${ config.serverName } server listening at http://%s:%s`, address, port);
});

