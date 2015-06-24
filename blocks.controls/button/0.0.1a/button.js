require('./button.jblock.js');

BEM.DOM.decl('button',
{
    onSetMod:
    {
        js: function ()
        {
            this._mousedown = false
            this._keydown = false

            this.bindTo('click', this._onClick)
            this.bindTo('mousedown', this._onMouseDown)
            this.bindTo('mouseup', this._onMouseUp)
            this.bindToWin('mouseup', this._onWinMouseUp)
            this.bindTo('mouseout', this._onMouseOut)
            this.bindTo('keydown', this._onKeyDown)
            this.bindTo('keyup', this._onKeyUp)
            this.bindTo('focus', this._onFocus)
            this.bindTo('blur', this._onBlur)
        },

        state:
        {
            release: function ()
            {
                this.trigger('release')
            }
        }
    },

    setGroup: function (group) {this._group = group},

    setTitle: function (title)
    {
        this.elem('label').html(title)
    },

    setIcon: function (url)
    {
        var icon = this.findElem('icon')

        if (!url)
        {
            icon.remove()
            return
        }

        if (!icon.length)
        {
            BEM.DOM.before(
                this.elem('label'),
                '<span class="button__icon"/>'
            )
            icon = this.findElem('icon')
        }

        icon.css({backgroundImage: 'url(' + url + ')'})
    },

    setHref: function (url)
    {
        this.domElem.attr('href', url)
    },

    /*
     * Private
     */
    _key:
    {
        up:38, down:40, left:37, right:39,
        backspace:8, space:32, tab:9,
        enter:13, esc:27
    },

    _onClick: function ()
    {
        this.trigger('press')

        var href = this.domElem.attr('href')

        if (href)
        {
            if (this.domElem.attr('blank') || this.domElem.attr('target') === '_blank')
                window.open(href, '_blank')
            else
                document.location = href
        }
    },
    _onMouseDown: function () {this._mousedown = true},
    _onMouseUp: function () {this._mousedown = false},
    _onWinMouseUp: function () {this._mousedown = false},
    _onMouseOut: function () {},
    _onKeyDown: function () {this._keydown = true},
    _onKeyUp: function (e)
    {
        this._keydown = false
        if (e.keyCode == 13 || e.keyCode == 32)
            this._onClick()
    },
    _onFocus: function () {},
    _onBlur: function () {}
})

BEM.DOM.decl({name:'button', modName:'mode', modVal:['button', 'next', 'back']},
{
    _onMouseDown: function ()
    {
        this.__base.apply(this, arguments)
        this.setMod('state', 'press')
    },

    _onMouseUp: function ()
    {
        this.__base.apply(this, arguments)
        this.setMod('state', 'release')
    },

    _onMouseOut: function ()
    {
        if (this.hasMod('state', 'press'))
            this.setMod('state', 'release')
    },

    _onKeyDown: function (e)
    {
        this.__base.apply(this, arguments)

        if (this.hasMod('state', 'press'))
            return false;

        if (e.keyCode == this._key.enter || e.keyCode == this._key.space)
            this.setMod('state', 'press')
    },

    _onKeyUp: function (e)
    {
        this.__base.apply(this, arguments)

        if (e.keyCode == this._key.enter || e.keyCode == this._key.space)
            this.setMod('state', 'release')
    }
})

BEM.DOM.decl({name:'button', modName:'mode', modVal:'check'},
{
    _onMouseDown: function ()
    {
        this.__base.apply(this, arguments)
        this._prevState = this.getMod('state')
        this.setMod('state', this._prevState == 'release' ? 'press' : 'presscheck')
    },

    _onMouseUp: function ()
    {
        this.__base.apply(this, arguments)
        this.setMod('state', this._prevState == 'release' ? 'check' : 'release')
    },

    _onMouseOut: function (e)
    {
        if (this._mousedown)
            this.setMod('state', this._prevState == 'release' ? 'release' : 'check')
    },

    _onKeyDown: function (e)
    {
        if (this._keydown) return false;

        if (e.keyCode == this._key.enter || e.keyCode == this._key.space)
            this.toggleMod('state', 'check', 'release')

        this.__base.apply(this, arguments)
    }
})

BEM.DOM.decl({name:'button', modName:'mode', modVal:['dropdown', 'dropup']},
{
    onSetMod:
    {
        js: function ()
        {
            this.__base.apply(this, arguments)
            this.setMod(this.elem('arrow'), 'state', 'close')
        }
    },

    _onMouseDown: function ()
    {
        this.__base.apply(this, arguments)
        !this.hasMod('state', 'check')
            && this.setMod('state', 'press')
        this.toggleMod(this.elem('arrow'), 'state', 'open', 'close')
    },

    _onMouseUp: function (e)
    {
        this.__base.apply(this, arguments)
        !this.hasMod('state', 'check')
            && this.setMod('state', 'release')
    },

    _onMouseOut: function ()
    {
        this.__base.apply(this, arguments)
        !this.hasMod('state', 'check')
            && this.setMod('state', 'release')
    },

    _onKeyDown: function (e)
    {
        if (this._keydown) return false;

        if (e.keyCode == this._key.enter || e.keyCode == this._key.space)
        {
            this.toggleMod('state', 'open', 'release')
            this.toggleMod(this.elem('arrow'), 'state', 'open', 'close')
        }

        this.__base.apply(this, arguments)
    }
})

BEM.DOM.decl({name:'button', modName:'mode', modVal:['radio', 'radiocheck']},
{
    onSetMod:
    {
        js: function ()
        {
            this.__base.apply(this, arguments)

            if (this.hasMod('group'))
                this.setGroup(
                    this.findBlockOutside('page').findBlocksInside(
                        {blockName: 'button', modName: 'group', modVal: this.getMod('group')}
                    )
                )
        }
    },

    _onMouseDown: function ()
    {
        this.__base.apply(this, arguments)

        this._prevState = this.getMod('state')

        if (this.hasMod('state', 'release') || this.hasMod('mode', 'radiocheck'))
            this.setMod('state',  this._prevState == 'release' ? 'press' : 'presscheck')
    },
    _onMouseUp: function ()
    {
        this.__base.apply(this, arguments)

        if (this._prevState == 'check')
        {
            this.hasMod('mode', 'radiocheck')
                && this.setMod('state', 'release')
            return
        }

        var that = this

        this.setMod('state', 'check')
        this._group && this._group.forEach(function (button)
        {
            if (button.domElem === that.domElem) return
            if (button.hasMod('state', 'check')) that._prevCheck = button
            button.setMod('state', 'release')
        })
    },
    _onMouseOut: function (e)
    {
        if (this._mousedown)
            this.setMod('state', this._prevState)
    }
})
