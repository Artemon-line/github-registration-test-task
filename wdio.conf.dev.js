var wdioConf = require('./wdio.conf.js');
var merge = require('deepmerge');

exports.config = merge(wdioConf.config, {
        //ChromeDriver service
        port: '9515',
        path: '/',
        // ...
        services: ['chromedriver']
}, { clone: false });