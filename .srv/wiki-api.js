var express = require('express');
var app = express();
var fs = require('fs');
var tr = require('transliteration');
var _ = require('underscore');
var marked = require('marked');
var path = require('path')
var yaml2json = require('yaml-to-json');
var md5 = require('MD5');
var getCurrentVersion = require('./get-latest-version.js');
var fl = require('./file-list.js');
var getFileList = fl.getFileList;

// ~ ~ ~  A P I  ~ ~ ~
//  /wiki-api/
//      libs/                   List of libs
//          :name/              List of lib's versions, pointer to current
//              ?version/       List of blocks of library with current versions
//      blocks/
//          :lib/:name/         List of block's versions, current version + description
//              :version/       Block's description


function createServer(){
    var app = express();
    app.use('/wiki-api/libs/:lib/:block', routerBlockInfo)
    app.use('/wiki-api/libs/:lib', routerLibInfo);
    app.use('/wiki-api/libs/', routerLibsList);
    return app;
}

var root = __dirname;
function setRoot(dir) {
    root = dir;
    fl.setRoot(dir);
}

/********************/
/*** LIST OF LIBS ***/
/********************/

function routerLibsList(req, res) {
    var libsList = getLibsList();
    libsList = libsList.map(function(el){
        var name = el.replace(/blocks\./, '');
        var versions = getLibVersions(name);
        var info = getLibInfoFromYaml(name);
        if (!info) {
            return false;
        }
        var current = getCurrentVersion(versions);
        return {
            name: name,
            versions: versions,
            current: current,
            info: info
        }
    })
    libsList = _.compact(libsList);
    res.set('Content-Type', 'application/json');
    res.send(
        JSON.stringify(libsList)
    );
}

function getLibsList() {
    return getFileList('', /^blocks\..*/i, true);
}

function getLibVersions(lib) {
    var versionsList = getFileList('blocks.'+lib+'/.ver/', /.*\.yaml$/, false);
    if (!versionsList) {
        return false;
    }
    return versionsList.map(function(el){return el.replace(/\.yaml$/, '')});
}

function getLibInfoFromYaml(libName) {
    var json = readYamlFile('blocks.'+libName+'/'+'blocks.'+libName+'.yaml');
    return json;
}


/**********************/
/*** LIST OF BLOCKS ***/
/**********************/

function routerLibInfo(req, res) {
    var libName = req.params.lib;
    var versions = getLibVersions(libName);
    var current = getCurrentVersion(versions);
    var ver = req.query['lib.version'] || current;
    var info = getLibInfoFromYaml(libName);
    var versionInfo = libVersionInfo(libName, ver);
    var blocksList = libGetBlocksList(libName);

    var result = {
        name: libName,
        versions: versions,
        current: current,
        blocks: blocksList,
        ver: ver,
        info: info,
        versionInfo: versionInfo
    }
    res.set('Content-Type', 'application/json');
    res.send(
        JSON.stringify(result)
    );
}

function libVersionInfo(lib, version) {
    var config = readYamlFile('blocks.'+lib+'/.ver/'+version+'.yaml')
    return config;
}

function libGetBlocksList(lib) {
    var fileList = getFileList('blocks.'+lib + '/', /^[^.]/, true);
    var fileList = fileList.map(function(blockName){
        return getBlockInfo(lib, blockName)
    })
    fileList = _.compact(fileList)
    return fileList;
}

/*******************/
/*** ABOUT BLOCK ***/
/*******************/

function routerBlockInfo (req, res) {
    var libName = req.params.lib;
    var blockName = req.params.block;
    var versions = getBlockVersions(libName, blockName);
    var current = getCurrentVersion(versions);
    var ver = req.query['lib.version'] || current;
    var blockInfo = getBlockInfo(libName, blockName, ver);
    var result = blockInfo;
    res.set('Content-Type', 'application/json');
    res.send(
        JSON.stringify(result)
    );
}

function getBlockInfo(lib, block) {
    var basePath = 'blocks.'+lib+'/'+block+'/';
    var json = readYamlFile(basePath + block + '.yaml');
    if (!json) {
        return false;
    }
    json.versions = getBlockVersions(lib, block);
    json.current = getCurrentVersion(json.versions);
    json.name = block;
    return json;
}

function getBlockVersions(lib, block) {
    var versionsList = getFileList('blocks.'+lib+'/'+block+'/', undefined, true);
    return versionsList;
}

/****************/
/* SUPLIMENTARY */
/****************/

function readMdFile(filepath) {
    var file = fs.readFileSync(global.root + '/' + filepath, 'utf-8')
    var tokens = marked.lexer(file);
    return tokens;
}

function readYamlFile(filepath) {
    var fullpath = global.root + '/' + filepath;
    if (!fs.existsSync(fullpath)) {
        return false;
    }
    var file = fs.readFileSync(fullpath, 'utf-8')
    return yaml2json(file);
}


module.exports = {
    createServer: createServer,
    setRoot: setRoot
}
