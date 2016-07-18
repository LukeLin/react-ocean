'use strict';

if(process.env.NODE_ENV === 'production'){
    let pm2 = require('pm2');

    const instances = process.env.NODE_ENV === 'production'
        ? (process.env.WEB_CONCURRENCY || -1) : 0; // Set by Heroku or -1 to scale to max cpu core -1
    const maxMemory = process.env.WEB_MEMORY || 1024;    // " " "

    pm2.connect(function() {
        pm2.start({
            script    : './index.js',
            name      : 'react-ocean',
            exec_mode : 'cluster',
            instances : instances,
            max_memory_restart : `${ maxMemory }M`,   // Auto restart if process taking more than XXmo
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
} else {
    require('./index.js');
}


