jBlock.dataTemplates = (function () {
    var templates = {};

    var get = function (name) {
        return templates[name];
    };

    var has = function (name) {
        return templates[name] !== void 0;
    };

    var add = function (name, f) {
        if (has(name)) {
            console.warn('Template %s has already been defined. Replacing with a new template.', name);
        }
        templates[name] = f;
        return jBlock;
    };

    var use = function (name, json, opts, ix) {
        if (has(name)) {
            return get(name)(json, opts, ix);
        } else {
            throw new Error('There is no template named ' + name);
        }
    };

    return {
        get: get,
        has: has,
        add: add,
        use: use
    };
})();
