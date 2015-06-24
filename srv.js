var express = require('express');
var app = express();
var fs = require('fs');
var YAML = require('yamljs');

global.root = __dirname;

app.use('*.yaml', function(req, res, next){
    var file = fs.readFileSync(global.root + req.baseUrl, 'utf-8')
    res.set('Content-Type', 'application/json');
    res.send(yamlToJson(file));
});

function yamlToJson(str) {
    return JSON.stringify(YAML.parse(str));
}


var dpt = require('depot-dev-server');
server = dpt.createServer(process.cwd());
app.use(server);



app.listen(4040);
console.log(
'   ... . . . o o o o o\n'+
'            _____      o       \n'+
'   ____====  ]OO|_n_n__][.     \n'+
'  [________]_|__|________)<    \n'+
'   oo    oo  \'oo OOOO-| oo\\_     \n'+
'+--+--+--+--+--+--+--+--+--+--+--+\n'+
'\n' +
'Open http://localhost:4040/ in browser. \nTo stop Depot press Ctrl + C'
);
