require('./popup.jblock.js');

BEM.DOM.decl('popup',
{
    onSetMod:
    {
        js: function ()
        {
            this._trigger = this.elem('trigger').length
                ? this.elem('trigger').find('> *').insertBefore(this.domElem)
                : this.domElem.attr('trigger')
                    ? $(this.domElem.attr('trigger'))
                    : this.domElem.prev()

            this.domElem.appendTo(document.body).hide()
            this.elem('trigger').remove()

            var show = this.getMod('show').split('-')
            this._side = show[0]
            this._align = show[1]

            this._sideOffset = parseInt(this.domElem.attr('offset'))
                || parseInt(this.domElem.attr('side-offset'))
                || (this.domElem.is('[offset], [side-offset]') ? 0 : 8)

            this._alignOffset = parseInt(this.domElem.attr('align-offset'))
                || 0

            this._menu = this.findBlockInside('menu')

            if (this.domElem.attr('show-on') && this.domElem.attr('hide-on')) {
                var show = this.domElem.attr('show-on').split(' ')
                var hide = this.domElem.attr('hide-on').split(' ')
                var that = this

                this._trigger.find(show.shift()).on(show.join(' '), function () {
                    that.setMod('state', 'visible')
                })
                this._trigger.find(hide.shift()).on(hide.join(' '), function () {
                    that.setMod('state', 'hidden')
                })
            } else {
                this.bindTo(this._trigger, 'mousedown tap', this._onTriggerMouseDown)
                this.bindTo(this._trigger, 'mouseenter', this._onTriggerMouseOver)
                this.bindTo(this._trigger, 'mouseleave', this._onTriggerMouseOut)
                this.bindTo(this._trigger, 'mouseup touchend', this._onTriggerMouseUp)
                this.bindToWin('mousedown', this._onWinMouseDown)
            }

            this.bindTo('mousedown', this._onMouseDown)
            this.bindTo('mouseup', this._onMouseUp)

            this.bindToWin('scroll resize', this._onWinChange)
            this.bindToWin('keydown', this._onWinKeyDown)
        },

        state:
        {
            hidden: function ()
            {
                var domElem = this.domElem

                this._timeout && clearTimeout(this._timeout)
                this._timeout = setTimeout(function () {
                    domElem.hide()
                }, 100)
            },
            visible: function ()
            {
                this.domElem.show()
                this._locateTrigger()
            }
        }
    },

    trigger: function () {
        return this._trigger
    },

    _onTriggerMouseDown: function () {},
    _onTriggerMouseOver: function () {},
    _onTriggerMouseOut: function () {},
    _onTriggerMouseUp: function () {},

    _onMouseDown: function () {},
    _onMouseUp: function () {},

    _onWinMouseDown: function () {},
    _onWinChange: function () {},
    _onWinKeyDown: function () {},

    /*
     * Private
     */
    _locateTrigger: function ()
    {
        var triggerOffset = this._trigger.offset(),
            triggerHeight = this._trigger[0].offsetHeight,
            triggerWidth = this._trigger[0].offsetWidth,
            popupHeight = this.domElem.height(),
            popupWidth = this.domElem.width(),
            side = this._side,
            align = this._align,
            sideOffset = this._sideOffset,
            alignOffset = this._alignOffset

        var sideLocation, alignLocation

        sideLocation =
            side == 'bottom' ? {top: triggerHeight + triggerOffset.top + sideOffset} :
            side == 'top'    ? {top: -popupHeight + triggerOffset.top - sideOffset} :
            side == 'left'   ? {left: -popupWidth + triggerOffset.left - sideOffset} :
            side == 'right'  ? {left: triggerWidth + triggerOffset.left + sideOffset} : null

        if (side == 'bottom' || side == 'top')
            alignLocation =
                align == 'left'   ? {left: triggerOffset.left + alignOffset} :
                align == 'right'  ? {left: triggerWidth + triggerOffset.left - popupWidth - alignOffset} :
                align == 'center' ? {left: Math.round(triggerOffset.left + triggerWidth/2 - popupWidth/2) + alignOffset} : null

        if (side == 'left' || side == 'right')
            alignLocation =
                align == 'top'    ? {top: triggerOffset.top + alignOffset} :
                align == 'bottom' ? {top: triggerOffset.top + triggerHeight - popupHeight - alignOffset} :
                align == 'center' ? {top: Math.round(triggerOffset.top + triggerHeight/2 - popupHeight/2) + alignOffset} : null

        if (sideLocation && alignLocation)
            this.domElem
                .css(sideLocation)
                .css(alignLocation)
    },
    _hide: function ()
    {
        this.hasMod('state', 'visible')
            && this._trigger.trigger('mousedown').trigger('mouseup')
    }
})

BEM.DOM.decl({name:'popup', modName:'mode', modVal:'click'},
{
    _onMouseDown: function (e)
    {
        e.stopPropagation()
    },
    _onMouseUp: function (e)
    {
        e.stopPropagation()

        if (this._menu && (this._menu.hasMod('mode', 'radio') || this._menu.hasMod('mode', 'radiocheck')))
            this._hide()
    },
    _onWinMouseDown: function ()
    {
        this._hide()
    },
    _onWinChange: function ()
    {
        if (this.hasMod('state', 'visible'))
            this._locateTrigger()
    },
    _onWinKeyDown: function (e)
    {
        if (e.keyCode == 27) //esc
            this._hide()
    },
    _onTriggerMouseDown: function (e)
    {
        e.stopPropagation()
        this.toggleMod('state', 'hidden', 'visible')
    }
})

BEM.DOM.decl({name:'popup', modName:'mode', modVal:'hover'},
{
    _onTriggerMouseOver: function ()
    {
        this.setMod('state', 'visible')
    },
    _onTriggerMouseOut: function ()
    {
        this.setMod('state', 'hidden')
    }
})

BEM.DOM.decl({name:'popup', modName:'mode', modVal:'tip'},
{
    onSetMod:
    {
        js: function ()
        {
            this.__base.apply(this, arguments)

            var that = this
            setTimeout(function () {
                that.setMod('state', 'visible')
            }, 500)

            this._sideOffset = parseInt(this.domElem.attr('offset'))
            if (isNaN(this._sideOffset))
                this._sideOffset = parseInt(this.domElem.attr('side-offset'))
            if (isNaN(this._sideOffset))
                this._sideOffset = this.hasMod('size', 'grand') ? 16 : 10
        }
    },

    _onTriggerMouseDown: function (e)
    {
        e.stopPropagation()
        this.setMod('state', 'hidden')
    },
    _onMouseDown: function (e)
    {
        e.stopPropagation()
        this._hide()
    },
    _onWinChange: function ()
    {
        if (this.hasMod('state', 'visible'))
            this._locateTrigger()
    },
    _onWinMouseDown: function ()
    {
        !this.hasMod('force') && this.setMod('state', 'hidden')
    }
})

BEM.DOM.decl({name:'popup', modName:'auto-close', modVal:'yes'},
{
    _onMouseDown: function (e)
    {
        this.__base.apply(this, arguments)
        this.setMod('state', 'hidden')
    }
})

BEM.DOM.decl({name:'popup', modName:'mode', modVal:'hold'},
{
    _onTriggerMouseDown: function (e)
    {
        this.setMod('state', 'visible')
    },
    _onTriggerMouseOut: function (e)
    {
        this.setMod('state', 'hidden')
    },
    _onTriggerMouseUp: function (e)
    {
        e.preventDefault()
        this.setMod('state', 'hidden')
    }
})

