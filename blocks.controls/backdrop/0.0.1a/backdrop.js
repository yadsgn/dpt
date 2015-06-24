jBlock

.match('backdrop', function()
{
    this.js()
    this.defMod({
        'demo':''
    })
})

BEM.DOM.decl('backdrop',
{
    onSetMod:
    {
        js: function ()
        {
            //this._page = this.findBlockOutside('page')
            this._page = $(document.body);
            this.hide()
        },
        state:
        {
            release: function ()
            {
                this.domElem
                    .animate({opacity:0}, 50, function ()
                    {
                        $(this).hide()
                    })

                //this._page.delMod('overflow')
                this._page.css('overflow', '')
            },
            active: function ()
            {
                this.domElem
                    .show()
                    .css({opacity:0})
                    .animate({opacity:1}, 50)

                //this._page.setMod('overflow', 'hidden')
                this._page.css('overflow', 'hidden')
            }
        }
    },

    show: function ()
    {
        this.setMod('state', 'active')
    },

    hide: function ()
    {
        this.setMod('state', 'release')
    }
})

BEM.DOM.decl({block:'backdrop', modName:'demo', modVal:'yes'},
{
    onSetMod:
    {
        js: function ()
        {
            this.__base.apply(this, arguments)
            this.domElem.click((function() {
                this.delMod('demo')
            }).bind(this))
        }
    }
});
