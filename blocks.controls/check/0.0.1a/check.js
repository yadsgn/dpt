require('./check.jblock.js');

BEM.DOM.decl('check',
{
    onSetMod:
    {
        js: function ()
        {
            this._button = this.findBlockInside('button')

            this.bindTo('label', 'mousedown', this._onMouseDown)
            this.bindTo('label', 'mouseup', this._onMouseUp)
        }
    },

    _onMouseDown: function ()
    {
        this._button.domElem.trigger('mousedown')
    },
    _onMouseUp: function ()
    {
        this._button.domElem.trigger('mouseup')
    }
})
