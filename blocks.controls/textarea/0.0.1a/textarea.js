jBlock

.match('textarea', function()
{
    this.js()
        .defMod({
            size:'M',
            hover:'',
            focus:'',
            type:'normal'
        })
        .css({
            width:this.param('width')
        })
        .append(
            {
                e_textarea:this.text(),
                tag:'textarea',
                attr:{
                    cols:this.param('cols'),
                    placeholder:this.param('hint'),
                    rows:this.param('rows') || 3
                },
                css:{
                    width:this.param('width')
                }
            },
            {e_ground:''},
            {e_cursor:''},
            {e_clear:''}
        );
});

BEM.DOM.decl('textarea',
{
    onSetMod:
    {
        js: function ()
        {
            this.bindTo('textarea', 'input', this._onInput)
            this.bindTo('textarea', 'focus', this._onFocus)
            this.bindTo('textarea', 'blur', this._onBlur)
            this.bindTo('clear', 'click', this._onClearClick)

            this._onInput()
        }
    },

    /*
     * Private
     */

    _onInput: function (e)
    {
        if (this.elem('textarea').val())
            this.setMod('state', 'filled')
        else
            this.setMod('state', 'empty')
    },
    _onFocus: function ()
    {
        this.setMod('focus', 'yes')
    },
    _onBlur: function ()
    {
        this.delMod('focus')
    },
    _onClearClick: function ()
    {
        this.elem('textarea').val('').trigger('input').focus()
    }
})
