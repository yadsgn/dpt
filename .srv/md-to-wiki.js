var express = require('express');
var app = express();
var fs = require('fs');
var transliterate = require('transliteration.cyr');
var tr = transliterate.transliterate;
var _ = require('underscore');
var yaml = require('yaml-js');
var md5 = require('MD5');
var path = require('path');
var highlight = require("highlight").Highlight;
var getCurrentVersion = require('./get-latest-version');

var regTask = /\[(\w+-\d+)\]\s*$/;


var PLATFORMS = ['desktop', 'tablet', 'mobile'];

var marked = require('marked');
var mdRenderer = new marked.Renderer();

mdRenderer.code = function(code, lang) {
    var params = {};
    if (lang) {
        var chunks = lang.split(' ');
        var lang = chunks[0];
        for (var i in chunks) {
            if (!chunks.hasOwnProperty(i)) continue;
            var index = chunks[i].indexOf('=');
            if (!index) continue;
            var key = chunks[i].substr(0, index);
            var val = chunks[i].substr(index+1);
            params[key] = val;
        }
    }
    var dev = ''
    if (params.dev) {
        dev = 'dev="'+params.dev+'"'
    }
    if (lang == 'yaml') {
        var json = JSON.stringify(yaml.load(code));
        return ''+
            '<script src="/.core/si-0.6.0.js#noproject"></script>' +
            '<script>'+
                'var WIKIHACKDATA = ' +
                 json +
            '</script>\n' +
            '<script>'+
                'SI.render(' +
                json +
                ')'+
            '</script>\n' +'<!-- body place -->\n'
    } else if (/^jhtml/.test(lang)) {
        var mod = getMod(lang);
        return '' +
            '<example ' +
            mod + ' ' +
            dev + ' ' +
            'src="' + this.options.baseUrl.replace(/\.md/, '.ex') +'?codeId='+md5(code)+'" '+
            'm:resizable="yes">' +
            code +
            '</example>';
    } else if (/^src/.test(lang)) {
        var mod = getMod(lang);
        return '' +
            '<example ' +
            mod + ' ' +
            'm:source="src" ' +
            'src="' +
                this.options.baseUrl
                    .replace(
                        /[^\/]*.md/,
                        code.replace(/\n/, '')
                    ) +'" '+
                    'm:resizable="yes"></example>';
    } else if (/^excode/.test(lang)) {
        return code
    } else if (/^cut/.test(lang)) {
        var label = lang.match(/^cut\(([^)]+)\)/);
        label = label&&label[1] ? label[1] : 'Узнать больше'
        if (/^```/.test(code)) {
            code += '\n```\n'
        }
        return(
            '<more label="' + label + '">'
                + '<hidden>' + marked(code, {renderer: mdRenderer}) + '</hidden>'
            + '</more>'
        )
    } else {
        return '<code>\n'
            + code
                .replace(/</g, '&lt;')
                .replace(/&/g, '&amp;')
                .replace(/\\`/g, '`')
            + '\n</code>\n';
    }
}

mdRenderer.codespan = function(text) {
  return '<codespan>' + text + '</codespan>';
};


mdRenderer.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var target = false;
  var libBlockReg = /^([^\/.]+).([^.]+)$/;
  if (libBlockReg.test(href) && !/^http/.test(href)) {
    var chunks = href.match(libBlockReg);
    var lib = chunks[1];
    var block = chunks[2];
    href = '/wiki/libs/' + lib + '/' + block;
    target = '_parent';
  }
  if (/^http/.test(href)) {
    target = '_blank';
  }

  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  if (target) {
    out += ' target="' + target + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

function getMod(lang) {
    var mods = lang.match(/[^_]+_([^_]+)_?(.*)/);
    var mod = '';
    if (mods) {
        if (mods[1] && mods[2]) {
            mod = 'm:'+mods[1]+'="'+mods[2]+'"';
        } else if (mods[1]){
            mod = 'm:type="'+mods[1]+'"';
        }
    } else {
        mod = 'm:type="default"'
    }
    return mod;
}

mdRenderer.heading = function(text, level, raw) {
    function extractTask(text) {
        var taskId = text.match(regTask);
        if (taskId) {
          taskId = taskId[1]
        }
        return taskId;
    }
    var taskId = extractTask(raw)
    text = text.replace(regTask, '')
    return '<h'
        + level
        + (taskId?' task="'+taskId+'"':'')
        + ' id="'
        + text2url(text)
        + '">'
        + text
        + '</h'
        + level
        + '>\n';
};


marked.setOptions({
  renderer: mdRenderer
});

function createServer(){
    var app = express();
    app.use('*.ex', function(req, res, next){
        var file = fs.readFileSync(global.root + req.baseUrl.replace(/\.ex/, '.md'), 'utf-8');
        var codeId = req.query.codeId;
        var tokens = marked.lexer(file);
        tokens = tokens.map(function(el){
            if (el.type !== 'code') return false;       // Remove description
            if (el.lang == 'yaml' && !req.query.onlyCode) return el;           // Don't touchs config
            if (codeId && md5(el.text) != codeId) return false;   // Filter all code e(el.type !== 'code') return false;       // Remove descript[ii]ed, if codeIrn false;   // Filter all code e(el.type !== 'code') return false;       // Remove descript[ii]      el.lang = 'jhtml-ex'
            if (req.query.onlyCode) {
                el.lang = 'excode';
                return el;
            } else {
                return el;
            }
        })
        tokens = _.compact(tokens);
        tokens.links = {} // Hack, marked chrash without it

        res.set('Content-Type', 'text/html');
        res.send(
            marked.parser(tokens, {baseUrl: req.baseUrl, renderer: mdRenderer})
        );
    });
    app.use('*.md', function(req, res, next){
        var filepath = global.root + req.baseUrl;
        var file = fs.readFileSync(filepath, 'utf-8')
        var tokens = marked.lexer(file);
        var toc = generateMdTocJson(tokens);
        var platforms = getPlatforms(req);
        var platformsDom = platformsToDom(platforms);
        if (req.query.toc) {
            res.set('Content-Type', 'application/json');
            res.send(
                JSON.stringify(toc)
            )
        } else {
            var tocDom = generateTocBlock(toc);
            res.set('Content-Type', 'text/html');
            var content = marked(file, {baseUrl: req.baseUrl, renderer: mdRenderer})

            if (tocDom) {
                tocDom = '<toc>\n' + tocDom + '</toc>\n';
                content = content.replace('<!-- body place -->', '<b:w-doca m:toc m:platform="'+platforms.current+'">\n' + platformsDom + tocDom);
                content += '\n</b:w-doca>'
            } else {
                content = content.replace('<!-- body place -->', '<b:w-doca m:platform="'+platforms.current+'">\n' + platformsDom );
                content += '\n</b:w-doca>';
            }
            res.send(content);
        }
    });
    return app;
}


function getPlatforms(req) {
    var filepath = global.root + req.baseUrl;
    var filename = path.basename(filepath);
    var chunks = filename.split('.');
    var blockname = chunks[0]
    if (chunks.length == 3) {
        current = chunks[1];
    } else {
        current = 'desktop';
    }
    if (req.query.platform !== undefined) {
        current = req.query.platform
    }
    // for (var i in PLATFORMS) {
    //     var p = PLATFORMS[i];
    //     if (req.query[p] !== undefined || req.query == p) {
    //         current = p;
    //     }
    // }
    var dir = path.relative(global.root, path.dirname(filepath));
    var reg = new RegExp(blockname + '.*\.md');
    var filelist = getFileList(dir, false, reg);
    var platforms = filelist.map(function(el){
        var chunks = el.split('.');
        if (chunks.length == 3) {
            return chunks[1];
        } else {
            return '';
        }
    })
    return {
        list: platforms,
        current: current,
        block: blockname
    }
}

function platformsToDom(json) {
    var current = json.current;
    var platforms = json.list;
    var blockname = json.block;
    var dom = '';
    for (var i in PLATFORMS) {
        if (!PLATFORMS.hasOwnProperty(i)) {
            continue;
        }
        var p = PLATFORMS[i];
        if (p == current) {
            dom += '<platform m:current>'+p+'</platform>';
        } else if (_.contains(platforms, p)) {
            dom += '<platform href="'+blockname + '.' +p+'.md?platform='+p+'">'+p+'</platform>';
        } else {
            dom += '<platform href="'+blockname + '.md?platform='+p+'">'+p+'</platform>';
        }
    }
    return '<platforms>'+dom+'</platforms>'
}

function getFileList(basePath, onlyDir, regexp) {
    var fullPath = global.root + '/' + basePath;
    var dirs = fs.readdirSync(fullPath);
    if (regexp===undefined) {
        regexp = /.*/;
    }
    dirs = dirs.map(function(dir){
        var stat = fs.statSync(path.join(basePath, dir));
        if (onlyDir && !stat.isDirectory()) {
            return false;
        }
        if (!regexp.test(dir)) {
            return false;
        }
        return dir;
    })
    libs = _.compact(dirs);
    return libs;
}


function text2url(str) {
    return tr(str, {lowercase: true, separator: '-'}).replace(/\s*$/, '').replace(/\s/, '-').toLowerCase();
}

function generateMdTocJson(tokens) {
    var toc = [];
    var currentLevel = 1;
    var currentArr = toc;
    var currentParent = undefined;
    var previousH = undefined;
    for (var i in tokens) {
        var el = tokens[i];
        if (el.type == 'heading') {
            if (el.depth > 3) continue;
            var text = el.text.replace(regTask, '')
            var newH = {
                'title': text,
                'id': text2url(text),
                'children': []
            }
            if (el.depth > currentLevel) {
                currentArr = previousH.children;
                currentParent = previousH;
            } else if (el.depth < currentLevel) {
                currentParent = previousH.parent.parent;
                currentArr = previousH.parent.parent.children;
            }
            newH.parent = currentParent;
            currentArr.push(newH);
            previousH = newH;
            currentLevel = el.depth;
            newH.level = currentLevel;
        }
    }
    var toc = cleanParents(toc);
    return toc;
}

function generateTocBlock(toc) {
    if (!toc.length) {
        return false;
    }
    var tocDom = '<b:w-toc>\n'
    tocDom += '' +
        '<e:begining></e:begining>';
    var tocRoot = toc[0].children;
    for (var i in tocRoot) {
        if (!tocRoot.hasOwnProperty(i)) continue;
        tocDom += '  <e:part>\n';
        tocDom += '    <e:part-title id="'+tocRoot[i].id+'"">' + tocRoot[i].title +'</e:part-title>';
        tocDom += '    <e:subparts">';
        tocRoot[i].children = _.compact(tocRoot[i].children);
        if (tocRoot[i].children && tocRoot[i].children.length > 0) {
            for (var ii in tocRoot[i].children) {
                if (!tocRoot[i].children.hasOwnProperty(ii)) continue;
                tocDom += '      <e:subpart>\n';
                tocDom += '        <e:subpart-title id="'+tocRoot[i].children[ii].id+'"">' + tocRoot[i].children[ii].title +'</e:subpart-title>';
                tocDom += '      </e:subpart>\n';
            }
        }
        tocDom += '    </e:subparts">';
        tocDom += '  </e:part>\n';
    }
    tocDom += '</b:w-toc>\n';
    return tocDom;
}

function cleanParents(toc) {
    for (var i in toc) {
        if (toc[i].children && toc[i].children.length) {
            toc[i].children = cleanParents(toc[i].children)
        }
        delete toc[i].parent;
    }
    return toc;
}



module.exports = {
    createServer: createServer
}
