'use strict';

var path = require('path');
var fs = require('fs');

module.exports = function (source) {
    this.cacheable(false);

    var appPath = path.resolve('src/model');
    var src = fs.readdirSync(appPath).reduce(function (pre, next, index) {
        if (index === 1) {
            return 'rluy.model(require(\'./model/' + pre.split('.')[0] + '\'));\n' + ('rluy.model(require(\'./model/' + next.split('.')[0] + '\'));\n');
        }
        return pre + ('rluy.model(require(\'./model/' + next.split('.')[0] + '\'));\n');
    });
    this.addContextDependency(appPath);
    console.log('adding module...');
    return source + '\n' + src + '\nexport const Rluy = rluy';
};