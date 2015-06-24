jBlock

.match('tabs', function()
{
    this.js()
},
{
    bindToElem: {
        item: {
            click: function (e) {
                var item = $(e.currentTarget)
                if (this.hasMod(item, 'state', 'release')) {
                    this.setMod(this.elem('item', 'state', 'check'), 'state', 'release')
                    this.setMod(item, 'state', 'check')
                }
            }
        }
    }
})

.match('tabs__item', function()
{
    this.defMod({
            state:'release',
            button:false
        })
})

.match('tabs__icon', function()
{
    this.append()
        .css({'background-image':this.text()})
})