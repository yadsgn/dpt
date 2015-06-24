document.addEventListener('DOMContentLoaded', function () {
    document.body.style.visibility = 'hidden';
})

var aSpec, aSpect = {add: function(){}}

// ** GLOBAL ** //
var CONF = {};

// ** HELPERS ** //
function loadJSON(path, success, error, that)
{
    function error(xhr) {
        console.log(xhr.error)
    }
    var that = that?that:this;
    var xhr = new XMLHttpRequest();
    xhr.onerror = function(e) {
        console.error('Ху')
    };    
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (success && xhr.responseText.length) {
                    try {
                        var json = JSON.parse(xhr.responseText);
                    } catch (err) {
                        console.error('Неправильный JSON', path);
                        return false;
                    }
                    success.call(that, json);
                }
            } else {
                error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function DepsLoader(root, currentScript) {
    this.list = []
    this.root = root;
    this.currentScript = currentScript;
}

DepsLoader.prototype.load = function(list, callback){
    this.list = list;
    this.callback = callback;
    this.next();
}

DepsLoader.prototype.next = function(){
    if (!(this.list && this.list.length)) {
        this.callback();
        return false;
    }
    var path = this.list.shift();
    var script = document.createElement('script')
    script.src = this.root + path;
    document.head.insertBefore(script, this.currentScript)
    var that = this;
    script.onload = function(){that.next()};
}


// ** MAIN **//


function SerpImport() {
    this.config = {
        url: {},      // From Query string
        project: {},  // From project's dir
        page: {}     // From page
    };
    this.root = {};
    this.platform = 'desktop';
    this.libs = {};    // List of the libs
    this.blocks = {};  // List of the blocks
    this.isReady = {};
    this.isRendered = false;
}

SerpImport.prototype.getPaths = function(){
    var scripts = document.getElementsByTagName('script');
    this.currentScript = scripts[scripts.length-1];
    var currentSrc = this.currentScript.src;
    this.root = {
        script:     currentSrc.replace(/si-[\d\.]+\.js.*/, ''),
        page:       window.location.href.replace(/\/[^\/]+$/, '/'),
        project:    window.location.protocol + '//' + window.location.host + '/'
    }
    var urlParts = this.root.page.match(/\/([^/]+)\/([^/]+)\/$/);
    var file = window.location.pathname.match(/([^/]+.html)$/);
    this.fileName = file&&file.length?file[0]:'index.html';
}


SerpImport.prototype.definePlatform = function(){
    ['desktop', 'mobile', 'tablet', 'desktop-tr', 'mobile-tr', 'tablet-tr'].forEach(function(platform){
        pattern = new RegExp(platform+'.html', 'i');
        if (pattern.test(window.location.pathname) || this.config.url[platform]) {
            this.platform = platform;
        }
    }, this);
    CONF.platform = this.platform;
    return this;
}

SerpImport.prototype.storeRenderConfig = function(config){
  this.config.page = config;
  return this;
}

SerpImport.prototype.render = function(config){
    if (this.isRendered) {
        console.log('Already rendered with hash-parameters from the url');
        return false;
    }
    this.storeRenderConfig(config);
    var loader = new DepsLoader(this.root.script, this.currentScript);
    var that = this;
    loader.load(['libs/lazyload.js'], function(){that.start()});
    this.isRendered = true;
}

SerpImport.prototype.start = function(){
    this
        .getQueryParameters()
        .definePlatform()
        .loadProjectConfig()
}

SerpImport.prototype.getQueryParameters = function(){
    this.queryParams = {};
    var str = window.location.search;
    if (str.length && str.length > 1) {
        str = str.substr(1);
        var params = str.split('&');
        params.forEach(function(el){
            var parts = el.split('=');
            this.queryParams[parts[0]] = parts.length>1 ? parts[1] : true;
        }, this)
    }
    this.config.url = this.queryParams;
    return this;
}

SerpImport.prototype.loadProjectConfig = function(){
    loadJSON(
        this.root.project+'.core/config/0.0.1.yaml',
        this.onProjectConfigLoaded,
        this.onProjectConfigError,
        this
    )
}

SerpImport.prototype.onProjectConfigLoaded = function(data){
  if (data.next) this.config.next = data.next;
  if (data.current) this.config.current = data.next;
  this.config.project = data;
  this.defineLibs();
}

SerpImport.prototype.onProjectConfigError = function(){
    console.error('Не найдена конфигурация проекта');
}

SerpImport.prototype.defineLibs = function(){
    this.libs = this.config.page.libs;
    for (var i in this.config.url) {
        if (this.libs[i]) {
            this.libs[i] = this.config.url[i];
        }
    }
    for (var lib in this.libs) {
        if (['next', 'current'].indexOf(this.libs[lib])>-1) {
            this.libs[lib] = this.config.project[this.libs[lib]][lib]
        }
        this.loadLib(lib, this.libs[lib])
    };
}

SerpImport.prototype.loadLib = function(libName, version){
    if (version == null) {
        version = 'current'
    }
    if (!this._libsLoaded) this._libsLoaded = {};
    this._libsLoaded[libName] = false;
    loadJSON(
        this.root.project +
            'blocks.'+libName+'/.ver/'+
            version+'.yaml',
        function(data, version){this.onLibLoaded(data, libName)},
        function(data, version){this.onLibError(data, libName)},
        this
    );
}

SerpImport.prototype.isLibsLoaded = function(){
    for (var i in this._libsLoaded) {
        if (!this._libsLoaded[i]) return false;
    }
    return true;
}

SerpImport.prototype.onLibLoaded = function(data, libName){
    this._libsLoaded[libName] = true;
    this.libs[libName] = data;
    if (this.isLibsLoaded()) {
        this.loadBlocks();
    }
}

SerpImport.prototype.loadBlocks = function(){
    this
        .defineBlocks()
        .loadFiles()
}

SerpImport.prototype.defineBlocks = function(){
    for (var lib in this.libs) {
        for (var block in this.libs[lib].blocks) {
            this.addBlockToList(lib, block, this.libs[lib].blocks[block]);
        }
    }
    if (this.config.page.blocks) {
        for (var i in this.config.page.blocks) {
            if (/[-\w]+\.[-\w]+/.test(i)) {
                var parts = i.match(/([-\w]+)\.([-\w]+)/);
                var blockName = parts[2];
                var libName = parts[1];
                this.addBlockToList(libName, blockName, this.config.page.blocks[i]);
            }
        }
    }
    for (var i in this.config.url) {
        if (/[-\w]+\.[-\w]+/.test(i)) {
            var parts = i.match(/([-\w]+)\.([-\w]+)/);
            var blockName = parts[2];
            var libName = parts[1];
            this.addBlockToList(libName, blockName, this.config.url[i]);
        }
    }

    var blockDocPattern = /\/blocks\.([^\/]+)\/([^\/]+)\/([^\/]+)\/[\w\d\-_]+.(md|ex)/;
    if (blockDocPattern.test(window.location.href)) {
        var matches = window.location.href.match(blockDocPattern);
        this.addBlockToList(matches[1], matches[2], matches[3]);
    }

    return this;
}

SerpImport.prototype.addBlockToList = function(libName, blockName, version){
    if (!this.blocks[libName]) this.blocks[libName] = {};
    this.blocks[libName][blockName] = version;
}

SerpImport.prototype.loadFiles = function(){
    // Projects files
    for (var i in this.config.project.files) {
        this.addFileToLoadQueue(this.root.project + this.config.project.files[i]);
    }
    if (this.config.page.files) {
        for (var i in this.config.page.files) {
            this.addFileToLoadQueue(this.config.page.files[i]);
        }
    }
    // Blocks files
    for (var lib in this.blocks) {
        for (var block in this.blocks[lib]) {
            var version = this.blocks[lib][block];
            var path = this.root.project + '.build/'
                + 'blocks.' + lib + '/'
                + block + '/'
                + version + '/'
                + block + '.' + this.platform
            this.addFileToLoadQueue(path + '.js');
            this.addFileToLoadQueue(path + '.css');
        }
    }


    var that = this;

    if (this._js.length) LazyLoad.js(this._js,  function(){
        that.isReady.js = true;
        that.onLibsLoaded();
    })
    if (this._css.length) LazyLoad.css(this._css,  function(){
        that.isReady.css = true;
        that.onLibsLoaded();
    })

    return this;
}

SerpImport.prototype.onLibsLoaded = function(){
    if (this.isReady.js && this.isReady.css) {
        jBlock._onDomReady();
        document.body.style.visibility = 'visible';
    }
}

SerpImport.prototype.addFileToLoadQueue = function(fileName){
    if (!this._js) this._js = [];
    if (!this._css) this._css = [];
    if (/\.js$/.test(fileName)) {
        this._js.push(fileName);
    }
    if (/\.css$/.test(fileName)) {
        this._css.push(fileName);
    }
}

SerpImport.prototype.onLibError = function(data, libName){
    console.error('Ошибка загрузки конфигурации библиотеки ' + libName);
}

SerpImport.prototype.renderFromHash = function(){
    var config = {libs: {}, blocks: {}, files: []}
    var src = this.currentScript.src;
    var param = src.match(/\?(.*$)/);
    if (!(param&&param[1])) return false;
    var conf = param[1].split('&')
    for (var i in conf) {
        var parts = conf[i].split('=')
        if (parts.length < 2) {
            if (/\.(js|css)/.test(conf[i])) {
                config.files.push(conf[i]);
            }
            continue;
        }
        var lib = parts[0], version = parts[1];
        if (/\./.test(lib)) {
            config.blocks[lib] = version;
        }
        else {
            config.libs[lib] = version;
        }
    }
    this.render(config)
}

SerpImport.prototype.tryLoadFromYaml = function() {
    this.path = this.root.page;
    // path, success, error, that
    loadJSON(this.path + 'project.yaml', this.renderFromYaml, this.noProjectYaml, this);
}

SerpImport.prototype.noProjectYaml = function() {
    console.log('noYaml');
}

SerpImport.prototype.renderFromYaml = function(data) {
    this.render(data)
}

var SI = new SerpImport();
SI.getPaths();
SI.renderFromHash();
SI.tryLoadFromYaml();
