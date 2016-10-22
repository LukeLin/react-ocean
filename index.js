if(process.env.NODE_ENV !== 'production') {
    console.log('start server in development mode');
    require('babel-register');
    require('./server/app');
} else {
    require('./dist/server');
}
