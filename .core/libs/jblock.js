var jBlock

;(function () {

jBlock =
{
    /*
     * public
     */
    json2html: function (data)
    {
        var expandedData = this._apply(data)

        function htmlForCtx (ctx)
        {
            if (Array.isArray(ctx))
            {
                var content = ''

                for (var i = 0, ii = ctx.length; i < ii; i++)
                    content += htmlForCtx(ctx[i])

                return content
            }
            else if (typeof ctx === 'string')
            {
                return ctx.replace(/\s+/,'') !== '' ? ctx : ''
            }
            else if (typeof ctx === 'number')
            {
                return ctx.toString()
            }
            else if (typeof ctx !== 'object')
            {
                return ''
            }

            var tag = ctx.tag || 'div',
                name = ctx._block || ctx._layout || ctx._parentBlock._block + '__' + ctx._elem,
                classes = name,
                content = ctx._content ? htmlForCtx(ctx._content) : '',
                attr = '',
                css = ''

            for (modName in ctx._mod)
            {
                var modVal = ctx._mod[modName]

                if (typeof modVal !== 'undefined' && modVal !== '' && modVal !== false)
                    classes += ' ' + name + '_' + modName + (modVal === true ? '' : '_' + modVal)
            }

            for (var i = 0, ii = ctx.mix.length; i < ii; i++)
                classes += ' ' + ctx.mix[i]

            for (attrName in ctx.attr)
            {
                var attrVal = ctx.attr[attrName]

                if (typeof attrVal !== 'undefined' && attrVal !== '')
                    attr += ' '+ attrName +'="'+ attrVal +'"'
            }

            for (property in ctx.css)
                if (ctx.css[property])
                {
                    if (property === 'background-image' && ctx.css[property].substr(0,4) !== 'url(')
                        ctx.css[property] = 'url(' + ctx.css[property] + ')'

                    css += property + ':'+ ctx.css[property]

                    if (typeof ctx.css[property] === 'number' && cssPxProp[property])
                        css += 'px'

                    css += ';'
                }

            if (ctx.style)
                css += ctx.style

            if (css)
                css = ' style="'+ css +'"'

            if (ctx.js || ctx.mix.length)
            {
                ctx.mix.push(name)
                classes += ' i-bem'

                var clickDecl = ''
                for (var i = 0, ii = ctx.mix.length; i < ii; i++)
                    if (ctx.mix[i].indexOf('_') < 0)
                        clickDecl += (clickDecl ? ',' : '') +"'"+ ctx.mix[i] + "':{}"
            }

            classes = ' class="'+ classes +'"'

            return '<'+ tag
                        + classes
                        + attr
                        + css
                        + (clickDecl ? ' onclick="return {'+ clickDecl +'}"' : '')
                        + (singleTag[tag] ? '/>' : '>' + content + '</'+ tag +'>')
        }

        return htmlForCtx(expandedData)
    },

    json2xml: function (data, isHtml)
    {
        function xmlForCtx (ctx, tab)
        {
            if (!tab || !tab.length) tab = ''

            if (Array.isArray(ctx))
            {
                var content = ''

                for (var i = 0, ii = ctx.length; i < ii; i++)
                    content += xmlForCtx(ctx[i], tab)

                return content
            }
            else if (typeof ctx === 'string')
            {
                if (ctx.replace(/^\s+/, '').length > 50)
                {
                    ctx = ctx.replace(/^\s+([^\s]+)\s+/, '$1');
                    ctx = ctx.substr(0, 25) + '...' + ctx.substr(-25);
                }
                return ctx.replace(/\s+/,'') !== '' ? '\n'+tab+'  '+ctx : ''
            }
            else if (typeof ctx !== 'object')
            {
                return ''
            }

            var name,
                mods = '',
                modsBoolean = '',
                params = '',
                content

            for (param in ctx)
            {
                if (param !== '_content' && param.substr(0,1) === '_')
                    continue

                var pref = param.substr(0,2)

                if (pref === 'b_' || pref === 'e_' || pref === 'l_')
                {
                    name = param
                }
                else if (pref == 'm_')
                {
                    if (ctx[param] === false)
                        continue
                    else if (ctx[param] === true)
                        modsBoolean += ' '+ param
                    else
                        mods += ' m:'+ param.substr(2) +'="'+ ctx[param] +'"'
                }
                else if (param === 'content' || param === '_content')
                {
                    if (!content)
                        content = ctx[param]
                }
                else if (typeof ctx[param] === 'string')
                {
                    params += ' '+ param +'="'+ ctx[param] +'"'
                }
            }

            if (!content)
                content = ctx[name]

            var text = typeof content === 'string' || Array.isArray(content) && typeof content[0] === 'string'

            name = isHtml ? name.substr(2) : name.replace('_', ':')

            if (modsBoolean)
                modsBoolean = ' m="'+ modsBoolean.substr(1) +'"'

            return '\n' + tab + '<'+ name
                        + mods
                        + modsBoolean
                        + params
                        + (isHtml && singleTag[name]
                            ? '/>'
                            : '>' + xmlForCtx(content, tab + '    ') + (!text ? '' : '\n'+tab) + '</'+ name +'>'
                        )
        }

        return xmlForCtx(data)
    },

    dom2json: function (node)
    {
        if (typeof node.length !== 'undefined')
        {
            var objects = []

            for (var i = 0, ii = node.length; i < ii; i++)
            {
                if (node[i].nodeType == Node.ELEMENT_NODE)
                    objects.push(this.dom2json(node[i]))
                else
                if (node[i].nodeType == Node.TEXT_NODE)
                    objects.push(node[i].textContent)
            }

            return objects
        }

        var obj = {},
            name = node.localName.replace(':', '_')

        if (name.substr(1,1) !== '_')
            name = 'e_' + name

        if (node.attributes.length)
            for (var i = 0, ii = node.attributes.length; i < ii; i++)
            {
                var attr = node.attributes[i]

                if (attr.localName === 'm')
                {
                    var mods = attr.value.split(' ')
                    for (var j = 0, jj = mods.length; j < jj; j++)
                        obj['m_' + mods[j]] = true
                }
                else
                {
                    obj[attr.localName.replace(':', '_')] = attr.value === '' ? true : attr.value
                }
            }

        obj[name] = node.childNodes ? this.dom2json(node.childNodes) : ''
        return obj
    },

    match: function ()
    {
        var template,
            domDecl

        while (arguments.length && typeof arguments[arguments.length-1] !== 'string')
        {
            var arg = Array.prototype.pop.call(arguments)

            if (typeof arg === 'function')
                template = arg
            else
                domDecl = arg
        }

        for (var i = 0, ii = arguments.length; i < ii; i++)
        {
            var parseSelector = this._parseSelector(arguments[i]),
                selector = parseSelector.selector,
                guard = parseSelector.guard

            if (template)
            {
                if (!this._templates[selector])
                    this._templates[selector] = []

                this._templates[selector].unshift({
                    fn:template,
                    guard:guard
                })
            }

            if (domDecl && selector.indexOf('__') < 0 && !guard)
            {
                var bem = selector.split('_'),
                    ibemSelector = {
                        name: bem[0],
                        modName: bem[1],
                        modVal: bem[2]
                    }

                domDecl._extendedDecl = {}
                for (prop in extendedDomDeclProps)
                    if (domDecl[prop])
                        domDecl._extendedDecl[prop] = domDecl[prop]

                if (!domDecl.onSetMod)
                    domDecl.onSetMod = {}

                domDecl.onSetMod.js = {inited:extendedDomDeclInit}

                var domDeclCopy = {}
                for (prop in domDecl)
                    if (!extendedDomDeclProps[prop])
                        domDeclCopy[prop] = domDecl[prop]

                this._domDecl.push([ibemSelector, domDeclCopy])
            }
        }

        return this
    },

    onLoad: function (fn)
    {
        this._onLoad.push(fn)
        return this
    },

    import: {}, //custom data

    domInit: function (domElem)
    {
        if (this._domDecl)
        {
            for (var i = 0, ii = this._domDecl.length; i < ii; i++)
                BEM.DOM.decl(this._domDecl[i][0], this._domDecl[i][1])

            this._domDecl = null
        }

        if (typeof BEM !== 'undefined')
            BEM.DOM.init(domElem)
    },

    /*
     * private
     */
    _templates: {}, // templates from match() method stored here
    _domDecl: [],   // i-bem declarations
    _onLoad: [],    // handlers from onLoad() method

    /*
     * Traverse data and return expanded version of it
     * 1. Walk though data until object appeared
     * 2. Define and convert ctx params
     * 3. Apply templates for ctx
     */
    _apply: function (data, parentBlock, parentCtx, ctxIndex)
    {
        var ctx = data

        while (ctx)
        {
            if (Array.isArray(ctx))
            {
                for (var i = 0, ii = ctx.length; i < ii; i++)
                    this._apply(ctx[i], parentBlock, ctx, i)

                ctx = false
            }
            else if (typeof ctx === 'object' && ctx !== null)
            {
                if (ctx._expanded) return

                this._public2private(ctx)

                if (ctx.block) {
                    parentBlock = ctx.block
                }

                if (parentCtx) {
                    ctx._parentCtx = parentCtx
                    if (Array.isArray(parentCtx))
                        ctx._ctxIndex = ctxIndex
                }

                if (ctx._elem && !ctx._parentBlock) {
                    ctx._parentBlock = parentBlock
                }

                if (ctx._block) {
                    parentBlock = ctx
                }

                var expandedCtx = this._expand(ctx)

                if (!parentCtx && ctx !== expandedCtx) { //if root was replaced set new root
                    data = expandedCtx
                }

                parentCtx = ctx
                ctx = ctx._content || false
            }
            else
            {
                ctx = false
            }
        }

        return data
    },

    /*
     * Expand ctx with templates by selectors matching
     */
    _expand: function (ctx)
    {
        ctx._expanded = true
        jBlockNode.setCtx(ctx)

        var selectors = this._getCtxSelectors(ctx),
            templates,
            prevPriority

        for (var i = 0, ii = selectors.length; i < ii; i++)
        {
            var selector = selectors[i],
                priority = selector.split('_').length,
                selectorTemplates = this._templates[selector]

            if (typeof selectorTemplates === 'undefined') continue;

            var selectorGuardTemplates = []
            for (var j = 0, jj = selectorTemplates.length; j < jj; j++)
            {
                var guard = selectorTemplates[j].guard
                if (guard) {
                    if (guard.not && selectors.indexOf(guard.not) >= 0) continue;
                }
                selectorGuardTemplates.push(selectorTemplates[j])
            }

            if (selectorGuardTemplates.length !== 0)
            {
                if (!templates)
                    templates = []

                if (typeof prevPriority === 'undefined' || priority >= prevPriority)
                    templates = selectorGuardTemplates.concat(templates)
                else if (priority < prevPriority)
                    templates = templates.concat(selectorGuardTemplates)

                prevPriority = priority
            }
        }

        if (!templates && ctx._elem)
            templates = this._templates[ctx._parentBlock._block +'__*']

        ctx._templates = templates
        ctx._templateIndex = 0

        if (templates)
        {
            templates[0].fn.call(jBlockNode)
            jBlockNode.onComplete()
            ctx = jBlockNode.ctx()
        }

        return ctx
    },

    _getCtxSelectors: function (ctx)
    {
        if (ctx._selectors)
            return ctx._selectors

        var selectors = []

        function pushModSelectors (name)
        {
            if (!ctx._mod) return

            for (i in ctx._mod)
                if (ctx._mod[i] !== false)
                    selectors.push(
                        name + '_' + i + (ctx._mod[i] === true ? '' : '_' + ctx._mod[i]),
                        name + '_' + i
                    )
        }

        if (ctx._block)
        {
            selectors.push(ctx._block)
            pushModSelectors(ctx._block)
        }
        else if (ctx._layout)
        {
            selectors.push(ctx._layout)
            pushModSelectors(ctx._layout)
        }
        else
        {
            var parentBlockSelectors = ctx._parentBlock._selectors
            for (var i = 0, l = parentBlockSelectors.length; i < l; i++)
            {
                var elemName = parentBlockSelectors[i] + '__' + ctx._elem
                selectors.push(elemName)
                pushModSelectors(elemName)
            }
        }

        ctx._selectors = selectors
        return selectors
    },

    _parseSelector: function (text)
    {
        if (text.indexOf(':') < 0)
            return {selector:text, guard:null}

        var parts = text.split(':'),
            selector = parts.shift(),
            guard = {}

        for (var i = 0, ii = parts.length; i < ii; i++)
        {
            var part = parts[i].slice(0,-1),
                splitIndex = part.indexOf('(')

            guard[part.slice(0, splitIndex)] = part.slice(splitIndex + 1)
        }

        return {selector:selector, guard:guard}
    },

    /*
     * Ctx params convertion: human to machine format
     */
    _public2private: function (ctx)
    {
        /* Ctx params
         *
         * for human:
         *      b_blockName :String - block name
         *      e_elemName :String - element name
         *      m_modName :String|Boolean - modifier name
         *      content :String|Array|Object - node content
         *      tag :String - html tag name
         *      attr :Object - html attributes
         *      mix :String|Array - extra html classes
         *      css :Object - css properties for html instance
         *      js :Boolean - flag if block is an active (for i-jBlock.js init)
         *      block :Object - pointer to block (only for elem)
         *
         * for machine:
         *      _block :String - block name (if node is block)
         *      _elem :String - element name (if node is element)
         *      _mod :Object - modifiers list
         *      _param :Object - abstract params
         *      _content :String|Object|Array - node content
         *      _newContent :String|Object|Array - content from ctx.append() instead of _content
         *      _parentBlock :Object - pointer to block (if node is element)
         *      _parentCtx :Object - pointer to parent context in data
         *      _ctxIndex :Object - index in array of siblings if parentCtx is array
         *      _selectors :Array - selectors list for node
         *      _copy :Object - cached copy() results
         *      _converted :Boolean - if node was coverted to machine format
         *      _expanded :Boolean - if node was expanded
         */

        if (ctx._converted)
            return ctx

        ctx._converted = true
        ctx._copy = {}
        ctx._mod = {}
        ctx._param = {}

        if (ctx.block)
            ctx._parentBlock = ctx.block

        if (!ctx.attr)
            ctx.attr = {}

        if (!ctx.css)
            ctx.css = {}

        if (!ctx.mix)
            ctx.mix = []

        if (!Array.isArray(ctx.mix))
            ctx.mix = [ctx.mix]

        for (param in ctx)
        {
            var pref = param.substr(0,2),
                name = param.substr(2)

            if (pref === 'b_' || pref === 'e_' || pref === 'l_')
            {
                ctx[pref === 'b_' ? '_block' : pref === 'e_' ? '_elem' : '_layout'] = name

                if (typeof ctx.content !== 'undefined')
                {
                    ctx._content =  ctx.content
                    ctx.content = ''
                }
                else
                {
                    ctx._content = ctx[param]
                    ctx[param] = ''
                }
            }
            else if (pref == 'm_')
            {
                ctx._mod[name] = ctx[param]
            }
            else if (param.substr(0,1) !== '_' && !reservedFields[param])
            {
                ctx._param[param] = ctx[param]
            }
        }

        var content = []

        if (ctx._content instanceof Array)
            do {
                hasArray = false
                for (var i = 0, ii = ctx._content.length; i < ii; i++)
                    if (ctx._content[i] instanceof Array) {
                        hasArray = true
                        break
                    }

                if (hasArray)
                    ctx._content = content.concat.apply(content, ctx._content)
            } while (hasArray)
        else if (ctx._content !== '' && typeof ctx._content !== 'undefined')
            ctx._content = [ctx._content]

        return ctx
    },

    /*
     * Find b:* and l:* nodes and treat it like XML for blocks
     */
    _onDomReady: function ()
    {
        var elems = document.getElementsByTagName('*'),
            blocks = []

        for (var i = 0, ii = elems.length; i < ii; i++)
        {
            var pref = elems[i].localName.substr(0,2)

            if (pref == 'b:' || pref == 'l:')
                blocks.push(elems[i])
        }


        for (var i = 0, ii = blocks.length; i < ii; i++)
        {
            var block = blocks[i]

            if (!document.contains(block))
                continue

            var json = jBlock.dom2json(block),
                html = jBlock.json2html(json),
                domElem = document.createElement('html')

            domElem.innerHTML = html

            var body = domElem.childNodes[1]

            if (body.className) // new body starts new story
                document
                    .getElementsByTagName('html')[0]
                    .replaceChild(body, document.body)
            else
                block
                    .parentNode
                    .replaceChild(body.childNodes[0], block)
        }

        for (var i = 0, ii = this._onLoad.length; i < ii; i++)
            this._onLoad[i]()

        this.domInit()
    }
}

/*
 * Ctx methods, using inside match templates
 */
var jBlockNode =
{
    _ctx: null,

    setCtx: function (ctx)
    {
        this._ctx = ctx

        return this
    },
    applyBase: function ()
    {
        if (this._ctx._templates) {
            this.onComplete()
            var template = this._ctx._templates[++this._ctx._templateIndex]
            template && template.fn.call(this)
            this.onComplete()
        }
        return this
    },
    ctx: function ()
    {
        return this._ctx
    },
    js: function ()
    {
        this._ctx.js = true
        return this
    },
    html: function ()
    {
        this._ctx.html = true
        return this
    },
    tag: function (name)
    {
        this._ctx.tag = name
        return this
    },
    mix: function ()
    {
        if (arguments.length)
        {
            for (var i = 0, ii = arguments.length; i < ii; i++)
                if (typeof arguments[i] === 'string')
                    this._ctx.mix.push(arguments[i])
            return this
        }
        else
        {
            return this._ctx.mix
        }
    },
    index: function ()
    {
        if (typeof this._ctx._ctxIndex === 'undefined')
            return 0

        var index = this._ctx._ctxIndex
        var realIndex = index

        for (var i = 0, ii = index; i < index; ++i) {
            var ctx = this._ctx._parentCtx[i]
            if (typeof ctx === 'string' && !ctx.replace(/\s/g,''))
                --realIndex
        }

        return realIndex
    },
    parentLength: function ()
    {
        if (typeof this._ctx._ctxIndex === 'undefined')
            return 1

        var length = this._ctx._parentCtx.length

        for (var i = 0, ii = length; i < ii; ++i)
            if (typeof this._ctx._parentCtx[i] === 'string' && !this._ctx._parentCtx[i].replace(/\s/g,''))
                --length

        return length
    },
    isFirst: function ()
    {
        return this.index() === 0
    },
    isLast: function ()
    {
        return this.index() === this.parentLength() - 1
    },
    def: function (param, defaults)
    {
        var actuals = this._ctx[param]

        this._ctx[param] = {}

        for (name in defaults)
            this._ctx[param][name] = typeof actuals[name] !== 'undefined' && actuals[name] !== ''
                ? actuals[name]
                : defaults[name]

        return this
    },
    defMod: function (defaults) {return this.def('_mod', defaults)},
    defParam: function (defaults) {return this.def('_param', defaults)},
    setOrGet: function (param, nameOrObj, value)
    {
        var target = param ? this._ctx[param] : this._ctx

        if (typeof nameOrObj === 'object')
        {
            for (name in nameOrObj)
                target[name] = nameOrObj[name]
        }
        else if (typeof value !== 'undefined')
        {
            target[nameOrObj] = value
        }
        else
        {
            return target[nameOrObj]
        }

        return this
    },
    mod:   function (nameOrObj, value) {return this.setOrGet('_mod', nameOrObj, value)},
    attr:  function (nameOrObj, value) {return this.setOrGet('attr', nameOrObj, value)},
    css:   function (nameOrObj, value) {return this.setOrGet('css', nameOrObj, value)},
    param: function (nameOrObj, value) {return this.setOrGet('_param', nameOrObj, value)},
    selector: function ()
    {
        return this._ctx._selectors[0]
    },
    selectors: function ()
    {
        return this._ctx._selectors
    },
    name: function ()
    {
        return this._ctx._block || this._ctx._elem
    },
    blockCtx: function ()
    {
        return this._ctx._parentBlock ? this._ctx._parentBlock : this._ctx
    },
    blockMod: function (name, value)
    {
        if (typeof value !== 'undefined' && this._ctx._parentBlock)
            this._ctx._parentBlock._mod[name] = value
        else
            return this._ctx._parentBlock ? this._ctx._parentBlock._mod[name] : ''
    },
    blockParam: function (name)
    {
        return this._ctx._parentBlock ? this._ctx._parentBlock._param[name] : ''
    },
    append: function ()
    {
        if (!this._ctx._newContent)
            this._ctx._newContent = []

        for (var i = 0, ii = arguments.length; i < ii; i++)
        {
            var content = arguments[i]

            if (content)
            {
                if (Array.isArray(content))
                    for (var j = 0, jj = content.length; j < jj; j++)
                        this._ctx._newContent.push(content[j])
                else
                    this._ctx._newContent.push(content)
            }
        }

        return this
    },
    appendTo: function (target, content)
    {
        if (Array.isArray(target))
        {
            for (var i = 0, ii = target.length; i < ii; ++i)
                this.appendTo(target[i], content)
        }
        else if (typeof content !== 'undefined')
        {
            if (!Array.isArray(content))
                content = [content]

            jBlock._public2private(target)
            target._content = target._content.concat.apply(target._content, content)
        }

        return this
    },
    replaceWith: function ()
    {
        this.onComplete()

        var newContent = []
        for (var i = 0, ii = arguments.length; i < ii; i++)
            newContent.push(arguments[i])

        var parentCtx = this._ctx._parentCtx,
            ctxIndex = this._ctx._ctxIndex,
            parentBlock = this._ctx._parentBlock || this._ctx

        if (Array.isArray(this._ctx._parentCtx))
            this._ctx._parentCtx[this._ctx._ctxIndex] = newContent
        else if (this._ctx._parentCtx)
            this._ctx._parentCtx._content = newContent
        else
            this._ctx = newContent

        var currentCtx = this._ctx
        jBlock._apply(newContent, parentBlock, parentCtx, ctxIndex)
        this._ctx = currentCtx
    },
    rename: function (newName)
    {
        var clone = {}
        for (i in this._ctx) {
            var pref = i.substr(0,2)
            if (i.substr(0,1) !== '_' && pref !== 'b_' && pref !== 'e_') {
                clone[i] = this._ctx[i]
            }
        }
        for (i in this._ctx._mod) {
            clone['m_'+ i] = this._ctx._mod[i]
        }
        for (i in this._ctx._param) {
            clone[i] = this._ctx._param[i]
        }
        clone[newName] = this._ctx._content

        this.replaceWith(clone)
    },
    map: function () // selector, function
    {
        if (arguments.length === 0) return;
        var args = [];
        Array.prototype.push.apply(args, arguments)

        var fn = args.pop()
        var selectors = args
        var currentCtx = this.ctx()
        var currentBlockCtx = this.blockCtx()
        var elems = typeof selectors[0] === 'string'
            ? this.copy(selectors)
            : selectors
        var result = []

        for (var i = 0, ii = elems.length; i < ii; i++) {
            this._ctx = elems[i]
            if (this._ctx._elem) this._ctx._parentBlock = currentBlockCtx
            result.push(fn.call(this, i))
            if (this._ctx._elem) this._ctx._parentBlock = null
        }

        this._ctx = currentCtx
        return result
    },
    copy: function ()
    {
        if (!arguments.length)
            return Array.isArray(this._ctx._content)
                ? this._ctx._content
                : typeof this._ctx._content !== 'undefined' && this._ctx._content !== ''
                    ? [this._ctx._content]
                    : []

        var args = Array.isArray(arguments[0])?arguments[0]:arguments;

        var selectors = Array.prototype.join.call(args, ',')

        if (this._ctx._copy[selectors])
            return this._ctx._copy[selectors]

        var hasNotSelector = false
        for (var i = 0, ii = args.length; i < ii; i++)
            if (args[i].substr(0,1) === '!') {
                hasNotSelector = true
                break
            }

        var result = []

        for (var i = 0, ii = this._ctx._content.length; i < ii; i++)
        {
            var child = this._ctx._content[i]

            if (typeof child === 'string' || typeof child === 'number' || typeof child === 'undefined' || child === null)
                continue

            jBlock._public2private(child)

            var childName = child._block
                ? 'b_'+ child._block
                : child._elem
                    ? 'e_'+ child._elem
                    : 'l_'+ child._layout

            if (Array.prototype.indexOf.call(args, '!'+ childName) >= 0)
                continue

            if (hasNotSelector || Array.prototype.indexOf.call(args, childName) >= 0)
                result.push(child)
        }

        this._ctx._copy[selectors] = result
        return result
    },
    _copyAllWithCtx: function(ctx) {
        var content = Array.isArray(this._ctx._content)
            ? this._ctx._content
            : typeof this._ctx._content !== 'undefined' && this._ctx._content !== ''
                ? [this._ctx._content]
                : []
        function addCtx(arr, ctx) {
            for (var i in arr) {
                var item = arr[i];
                if (Array.isArray(item)){
                    item[i] = addCtx(item, ctx)
                } else {
                    item.block = ctx;
                }
            }
            return arr;
        }
        return addCtx(content, ctx);
    },
    copyAs: function (from, to, additional)
    {
        function clone (item, deep)
        {
            var itemIsArray = item instanceof Array,
                newItem = itemIsArray ? [] : {}

            for (i in item)
                if (itemIsArray || i.substr(0,1) !== '_')
                    newItem[!deep && i === from ? to : i] = item[i] && typeof item[i] === 'object'
                        ? clone(item[i], !deep && itemIsArray ? false : true)
                        : item[i]

            if (item._converted) {
                newItem.content = item._content
                if (additional)
                    for (i in additional)
                        newItem[i] = additional[i]
            }

            return newItem
        }

        return clone(this.copy(from))
    },
    copyWithCtx: function (selector)
    {
        if (!selector) {
            return this._copyAllWithCtx(this.blockCtx())
        } else {
            return this.copyAs(selector, selector, {block: this.blockCtx()})
        }
    },
    text: function ()
    {
        var ctx = this.copy.apply(this, arguments)[0],
            result = ''

        if (typeof ctx === 'undefined')
            return ''
        else if (typeof ctx === 'string')
            result = ctx
        else if (typeof ctx === 'number')
            result = ctx.toString()
        else if (arguments.length)
            for (var i = 0, ii = arguments.length; i < ii; i++)
            {
                if (typeof ctx[arguments[i]] === 'undefined')
                    continue

                var content = ctx._content

                if (content instanceof Array)
                    content = content[0]

                if (typeof content === 'string') {
                    result = content
                    break
                }
            }

        return result.replace(/^\s+|\s+$/g, '')
    },
    escapeHtml: function ()
    {
        var content = typeof this._ctx._newContent !== 'undefined'
            ? this._ctx._newContent
            : this._ctx._content

        for (var i = 0, ii = content.length; i < ii; i++)
            if (typeof content[i] === 'string')
                content[i] = content[i].replace(/</g, '&lt;')

        this._ctx._newContent = content

        return this
    },
    has: function ()
    {
        return this.copy.apply(this, arguments).length > 0
    },
    onComplete: function ()
    {
        this._ctx._copy = {}

        if (this._ctx._newContent)
        {
            this._ctx._content = this._ctx._newContent
            this._ctx._newContent = undefined
        }
    }
}

var singleTag = {
    area:1,
    base:1,
    br:1,
    col:1,
    command:1,
    embed:1,
    hr:1,
    img:1,
    input:1,
    keygen:1,
    link:1,
    meta:1,
    param:1,
    source:1,
    wbr:1
}

var cssPxProp = {
    height:1,
    width:1,
    left:1,
    right:1,
    bottom:1,
    top:1,
    'line-height':1,
    'font-size':1
}

var reservedFields = {
    content:1,
    tag:1,
    attr:1,
    param:1,
    tag:1,
    mix:1,
    css:1,
    js:1,
    block:1
}

var extendedDomDeclProps = {
    init:1,
    initBlock:1,
    on:1,
    onElem:1,
    onBlock:1,
    bindTo:1,
    bindToElem:1,
    bindToBlock:1,
    bindToWin:1
}

var extendedDomDeclInit = function ()
{
    var that = this,
        ext = this._extendedDecl

    ext.blocks = {}
    this.blocks = function (blockName) {
        if (!ext.blocks[blockName])
            ext.blocks[blockName] = this.findBlocksInside(blockName)
        return ext.blocks[blockName]
    }
    this.block = function (blockName) {
        return this.blocks(blockName)[0]
    }
    this.reinit = function (groupName) {
        extenedDeclInit(groupName)
    }
    this.say2win = function (event, data) {
        BEM.DOM.win.trigger(event, data)
    }

    function extenedDeclInit (groupName)
    {
        if (ext.on && (groupName === 'on' || !groupName))
            for (e in ext.on)
                that.on(e, ext.on[e])

        if (ext.onElem && (groupName === 'onElem' || !groupName))
            for (elem in ext.onElem)
                for (e in ext.onElem[elem])
                    that.on(that.findElem(elem), e, ext.onElem[elem][e])

        if (ext.onBlock && (groupName === 'onBlock' || !groupName))
            for (blockName in ext.onBlock)
                that.blocks(blockName).forEach(function (block) {
                    for (e in ext.onBlock[blockName])
                        (function (block, e, handler) {
                            block.on(e, function () {
                                handler.apply(that, arguments)
                            })
                        })(block, e, ext.onBlock[blockName][e])
                })

        if (ext.bindTo && (groupName === 'bindTo' || !groupName))
            for (e in ext.bindTo)
                that.bindTo(e, ext.bindTo[e])

        if (ext.bindToElem && (groupName === 'bindToElem' || !groupName))
            for (elem in ext.bindToElem)
                for (e in ext.bindToElem[elem])
                    that.bindTo(that.findElem(elem), e, ext.bindToElem[elem][e])

        if (ext.bindToBlock && (groupName === 'bindToBlock' || !groupName))
            for (blockName in ext.bindToBlock)
            {
                that.blocks(blockName).forEach(function (block) {
                    for (e in ext.bindToBlock[blockName])
                        (function (block, e, handler) {
                            block.bindTo(e, function () {
                                handler.apply(that, arguments)
                            })
                        })(block, e, ext.bindToBlock[blockName][e])
                })
            }

        if (ext.bindToWin && (groupName === 'bindToWin' || !groupName))
            for (e in ext.bindToWin)
                that.bindToWin(e, ext.bindToWin[e])

        if (ext.initBlock && (groupName === 'initBlock' || !groupName))
            for (blockName in ext.initBlock)
                that.blocks(blockName).forEach(function (block) {
                        ext.initBlock[blockName].call(block, that)
                    })

        if (ext.init && (groupName === 'init' || !groupName))
            ext.init.apply(that, arguments)
    }

    extenedDeclInit()
}

document.addEventListener('DOMContentLoaded', function () {
    jBlock._onDomReady()
})

})();

if (typeof module !== 'undefined')
    module.exports = jBlock;
