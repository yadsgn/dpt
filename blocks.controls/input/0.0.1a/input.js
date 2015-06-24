require('./input.jblock.js');

BEM.DOM.decl('input',
{
    onSetMod:
    {
        js: function ()
        {
            this._keydown = false

            this.bindTo('input', 'keydown', this._onKeydown)
            this.bindTo('input', 'keyup', this._onKeyup)
            this.bindTo('input', 'input', this._onInput)
            this.bindTo('input', 'focus', this._onFocus)
            this.bindTo('input', 'blur', this._onBlur)
            this.bindTo('input', 'click', this._onClick)
            this.bindTo('clear', 'click', this._onClearClick)

            this._onInput()
        },

        state:
        {
            filled: function ()
            {
                this.trigger('filled')
            },
            empty: function ()
            {
                this.trigger('empty')
            }
        }
    },

    value: function (value, silent)
    {
        if (typeof value !== 'undefined') {
            this.elem('input').val(value)
            !silent && this.elem('input').trigger('input')
        } else {
            return this.elem('input').val()
        }
    },

    clear: function ()
    {
        this.elem('input').val('').trigger('input')
    },

    toggleFocus: function ()
    {
        this.elem('input').is(':focus')
            ? this.elem('input').blur()
            : this.elem('input').focus()
    },

    focus: function ()
    {
        if (!this.elem('input').is(':focus'))
        {
            this.elem('input').focus()
            var length = this.elem('input').val().length
            this.elem('input')[0].setSelectionRange(length, length)
        }
    },

    blur: function ()
    {
        this.elem('input').is(':focus')
            && this.elem('input').blur()
    },

    /*
     * Private
     */
    _onKeydown: function (e)
    {
        if (e.keyCode === jBlock.import.key.enter && !this._keydown) {
            this._keydown = true
            this.trigger('submit')
        }
        this.trigger('keydown')
    },
    _onKeyup: function (e)
    {
        this._keydown = false
    },
    _onInput: function (e)
    {
        if (this.elem('input').val())
            this.setMod('state', 'filled')
        else
            this.setMod('state', 'empty')

        this.trigger('input')
    },
    _onFocus: function ()
    {
        this.setMod('focus', 'yes')
        this.trigger('focus')
    },
    _onBlur: function ()
    {
        this._keydown = false
        this.delMod('focus')
        this.trigger('blur')
    },
    _onClearClick: function ()
    {
        this.clear()
        this.focus()
    },

    _onClick: function () {}
})

BEM.DOM.decl({name:'input', modName:'readonly', modVal:'yes'},
{
    _onClick: function ()
    {
        this.__base.apply(this, arguments)
        this.elem('input').select()
    }
})
