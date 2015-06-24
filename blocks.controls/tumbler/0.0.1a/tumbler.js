require('./tumbler.jblock.js');

BEM.DOM.decl('tumbler',
{
    onSetMod:
    {
        js: function ()
        {
            this.bindTo('click', this._onClick)
        }
    },

    /*
     * Private
     */
    _onClick: function ()
    {
        this.toggleMod('state', 'on', 'off')
    }
})
