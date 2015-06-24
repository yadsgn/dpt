var root = __dirname;
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

function setRoot(dir) {
    root = dir;
}

function getFileList(basePath, regexp, onlyDir) {
    var fullPath = path.join(root, basePath);
    if (regexp===undefined) {
        regexp = /.*/;
    }
    if (!fs.existsSync(fullPath)) {
        return false;
    }

    return fs.readdirSync(fullPath).filter(function (fileName) {
        var stat = fs.statSync(path.join(fullPath, fileName));
        return regexp.test(fileName) && (!onlyDir || stat.isDirectory());
    });
}

function getDirList (basePath, regexp) {
    return getFileList(basePath, regexp, true);
}

module.exports = {
    getFileList: getFileList,
    getDirList: getDirList,
    setRoot: setRoot
}
