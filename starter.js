'use strict';

let pm2 = require('pm2');

const instances = process.env.NODE_ENV === 'production'
    ? (process.env.WEB_CONCURRENCY || -1) : 1; // Set by Heroku or -1 to scale to max cpu core -1
const maxMemory = process.env.WEB_MEMORY || 512;    // " " "

pm2.connect(function() {
    pm2.start({
        script    : './dist/server.js',
        name      : 'react-ocean',
        exec_mode : 'cluster',
        instances : instances,
        maxMemoryRestart : `${ maxMemory }M`,   // Auto restart if process taking more than XXmo
        maxRestarts: 5,
        minUptime: 5000,
        log_file : './log/combined.outer.log',
        error_file: './log/err.log',
        out_file: './log/out.log',
        merge_logs: true,
        env: {
            "NODE_ENV": "development"
        },
        env_testing: {
            "NODE_ENV": "test"
        },
        env_production: {
            "NODE_ENV": "production"
        }
    }, function(err) {
        pm2.disconnect();   // Disconnect from PM2

        if (err)
            return console.error('Error while launching applications', err.stack || err);

        console.log('PM2 and application has been successfully started');

        // Display logs in standard output
        pm2.launchBus(function(err, bus) {
            console.log('[PM2] Log streaming started');
            bus.on('log:out', function(packet) {
                console.log('[App:%s] %s', packet.process.name, packet.data);
            });
            bus.on('log:err', function(packet) {
                console.error('[App:%s][Err] %s', packet.process.name, packet.data);
            });
        });
    });
});
