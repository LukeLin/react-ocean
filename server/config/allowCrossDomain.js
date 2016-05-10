'use strict'
let allowCrossDomain = function(req, res, next) {
    let allowedOrigins = [
        'http://www.test.com'
    ];
    let origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.header('Access-Control-Allow-Origin', origin);
    }
    next();
}

module.exports = allowCrossDomain;
