var root = __dirname;
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var fl = require('./file-list.js');
var getFileList = fl.getFileList;
var getCurrentVersion = require('./get-latest-version.js');


var root;

function setRoot(dir) {
    root = dir;
    fl.setRoot(dir);
}

function getBlocksVersions(libName, branchName) {
    if (!branchName) {
        branchName = 'current'
    } 
    var blocksList = getFileList(
            '/blocks.' + libName + '/',
            /^(?!(\.|const))/,
            true
        )
    var blocksList = blocksList.map(function(el){
        var versionList = getFileList(
            '/blocks.' + libName + '/' + el +'/',
            /.*/,
            true
        )
        var current = getCurrentVersion(versionList);
        return [el, current];
    })
    var list = {blocks: {}};
    for (var i in blocksList) {
        var bl = blocksList[i]
        if (bl[0]) {
            list.blocks[bl[0]] = bl[1];
        }
    }
    return list;
}

module.exports = {
    getBlocksVersions: getBlocksVersions,
    setRoot: setRoot
}
