require('./select.jblock.js');

BEM.DOM.decl('select',
{
    onSetMod:
    {
        js: function ()
        {
            this.__base.apply(this, arguments)

            this._button = this.findBlockInside('button')
            this._menu = this.findBlockInside('menu')
            this._popup = this.findBlockInside('popup')

            var that = this
            this._menu.on('change', function () {
                that._onMenuChange(this)
            })

            this._updateTitle()
            this._setPopupMinWidth()
        }
    },

    reset: function ()
    {
        this._menu.delMod(this._menu.elem('item'), 'state')
        this._updateTitle()
    },

    getValue: function ()
    {
        var item = this._menu.elem('item', 'state', 'check')
        return item.attr('value') ? item.attr('value') : item.text()
    },

    setValue: function (value)
    {
        var itemByValue = this._menu
            .elem('item')
            .filter(function ()
            {
                var $this = $(this)
                return $this.attr('value')
                    ? $this.attr('value') == value
                    : $this.text() == value
            })

        if (itemByValue.length)
        {
            this._menu.setMod(this._menu.elem('item'), 'state', '')
            this._menu.setMod(itemByValue, 'state', 'check')
            this._menu.trigger('change')
        }
    },

    _setPopupMinWidth: function ()
    {
        this._popup.domElem.css({
            minWidth: this._button.domElem.outerWidth()
        })
    },

    _onMenuChange: function ()
    {
        this._updateTitle()
        this.trigger('change')
    },

    _updateTitle: function ()
    {
        var title,
            selectedItem = this._menu.elem('item', 'state', 'check')

        if (!selectedItem.length && this._menu.hasMod('mode', 'radio'))
        {
            selectedItem = this._menu.elem('item').first()
            this._menu.setMod(selectedItem, 'state', 'check')
        }

        if (selectedItem.length == 1)
        {
            !this._menu.hasMod('mode', 'radio')
                && this._button.setMod('state', 'check')

            title = selectedItem.html()

            var url = '';
            if (this._menu.hasMod(selectedItem, 'icon', 'yes'))
            {
                url =  selectedItem.css('background-image')
                url = url.slice(4, url.length - 1) 
                this._button.setIcon(url)
            }
            else
            {
                this._button.setIcon('')
            }
        }
        else if (selectedItem.length > 1)
        {
            !this._menu.hasMod('mode', 'radio')
                &&  this._button.setMod('state', 'check')

            title = []

            selectedItem.each(function ()
            {
                var $this = $(this)
                title.push(
                    $this.attr('short')
                        ? $this.attr('short')
                        : $this.text()
                )
            })

            title = title.join(', ')
            this._button.setIcon('')
        }
        else if (!this._menu.hasMod('mode', 'radio'))
        {
            this._button.setMod('state', 'release')

            title = this.domElem.attr('title') || '—'

            this._button.setIcon('')
        }

        this.hasMod('title', 'dependent')
            && this._button.setTitle(title)
    }
})

BEM.DOM.decl(
    {name:'select', modName:'width', modVal:'fixed'},
    {
        onSetMod:
        {
            js: function ()
            {
                this.__base.apply(this, arguments)

                this._popup.domElem.show()
                this._button.domElem.outerWidth(
                    this._menu.domElem.outerWidth()
                )
                this._popup.domElem.hide()
            }
        }
    }
)
