var wdioConf = require('./wdio.conf.js');
var merge = require('deepmerge');

exports.config = merge(wdioConf.config, {
        host: 'hub',
        port: 4444,
}, { clone: false });