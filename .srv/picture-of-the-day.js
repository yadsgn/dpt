var express = require('express');
var app = express();
var fs = require('fs');
var _ = require('underscore');
var md5 = require('MD5');
var bodyParser = require('body-parser')

var path = __dirname + '/.srv/daily-picture/data.json';
var current = undefined;

function createServer(){
    var app = express();
    app.use(bodyParser.urlencoded({
        extended: false
    }));    
    app.get('/wiki-api/daily-picture/', getFreshPicture)
    app.post('/wiki-api/daily-picture/', setNewPicture)
    return app;
}

var root = __dirname;
function setRoot(dir) {
    root = dir;
    path = root + '/.srv/daily-picture/data.json';
}

function getFreshPicture(req, res) {
    if (!current) {
        var file = fs.readFileSync(path, 'utf-8')    
        var json = JSON.parse(file);
        current = json[0];
    }
    res.set('Content-Type', 'application/json');
    res.send(
        JSON.stringify(current)
    );
}

function setNewPicture(req, res) {
    var data = req.body;
    var file = fs.readFileSync(path, 'utf-8')    
    var json = JSON.parse(file);
    var newPic = {
        title: data.title, 
        src: data.src,
        href: data.href,
        dtime: Date.now()
    }

    json.unshift(newPic);
    current = newPic;

    fs.writeFile(path, JSON.stringify(json));
    res.header("Access-Control-Allow-Origin", "*");
    res.set('Content-Type', 'application/json');
    res.send(
        JSON.stringify(req.body)
    );
}


module.exports = {
    createServer: createServer,
    setRoot: setRoot
}

