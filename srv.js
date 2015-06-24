var express = require('express');
var app = express();

var dpt = require('depot-dev-server');
server = dpt.createServer(process.cwd());
app.use(server);

app.listen(4040);
console.log(
'     . . . . o o o o o\n'+
'            _____      o       \n'+
'   ____====  ]OO|_n_n__][.     \n'+
'  [________]_|__|________)<    \n'+
'   oo    oo  \'oo OOOO-| oo\\_     \n'+
'+--+--+--+--+--+--+--+--+--+--+--+\n'+
'\n' +
'Open http://localhost:3040/ in browser. \nTo stop Depot press Ctrl + C'
);
