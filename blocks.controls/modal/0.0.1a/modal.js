jBlock

.match('modal', function()
{
    this.js()
        .defMod({
            state:'hidden'
        })
        .append(
            {e_content:this.copy(), title:this.param('title')},
            {b_backdrop:''}
        )
})

.match('modal__content', function()
{
    this.mix('island')
        .append(
            this.param('title') && {e_title:this.param('title')},
            this.copy()
        )
        .mod({
            padding: this.param('title') && 'yes'
        })
})

BEM.DOM.decl('modal',
{
    onSetMod:
    {
        js: function ()
        {
            var that = this
            this._fog = this.findBlockInside('backdrop')

            this._trigger = this.elem('trigger').length
                ? this.elem('trigger').find('> *').insertBefore(this.domElem)
                : this.domElem.attr('trigger')
                    ? $(this.domElem.attr('trigger'))
                    : this.domElem.prev()

            this.domElem.appendTo(document.body)
            this.elem('trigger').remove()

            this.bindTo(this._trigger, 'click', this._onTriggerClick)
            this._fog.bindTo('click', function () { that._onFogClick() })
            this.bindTo(this.elem('close'), 'click', this._onCloseClick)
        },

        state:
        {
            visible: function ()
            {
                this.domElem.show()
                this._fixOffset()
                this._fog.show()

                this.elem('content').css({
                    opacity:1,
                    '-webkit-transform': 'scale(1)'
                })

                this.trigger('show')
            },
            hidden: function ()
            {
                this.elem('content').css({
                    opacity:'',
                    '-webkit-transform': 'scale(1.5)'
                })

                var that = this
                setTimeout(function ()
                {
                    that.elem('content').css({'-webkit-transform': ''})
                    that.domElem.hide()
                }, 200)

                that._fog.hide()
                this.trigger('hide')
            }
        }
    },

    _onTriggerClick: function ()
    {
        this.setMod('state', 'visible')
    },

    _onFogClick: function ()
    {
        if (this.elem('close').length)
        {
            this.elem('close')
            .animate({top:'-=5'},  50)
            .animate({top:'+=10'}, 70)
            .animate({top:'-=8'},  80)
            .animate({top:'+=5'}, 100)
            .animate({top:'-=2'}, 120)
        }
        else
        {
            this.setMod('state', 'hidden')
        }
    },

    _onCloseClick: function ()
    {
        this.setMod('state', 'hidden')
    },

    _fixOffset: function ()
    {
        this.elem('content').css({
            marginLeft: - this.elem('content').outerWidth() / 2,
            marginTop: - this.elem('content').outerHeight() / 2
        })
    }
})
