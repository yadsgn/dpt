var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var getCurrentVersion = require('./get-latest-version');
var bodyParser = require('body-parser');
var _ = require('underscore');



function createServer(){
    var app = express();
    app.post('/api/filelist/', function(req, res) {
        var path = req.body.path;
        var list = getFileList(path);
        res.set('Content-Type', 'application/json');
        res.send(
            JSON.stringify(list)
        );
    });
    return app;
}

function getFileList(basePath, onlyDir, regexp) {
    var fullPath = global.root + '/' + basePath;
    var dirs = fs.readdirSync(fullPath);
    if (regexp===undefined) {
        regexp = /.*/;
    }
    dirs = dirs.map(function(dir){
        var stat = fs.statSync(path.join(fullPath, dir));
        if (onlyDir && !stat.isDirectory()) {
            return false;
        }
        if (!regexp.test(dir)) {
            return false;
        }
        return {
            name: dir,
            stat: stat,
            isDir: stat.isDirectory()
        };
    })
    libs = _.compact(dirs);
    return libs;
}

module.exports = {
    createServer: createServer
}
