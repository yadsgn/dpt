require('./menu.jblock.js');

BEM.DOM.decl('menu',
{
    onSetMod:
    {
        js: function ()
        {
            this.bindTo('item', 'mouseup', this._onMouseUp)
        }
    },

    _onMouseUp: function (e) {}
})

BEM.DOM.decl(
    {name:'menu', modName:'mode', modVal:'check'},
    {
        _onMouseUp: function (e)
        {
            this.toggleMod($(e.target), 'state', 'check', '')
            this.trigger('change')
        }
    }
)

BEM.DOM.decl(
    {name:'menu', modName:'mode', modVal:'radio'},
    {
        _onMouseUp: function (e)
        {
            this.delMod(this.elem('item', 'state', 'check'), 'state')
            this.setMod($(e.target), 'state', 'check')
            this.trigger('change')
        }
    }
)

BEM.DOM.decl(
    {name:'menu', modName:'mode', modVal:'radiocheck'},
    {
        _onMouseUp: function (e)
        {
            this.delMod(this.elem('item', 'state', 'check').filter(function () {return this != e.target}), 'state')
            this.toggleMod($(e.target), 'state', 'check', '')
            this.trigger('change')
        }
    }
)
