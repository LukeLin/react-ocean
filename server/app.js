import express from 'express';
import compress from 'compression';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from './config/config.json';
import routes from './routes';
import allowCrossDomain from './config/allowCrossDomain'
import { renderFile } from 'ejs';

let app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('html', renderFile);

app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(favicon(__dirname + '/../public/favicon.ico'));
app.use('/static', express.static(__dirname + '/../public', {
    maxAge: 86400000
}));

process.on('uncaughtException', err => {
    console.error(err.message + '\n' + err.stack);
});
process.on('unhandledRejection', (reason, p) => {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});
process.on('rejectionHandled', (reason, p) => {
    console.warn("rejectionHandled at: Promise ", p, " reason: ", reason);
});

app.use('/', allowCrossDomain);
app.use('/', routes);

// error handlers
if (app.get('env') === 'development') {
    // development error handler
    // will print stacktrace
    app.use(function(err, req, res, next) {
        console.error(`${ err.message }|${ err.status }|${ err.stack }`);
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
} else {
    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        console.error(`${ err.message }|${ err.status }|${ err.stack }`);
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: {}
        });
    });
}

app.set('host', process.env.IP || '127.0.0.1');
app.set('port', process.env.PORT || 36000);

let server = app.listen(app.get('port'), app.get('host'), function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`${ config.serverName } server listening at http://%s:%s`, host, port);
});

