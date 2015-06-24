require('./radiogroup.jblock.js');

BEM.DOM.decl('radiogroup',
{
    onSetMod:
    {
        js: function ()
        {
            var isJustify = this.domElem.is('.radiogroup_justify')
            var maxWidth = 0
            var buttons = this.findBlocksInside('button')
            var targets = []

            buttons.forEach(function (button)
            {
                button.setGroup(buttons)

                if (button.domElem.attr('target'))
                {
                    var target = $(button.domElem.attr('target'))

                    targets.push(target)

                    if (!button.hasMod('state', 'check'))
                        target.hide()

                    button.bindTo('click', function ()
                    {
                        targets.forEach(function (target) { target.hide() })
                        target.show()
                    })
                }

                if (isJustify) {
                    var width = button.domElem.outerWidth()
                    if (width > maxWidth) {
                        maxWidth = width
                    }
                }
            })

            if (isJustify) {
                buttons.forEach(function (button) {
                    button.domElem.width(maxWidth+1)
                })
            }
        }
    }
})
